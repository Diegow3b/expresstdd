var request = require('supertest');
var app = require('./../app');

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
            .expect(JSON.stringify(['Lotopia', 'Caspiana', 'Indigo']), done)
    });
});