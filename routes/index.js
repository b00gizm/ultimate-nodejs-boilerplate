var express = require('express');
var React   = require('react');
var sd      = require('sharify').data;

var router = express.Router();

/* GET home page. */
router.get('/:name', function(req, res, next) {
  var name = req.params.name || 'Express';

  res.locals.sharify.data.NAME = name;

  var Hello = React.createFactory(require('../app/react/hello'));
  
  return res.render('index', {
    innerHtml: React.renderToString(Hello({ name: name }))
  });
});

module.exports = router;
