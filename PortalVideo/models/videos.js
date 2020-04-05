const mongoose = require('mongoose');

//defining schema for videos table
const videoSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  url: String,
  ratings: []
});

const Video = mongoose.model('videos', videoSchema);

//Initlizing interface object of this model.
const videosModel = {};

//Function to seed videos data.
videosModel.seed = () => {
  const videos = [];
  videos.push({ name: 'Getting Started With ReactJs', description: 'React.js is a JavaScript library for building user interfaces. - Just the UI: Lots of people use React as the V in MVC. Since React makes no assumptions about the rest of your technology stack, its easy to try it out on a small feature in an existing project. - Virtual DOM: React uses a virtual DOM diff implementation for ultra-high performance. It can also render on the server using Node.js — no heavy browser DOM required. - Data flow: React implements one-way reactive data flow which reduces boilerplate and is easier to reason about than traditional data binding.', url: 'videos/Getting_Started_With_React.js.mp4', ratings: [1, 5, 5, 4, 3, 4, 2, 5] });
  videos.push({ name: 'Google Cardboard Assembly', description: 'Google Cardboard Assembly Step by Step Instructions [HD]', url: 'videos/Google_Cardboard_Assembly.mp4', ratings: [4, 5, 5, 5, 3, 5, 4, 5] });
  videos.push({ name: 'How Does AngularJS Work Beginners Angular Tutorial', description: 'What you will learn in this course. How to use Angular.js to save time, create better projects and give your users a better experience. We’ll create a full SPA from scratch (client side). How to cloud-enable your SPA so that you can connect it to any kind of backend. Fully commented source code of the course project. Learn how to architecture a SPA: modules, controllers, services Learn how to add URL routes to your client-side SPA. We’ll be using Angular.js version 1.3.2. Access live examples at the end of each coding lesson. Learn how to use other great tools such as Boostrap 3, UnderscoreJS and Google Chrome’s Developer Tools!', url: 'videos/How_Does_AngularJS_Work_Beginners_Angular_Tutorial.mp4', ratings: [2, 4, 2, 2, 3, 1, 2, 5] });
  videos.push({ name: 'How does Node.js work', description: 'New to Node.js? Check out this video that explains "How does Node work?"', url: 'videos/How_does_Node.js_work.mp4', ratings: [3, 3, 3, 3, 3, 3, 3, 3] });
  videos.push({ name: 'iPhone 7 Trailer 2016', description: 'iPhone 7 concept trailer 2016! with Bluetooth AirPods by Beats and ChargingPad, and much more!', url: 'videos/iPhone_7_Trailer_2016.mp4', ratings: [4, 3, 4, 3, 4, 3, 4, 3] });
  videos.push({ name: 'What is the MEAN Stack', description: 'Do you know what the MEAN stack is? Watch our short intro video and get ready to kick your learning into shape with this full-stack development toolkit. Then head on over and play through our MEAN-related courses now.', url: 'videos/What_is_the_MEAN_Stack.mp4', ratings: [1, 5, 5, 5, 3, 4, 5, 5] });

  const dataToInsert = [];
  for (let i = 0; i < 100; i++) {
    const videoObject = JSON.parse(JSON.stringify(videos[i % 6]));//cloning object
    videoObject.name = '[' + i + '] ' + videoObject.name;
    dataToInsert.push(videoObject);
  }

  Video.collection.insertMany(dataToInsert, (err, video) => {
    if (err) {
      console.log('error occured in populating database');
      console.log(err);
    } else {
      console.log('Videos table populated.');
    }
  });

}

//function to get video listings
videosModel.get = (skip, limit) => {
  skip = Number(skip) || 0;
  limit = Number(limit) || 10;

  return Video.find().skip(skip).limit(limit).exec();
}

//function to get single video by its id.
videosModel.getOne = id => {
  if (!id) {
    results.reject({ status: 'error', error: 'Video Id not supplied.' });
  }

  return Promise(resolve, reject => {
    Video.findOne({ _id: id }, (err, dbVideo) => {
      if (err) {
        reject(err);
      }

      if (dbVideo) {
        resolve(dbVideo);
      } else {
        reject({ status: 'error', error: 'Invalid video Id supplied.' });
      }
    });
  });
};

//function to rate single video by its id.
videosModel.rate = function (id, ratting) {
  console.warn(id, ratting);

  ratting = Number(ratting);
  var error = false;

  return Promise((resolve, reject) => {
    if (!id) {
      reject({ status: 'error', error: 'Video Id not supplied.' });
      error = true;
    }

    if (!ratting) {
      reject({ status: 'error', error: 'User ratting not supplied.' });
      error = true;
    }

    if (ratting < 0 || ratting > 5) {
      reject({ status: 'error', error: 'User ratting is out of range.' });
      error = true;
    }

    if (error == false) {
      Video.findOne({ _id: id }, (err, dbVideo) => {
        if (err) {
          reject(err);
        }

        dbVideo.ratings.push(ratting);

        dbVideo.markModified('array');
        dbVideo.save();

        resolve(dbVideo);
      });
    }
  });
}

module.exports = videosModel;
