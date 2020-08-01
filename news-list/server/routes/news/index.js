const newsController  = require('./../../controllers/news');
const paths = require('./../paths');

function news(router) {
  router.get(paths.app.news.getAll, newsController.getAll);
  router.delete(paths.app.news.delete, newsController.delete);

  return router;
}

module.exports = news;
