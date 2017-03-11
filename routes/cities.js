var express = require('express');
var router = express.Router();

router.route('/')
    .get((req, res) => {
        var cities = ['Lotopia', 'Caspiana', 'Indigo']  
        res.json(cities);
    });

module.exports = router;