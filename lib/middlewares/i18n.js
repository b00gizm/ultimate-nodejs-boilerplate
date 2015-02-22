var Polyglot = require('node-polyglot');
var sharify  = require('sharify');
var nconf    = require('nconf');
var lodash   = require('lodash');

function exposeTranslations() {
  return function(req, res, next) {

    var lang;
    if (req.acceptsLanguages()) {
      lang = req.acceptsLanguages()[0].slice(0, 2);
    }

    if (!lang || nconf.get('i18n:availableTranslations').indexOf(lang) == -1) {
      lang = nconf.get('app:defaults:language');
    }

    var polyglot = new Polyglot({ locale: lang });
    polyglot.extend(require('../../translations/' + lang));

    res.i18n = lodash.bind(polyglot.t, polyglot);

    sharify.data.I18N = res.locals.sharify.data.I18N = {
      lang    : lang,
      phrases : require('../../translations/' + lang)
    };

    res.locals.lang = lang;

    return next();
  };
}

module.exports = exposeTranslations;
