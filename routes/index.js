var express = require('express');
var router = express.Router();
var request = require("request");
/* GET home page. */
router.get('/123', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
