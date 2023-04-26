const chai = require(`chai`);
const chaiHttp = require(`chai-http`); // import plug-in
chai.use(chaiHttp); // add plug-in to chai
const server = require(`../index`) // import server from index.js
const mongoose = require(`mongoose`) // import mongoose

describe(`API tests`, ()=>{
    it(`should create a cat`, (done)=>{
        const cat = {
            "name": "Jeff",
            "colour": "Black",
            "evil": true
        };

        chai.request(server).post(`/cats/create`) // send a request
        .send(cat)
        .end((err,res)=>{
            chai.expect(err).to.be.null;
            chai.expect(res.body).to.include(cat);
            chai.expect(res.status).to.equal(201);
            done(); // end the test
        })
    })

    after(async ()=>{ // after all tests, disconnect from mongo - can use done OR async 
        await mongoose.disconnect();
    })
});

