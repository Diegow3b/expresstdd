var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false }); 
/**
 * Url to Cities
 */
var cities = {
    'Lotopia':'asd',
    'Caspiana':'asd',
    'Indigo': 'asd'
}

router.route('/')
    .get((req, res) => {          
        res.json(Object.keys(cities));
    })
    .post(urlencode, (req, res) => {
        var newCity = req.body;
        cities[newCity.name] = newCity.description;
        res.status(201).json(newCity.name);
    });

module.exports = router;