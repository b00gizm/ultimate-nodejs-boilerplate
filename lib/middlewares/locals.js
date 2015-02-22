var nconf = require('nconf');

function exposeLocals() {
  return function(req, res, next) {
    // expose common locals here
    res.locals.googleTrackingID = nconf.get('app:analytics:google:trackingID');

    return next();
  };
}

module.exports = exposeLocals;
