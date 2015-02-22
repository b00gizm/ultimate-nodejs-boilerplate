var sd       = require('sharify').data;
var Polyglot = require('node-polyglot');

var polyglot = new Polyglot();

polyglot.extend(sd.I18N.phrases);
polyglot.locale(sd.I18N.locale);

module.exports = polyglot.t.bind(polyglot);
