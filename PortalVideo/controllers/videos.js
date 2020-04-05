const videoModel = require('../models/videos');

const videos = {};

// controller that handles video listings fetch request.
videos.get = (req, res) => {
  const { skip, limit } = req.query.skip;

  videoModel
    .get(skip, limit)
    .then(data => {
      res.send({
        status: 'success',
        data
      });
    }).catch(err => {
      res.send(err);
    });
};

// controller that handles single video fetch request.
videos.getOne = function (req, res) {
  const { videoId } = req.query;

  videoModel
    .getOne(videoId)
    .then(data => {
      res.send({
        status: 'success',
        data
      });
    }).catch(err => {
      res.status(400);
      res.send(err);
    });
};

// controller that handles video rate request
videos.rate = (req, res) => {
  const { videoId, rating } = req.body;

  videoModel
    .rate(videoId, rating)
    .then(function (data) {
      res.send({
        status: 'success',
        data
      });
    }).catch(err => {
      res.status(400);
      res.send(err);
    });
};

module.exports = videos;
