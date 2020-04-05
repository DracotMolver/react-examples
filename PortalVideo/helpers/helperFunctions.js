const Users = require('../models/users');
const Videos = require('../models/videos');

const helpers = {};

//Function that checks if the request is authenticated or not.
helpers.isAuthenticated = (req, res, next) => {
  const { sessionId } = req.query;

  if (!sessionId) {
    res.status(401);
    res.send({ status: 'error', error: 'Not Authorized.' });
  } else {
    Users
      .getBySessionId(sessionId)
      .then(function (dbuser) {
        if (dbuser) {
          next();
        } else {
          res.status(401);
          res.send({ status: 'error', error: 'Not Authorized.' });
        }
      });
  }
}

//Function to populate data in DB if DB is empty.
helpers.populateDb = () => {
  Users
    .get()
    .then(data => {
      if (data.length) {
        console.log('Users table already populated.');
      } else {
        console.log('Populating users table.');
        Users.seed();
      }
    });

  Videos.get().then(data => {
    if (data.length) {
      console.log('videos table already populated.');
    } else {
      console.log('Populating videos table.');
      Videos.seed();
    }
  });
}

module.exports = helpers;
