var nconf = require('nconf');

// initialize nconf
nconf
  .argv()
  .env(['NODE_ENV'])
  .defaults({
    'NODE_ENV': 'dev'
  })
  .file('local',   { file: __dirname + '/local.json' })
  .file('environ', { file: __dirname + '/' + nconf.get('NODE_ENV') + '.json' })
  .file('common',  { file: __dirname + '/common.json' })
;

// require JSX templates from node
require('node-jsx').install();
