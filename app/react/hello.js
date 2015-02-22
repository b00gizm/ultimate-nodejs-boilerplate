var React = require('react');
var i18n  = require('../helpers/i18n');

var Hello = module.exports = React.createClass({
  render: function() {
    return (
      <h1>{i18n('hello')} {this.props.name}!</h1>
    );
  }
});
