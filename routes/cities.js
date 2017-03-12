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
    .get((req, res) => {
        client.hkeys('cities', (error, names) => {
            if (error) throw error;

            res.json(names);
        });
    })

    .post(urlencode, (req, res) => {
        var newCity = req.body;
        if (!newCity.name || !newCity.description) {
            res.sendStatus(400);
            return false;
        }
        client.hset('cities', newCity.name, newCity.description, (error) => {
            if (error) throw error;

            res.status(201).json(newCity.name);
        });
    });


router.route('/:name')
    .delete((req, res) => {
        client.hdel('cities', req.params.name, (error) => {
            if (error) throw error;
            res.sendStatus(204);
        });
    })

    .get((req, res) => {
        client.hget('cities', req.params.name, (error, description) => {
            res.render('show.ejs', {
                city: { name: req.params.name, description: description }
            });
        });
    });

module.exports = router;