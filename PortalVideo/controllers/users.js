const userModel = require('../models/users');

const users = {};

// controller that handles user login request
users.auth = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    res.send({ status: 'error', error: 'Username or password is missing.' });
  }

  const user = userModel.authUser(username, password);

  user.then(data => {
    res.send(data);
  }).catch(() => {
    res.send({ status: 'error', error: 'Error occurred while fetching data from database.' });
  });
};

// controller that handles user logout request
users.logout = (req, res) => {
  userModel.logout(req.query.sessionId);

  res.send({ status: 'success' });
};

module.exports = users;
