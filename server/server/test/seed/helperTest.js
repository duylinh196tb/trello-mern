const chai = require('chai');
const { it } = require('mocha');
const chaiHttp = require('chai-http');

const { expect } = chai;

const hostApp = `http://localhost:${process.env.PORT}/api/v1`;
chai.use(chaiHttp);

const checkRes = (err, res, done, code = 200) => {
  if (err) done(err);
  expect(res).to.have.status(200);
  expect(res.body.code).to.equal(code);
};

const populateData = (done, data, model) => {
  model
    .deleteMany({})
    .then(() => model.insertMany(data))
    .then(() => done());
};

const testPost = ({ dataSeed, model, token, url, host = hostApp }, data) => {
  it('it should post data', done => {
    chai
      .request(host)
      .post(url)
      .set(token)
      .send(data)
      .end((err, res) => {
        checkRes(err, res, done);
        model
          .find()
          .then(d => {
            expect(d).to.have.lengthOf(dataSeed.length + 1);
          })
          .then(() => {
            model.findById(res.body.data._id).then(d => {
              expect(d).to.deep.include(data);
              done();
            });
          })
          .catch(e => done(e));
      });
  });
};

const testGet = ({ dataSeed, model, token, url, host = hostApp }) => {
  it('it should get all data', done => {
    chai
      .request(host)
      .get(url)
      .set(token)
      .end((err, res) => {
        checkRes(err, res, done);
        model.find().then(d => {
          expect(d).to.have.lengthOf(dataSeed.length);
          done();
        });
      });
  });

  it('it should get data by id', done => {
    chai
      .request(host)
      .get(`${url}/${dataSeed[0]._id}`)
      .set(token)
      .end((err, res) => {
        checkRes(err, res, done);
        model.findById(dataSeed[0]._id).then(d => {
          expect(d).to.exist;
          done();
        });
      });
  });
};

const testDelete = ({ dataSeed, model, token, url, host = hostApp }) => {
  it('it should delete by id', done => {
    chai
      .request(host)
      .delete(`${url}/${dataSeed[0]._id}`)
      .set(token)
      .end((err, res) => {
        checkRes(err, res, done);
        model
          .findById(dataSeed[0]._id)
          .then(d => {
            expect(dataSeed[0]._id.toHexString()).to.equal(res.body.data);
            expect(d).to.not.exist;
            done();
          })
          .catch(e => done(e));
      });
  });
};

const testUpdate = ({ dataSeed, model, token, url, host = hostApp }, data) => {
  it('it should update by id', done => {
    chai
      .request(host)
      .patch(`${url}/${dataSeed[0]._id}`)
      .set(token)
      .send(data)
      .end((err, res) => {
        checkRes(err, res, done);

        model
          .findById(res.body.data._id)
          .then(d => {
            expect(d).to.deep.include(data);
            done();
          })
          .catch(e => done(e));
      });
  });
};

const returnMethod = (host, url, customUrl, method) => {
  switch (method.toLowerCase()) {
    case 'get':
      return chai.request(host).get(`${url}/${customUrl}`);
    case 'post':
      return chai.request(host).post(`${url}/${customUrl}`);
    case 'put':
      return chai.request(host).put(`${url}/${customUrl}`);
    case 'patch':
      return chai.request(host).patch(`${url}/${customUrl}`);
    case 'delete':
      return chai.request(host).delete(`${url}/${customUrl}`);
    default:
      break;
  }
};

const testErrReq = (
  { dataSeed, model, token, url, host = hostApp },
  {
    title = 'it should return err',
    code,
    method = 'get',
    customUrl = '',
    data = null
  }
) => {
  it(title, done => {
    returnMethod(host, url, customUrl, method)
      .set(token)
      .send(data)
      .end((err, res) => {
        checkRes(err, res, done, code);
        done();
      });
  });
};

module.exports = {
  testDelete,
  testErrReq,
  testGet,
  testPost,
  testUpdate,
  checkRes,
  populateData
};
