const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const rewire = require('rewire');
const chai = require('chai');
// Project
const hackerNewsService = rewire('./../services/hacker_news');
const app = require('../index');

mongoose.Promise = global.Promise;

let expect = chai.expect;
chai.use(chaiHttp);

describe('Set of APIs', () => {
  before(done => {
    hackerNewsService.__get__('_getNews')().then(data => {
      hackerNewsService.__get__('_insertNews')(data).then(() => {
        done();
      });
    });
  });

  it('Expect to get all the documents from News collection', done => {
    chai.request(app)
      .get('/api/v1/news')
      .then(res => {
        expect(res.ok).to.be.true;
        expect(res.status).to.be.equal(200);

        if (res.body.success) {
          expect(res.body).to.be.an('object').that.include({
            success: true,
            message: 'Noticias encontradas',
            code: 200
          });
        }

        done();
      });
  });

  it('Expect to get a FAIL response getting the documents from News collection', done => {
    chai.request(app)
      .get('/api/v1/news')
      .then(res => {
        expect(res.ok).to.be.true;
        expect(res.status).to.be.equal(200);

        if (!res.body.success) {
          expect(res.body).to.be.an('object').that.include({
            success: false,
            message: 'No exísten noticias',
            code: 204
          });
        }

        done();
      });
  });
});
