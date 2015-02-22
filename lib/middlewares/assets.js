var path   = require('path');
var lodash = require('lodash');

var jsTemplate  = lodash.template('<script src="<%= scriptName %>"></script>');
var cssTemplate = lodash.template('<link href="<%= stylesheetName %>" rel="stylesheet">');

function dumpAssets(type) {
  var busters = require('../../busters.json');

  if (type == 'js') {
    return Object
      .keys(busters)
      .filter(function(file) {
        return path.extname(file) == '.js';
      })
      .map(function(file) {
        return jsTemplate({ scriptName: /public\/(.*)/.exec(file)[1] + '?v=' + busters[file] });
      })
      .join("\n")
    ;
  }

  if (type == 'css') {
    return Object
      .keys(busters)
      .filter(function(file) {
        return path.extname(file) == '.css';
      })
      .map(function(file) {
        return cssTemplate({ stylesheetName: /public\/(.*)/.exec(file)[1] + '?v=' + busters[file] });
      })
      .join("\n")
    ;
  }
}

function exposeAssets() {
  return function(req, res, next) {
    res.locals.assets = {
      javascripts: dumpAssets('js'),
      stylesheets: dumpAssets('css')
    };

    return next();
  };
}

module.exports = exposeAssets;
