// Modules
const https = require('https');
// Projects
const { apiRes } = require('./../../utils/functions');
// Models
const News = require('./../../models/News');

let time = null;

function _getNews() {
  return new Promise(resolve => {
    https.get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs', res => {
      res.setEncoding('utf8');

      let body = '';

      res.on('data', data => {
        body += data;
      });

      res.on('end', async () => {
        const data = body.length && body !== 'Unknown.'
          ? JSON.parse(body)
          : apiRes(false, 'Sin datos', 204);

        resolve(data);
      });
    }).on('error', err => {
      console.error(err);
      process.exit(1);
    });
  })
}

function _insertNews(data) {
  if (data.hits) {
    return News.bulkWrite(
      data.hits
        .filter(({ story_url, url }) => story_url || url) // We need news with url to be able to open it
        .map(({
          story_title,
          created_at,
          story_url,
          objectID,
          author,
          title,
          url
        }) => ({
          updateOne: {
            filter: {
              story_id: objectID
            },
            update: {
              $set: {
                story_id: objectID,
                story_title,
                created_at: new Date(created_at),
                story_url,
                author,
                title,
                url
              }
            },
            upsert: true, setDefaultsOnInsert: true
          }
        }))
    );
  }
}

function hackerNewsService() {
  // init called
  _getNews().then(_insertNews);

  time = setInterval(() => {
    _getNews().then(_insertNews);
  }, 3.6e+6);
}


module.exports = hackerNewsService;
