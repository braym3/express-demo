/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
// import plug-in
chai.use(chaiHttp); // add plug-in to chai
const mongoose = require('mongoose'); // import mongoose
const server = require('../index'); // import server from index.js
const { catModel } = require('../db'); // import catModel

describe('API tests', () => {
  let testCat;

  // before each
  beforeEach(async () => {
    await catModel.deleteMany({}); // clear db
    testCat = await catModel.create({ // create test cat to use in tests
      name: 'Hamish',
      colour: 'Brown',
      evil: true,
    });
    testCat = JSON.stringify(testCat);
    testCat = JSON.parse(testCat); // need to match the api response object
  });

  it('should create a cat', (done) => {
    const cat = {
      name: 'Jeff',
      colour: 'Black',
      evil: true,
    };

    chai.request(server).post('/cats/create') // send a request
      .send(cat)
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res.body).to.include(cat);
        chai.expect(res.status).to.equal(201);
        done(); // end the test
      });
  });

  it('should read all cats', (done) => {
    chai.request(server).get('/cats/getAll') // send get request
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res.body).to.be.an('array'); // check body is an array
        chai.expect(res.body.length).to.be.greaterThan(0); // check body array length is greater than 1
        res.body.forEach((item) => { // check each obj in array has id and name
          chai.expect(item).to.have.property('_id');
          chai.expect(item).to.have.property('name');
        });
        chai.expect(res.body[0].name).to.include('Hamish'); // check first item in body array

        chai.expect(res.status).to.equal(200);
        done(); // end the test
      });
  });

  it('should update cat', (done) => {
    const updatedCat = { // create updated cat
      name: 'Bob',
      colour: 'White',
      evil: true,
    };

    chai.request(server).patch(`/cats/update/${testCat._id}`) // send patch request
      .query({ name: 'Bob', colour: 'White' })
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res.body).to.include(updatedCat);
        chai.expect(res.status).to.equal(200);
        done(); // end the test
      });
  });

  it('should delete a cat', (done) => {
    chai.request(server).delete(`/cats/remove/${testCat._id}`) // send delete request
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res.body).to.include(testCat);
        chai.expect(res.status).to.equal(200);
        done(); // end the test
      });
  });

  after(async () => {
    // after all tests, disconnect from mongo - can use done OR async
    await mongoose.disconnect();
  });
});
