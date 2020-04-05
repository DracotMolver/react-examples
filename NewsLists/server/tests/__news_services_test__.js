const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const rewire = require('rewire');
const chai = require('chai');
// Project
const hackerNewsService = rewire('./../services/hacker_news');
const dbConfig = require('../dbConfig');
const News = require('../models/News');

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${dbConfig.dbHost}/${dbConfig.dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('open', () => console.log('db connected'));

let expect = chai.expect;
chai.use(chaiHttp);

describe('Testing the service to get the news from Hack News and savece them once an hour', () => {
  beforeEach(done => {
    mongoose.connection.collections.news.drop(() => {
      hackerNewsService.__get__('_getNews')().then(data => {
        hackerNewsService.__get__('_insertNews')(data);
        done();
      });
    });
  });

  it('Expect to get data from Hack News', done => {
    hackerNewsService.__get__('_getNews')().then(data => {
      expect(data).to.be.an('object');

      if (data.hits) {
        expect(data.hits).to.be.an('array');
        expect(data.hits).to.be.an('array').that.is.not.empty;
      }

      done();
    });
  });

  it('Expect to get an error Object if fails getting data from Hack News', done => {
    hackerNewsService.__get__('_getNews')().then(data => {
      expect(data).to.be.an('object');

      if (data.success !== undefined && !data.success) {
        expect(data).to.include({ success: false, message: 'Sin datos', code: 204, data: null });
      }

      done();
    });
  });

  it('Expect to insert data to the News collection', done => {
    hackerNewsService.__get__('_getNews')().then(data => {
      const newsLists = hackerNewsService.__get__('_insertNews')(data);

      if (newsLists) {
        News.find().exec().then(res => {
          expect(res).to.be.an('array');
          done();
        });
      } else {
        done();
      }
    });
  });
});