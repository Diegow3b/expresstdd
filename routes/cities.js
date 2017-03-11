var express = require('express');

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });

// Redis connection
var redis = require('redis');
if (process.env.REDISTOGO_URL) {
    var rtg = require("url").parse(process.env.REDISTOGO_URL);
    var client = redis.createClient(rtg.port, rtg.hostname);
    client.auth(rtg.auth.split(":")[1]);
} else {
    var client = redis.createClient();
    client.select((process.env.NODE_ENV || 'development').length);
}
// End Redis Connection

/**
 * Url to /cities
 */
var router = express.Router();

router.route('/')
    .get((request, response) => {
        client.hkeys('cities', (error, names) => {
            if (error) throw error;

            response.json(names);
        });
    })

    .post(urlencode, (request, response) => {
        var newCity = request.body;
        if (!newCity.name || !newCity.description) {
            response.sendStatus(400);
            return false;
        }
        client.hset('cities', newCity.name, newCity.description, (error) => {
            if (error) throw error;

            response.status(201).json(newCity.name);
        });
    });


router.route('/:name')
    .delete((request, response) => {
        client.hdel('cities', request.params.name, (error) => {
            if (error) throw error;
            response.sendStatus(204);
        });
    })

    .get((request, response) => {
        client.hget('cities', request.params.name, (error, description) => {
            response.render('show.ejs', {
                city: { name: request.params.name, description: description }
            });
        });
    });

module.exports = router;