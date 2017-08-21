
const request = require('supertest');
const app = require('../app');
const expect = require('chai').expect;

describe('Correct login', function(){
  it("if username and password are correct, should login", function(done){
    request(app)
    .post("/login")
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({username: 'admin', password: 'admin'})
    .expect(200)
    .expect(function(response){
      expect(response.body).not.to.be.empty;
      expect(response.body).to.be.an('object');
    })
    .end(done);
  });
}) ;

describe('Wrong password login', function(){
  it("with a wrong password, should not login", function(done){
    request(app)
    .post("/login")
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({username: 'admin', password: 'closetoanadmin'})
    .expect(401)
    .expect(function(response){
      expect(response.body).not.to.be.empty;
      expect(response.body).to.be.an('object');
    })
    .end(done);
  });
}) ;

describe('Wrong username login', function(){
  it("with a wrong password, should not login", function(done){
    request(app)
    .post("/login")
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({username: 'administrator', password: 'admin'})
    .expect(401)
    .expect(function(response){
      expect(response.body).not.to.be.empty;
      expect(response.body).to.be.an('object');
    })
    .end(done);
  });
}) ;

describe('Wrong password register"', function(){
  it("with the second password not matching, should not register a user", function(done){
    request(app)
    .post("/register")
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({username: 'arandomuser', password: 'arandompassword', password2: 'awrongpassword'})
    .expect(400)
    .expect(function(response){
      expect(response.body).not.to.be.empty;
      expect(response.body).to.be.an('object');
    })
    .end(done);
  });
}) ;

describe('No username register"', function(){
  it("with the second password not matching, should not register a user", function(done){
    request(app)
    .post("/register")
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({username: '', password: 'arandompassword', password2: 'arandompassword'})
    .expect(400)
    .expect(function(response){
      expect(response.body).not.to.be.empty;
      expect(response.body).to.be.an('object');
    })
    .end(done);
  });
}) ;

describe('username too short register"', function(){
  it("with the second password not matching, should not register a user", function(done){
    request(app)
    .post("/register")
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({username: 'ar', password: 'arandompassword', password2: 'arandompassword'})
    .expect(400)
    .expect(function(response){
      expect(response.body).not.to.be.empty;
      expect(response.body).to.be.an('object');
    })
    .end(done);
  });
}) ;

describe('username too long register"', function(){
  it("with the second password not matching, should not register a user", function(done){
    request(app)
    .post("/register")
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({username: 'arandomusernamethatcouldbetoolong', password: 'arandompassword', password2: 'arandompassword'})
    .expect(400)
    .expect(function(response){
      expect(response.body).not.to.be.empty;
      expect(response.body).to.be.an('object');
    })
    .end(done);
  });
}) ;

describe('Get all posts', function(){
  it("should return all the posts", function(done){
    request(app)
    .get("/posts")
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function(response){
      expect(response.body).not.to.be.empty;
    })
    .end(done);
  });
}) ;
