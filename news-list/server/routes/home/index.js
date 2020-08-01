const paths = require('../paths');

function home(router) {
  router.get(paths.home, (req, res) => {
    res.send('API is working properly');
  });

  return router;
}

module.exports = home;
