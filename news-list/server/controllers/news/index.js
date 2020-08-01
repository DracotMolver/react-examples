const News = require('./../../models/News');
const { apiRes } = require('./../../utils/functions');

const newsController = {
  async getAll(req, res) {
    const newsLists = await News.find({ deleted_at: null }).sort({ created_at: 'desc' }).exec();

    return res.json(
      apiRes(
        Boolean(newsLists.length),
        newsLists.length ? 'Noticias encontradas' : 'No exísten noticias',
        newsLists.length ? 200 : 204,
        newsLists || null
      )
    );
  },
  async delete(req, res) {
    // We are gonna make a soft-delete because the news is gonna be updated once an hour.
    const news = await News.updateOne({ story_id: Number(req.params.id) }, { deleted_at: new Date() });

    return res.json(
      apiRes(
        Boolean(news.ok),
        news.ok ? 'Noticia eliminada' : 'No se eliminó la noticia',
        news.ok ? 200 : 501
      )
    );
  }
};

module.exports = newsController;
