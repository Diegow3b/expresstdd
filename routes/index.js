var express = require('express');
var router = express.Router();

router.route('/')
    .get((req, res) => {  
        // res.send('Ok');
        // res.sendFile(__dirname,'public/index.html');
    });

module.exports = router;