var jQuery = require('jquery');
var React  = require('react');
var sd     = require('sharify').data;
var i18n   = require('./helpers/i18n');
var Hello  = require('./react/hello');

jQuery(function($) {

  if (document.getElementById('index-container')) {
    return React.render(
      <Hello name={sd.NAME} />,
      document.getElementById('index-container')
    );
  }

});
