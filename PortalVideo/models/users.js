const mongoose = require("mongoose");

//defining schema for users table
const userSchema = new mongoose.Schema({
  username: { type: String },
  password: String,
  activeSession: String,
});

const User = mongoose.model("Users", userSchema);

//generating random session id
//todo: make sure no 2 users can have single sessionId
function makeSessionId() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const possibleSize = possible.length;
  for (let i = 0; i < 32; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possibleSize));
  }

  return text;
}

//Initlizing interface object of this model.
const userModel = {};

//seeding database with default users
userModel.seed = () => {
  new User({
    username: "ali",
    password: "2a4026c992682b7c4c76d79240d72f86",
    activeSession: "",
  }).save((err, user) => {
    if (err) {
      console.dir("error occured in populating database");
    }
  });

  new User({
    username: "harry",
    password: "2a4026c992682b7c4c76d79240d72f86",
    activeSession: "",
  }).save((err, user) => {
    if (err) {
      console.dir("error occured in populating database");
    }
  });

  new User({
    username: "tom",
    password: "2a4026c992682b7c4c76d79240d72f86",
    activeSession: "",
  }).save((err, user) => {
    if (err) {
      console.dir("error occured in populating database");
    }
  });

  console.log("users table populated.");
};

//Function to auth user baed on username and password.
userModel.authUser = (username, password) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username: username, password: password }).exec(
      (err, dbuser) => {
        if (err) {
          reject(err);
        }

        if (dbuser) {
          dbuser.activeSession = makeSessionId();
          dbuser.markModified("string");
          dbuser.save((err, dbuser) => {
            resolve({
              status: "success",
              sessionId: dbuser.activeSession,
              username: dbuser.username,
            });
          });
        } else {
          resolve({
            status: "error",
            error: "Invalid username or password",
          });
        }
      }
    );
  });
};

//Function to return users by its sessionID.
userModel.getBySessionId = function (sessionId) {
  return new Promise((resolve, reject) => {
    User.findOne({ activeSession: sessionId }, function (err, dbuser) {
      if (err) {
        reject(err);
      }

      resolve(dbuser);
    });
  });
};

//Function to return all users.
userModel.get = function () {
  return User.find().exec();
};

//Function to logout user.
userModel.logout = function (sessionId) {
  return new Promise((resolve, reject) => {
    User.findOne({ activeSession: sessionId }, (err, dbuser) => {
      if (err) {
        reject(err);
      }

      if (dbuser) {
        dbuser.activeSession = "";
        dbuser.markModified("string");
        dbuser.save();
        resolve(dbuser);
      }

      reject({ status: "error", error: "No active session" });
    });
  });
};

module.exports = userModel;
