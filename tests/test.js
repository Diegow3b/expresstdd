var request = require('supertest');
var app = require('./../app');

var redis = require('redis');
var client = redis.createClient();
client.select('test'.length);
client.flushdb();

describe('Requests to the root path', () => {
    it('Returns a 200 status code', (done) => {
        request(app)
            .get('/')
            .expect(200, done)
    });

    it('Returns a HTML format', (done) => {
        request(app)
            .get('/')
            .expect('Content-Type', /html/, done)
    });

    it('Returns an index file with Cities', (done) => {
        request(app)
            .get('/')
            .expect(/cities/i, done)
    });
});

describe('Listing cities on /cities', () => {
    it('Return 200 status code', (done) => {
        request(app)
            .get('/cities')
            .expect(200, done);
    });

    it('Return JSON format', (done) => {
        request(app)
            .get('/cities')
            .expect('Content-Type', /json/, done);            
    });

    it('Returns initial cities', (done) => {
        request(app)
            .get('/cities')
            .expect(JSON.stringify([]), done)
    });
});

describe('Creating new cities', () => {

    before(() => {
        // TO DO?
    });

    it('Returns a 201 status code', (done) => {
        request(app)
            .post('/cities')
            .send('name=Springfield&description=where+the+simpsons+live')
            .expect(201, done)
    });

    it('Return the city name', (done) => {
        request(app)
            .post('/cities')
            .send('name=Springfield&description=where+the+simpsons+live')
            .expect(/springfield/i, done)
    });

    it('Validades city name and description',(done) => {
        request(app)
            .post('/cities')
            .send('name=&description=')
            .expect(400, done);
    });
});

describe('Deleting cities', () => {

    before(() => {
        client.hset('cities', 'Banana', 'a tasty fruit');
    });

    after(() => {
        client.flushdb();
    });
    

    it('Returns a 204 status code', (done) => {
        request(app)
            .delete('/cities/Banana')
            .expect(204, done);            
    });
});