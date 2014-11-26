var React = require('react');
var h1 = React.DOM.h1;

module.exports = React.createClass({
  getInitialState: function() {
    return { time: 0 };
  },

  componentDidMount: function() {
    setInterval(function() {
      this.setState({ time: this.state.time + 1 });
    }.bind(this), 100);
  },

  render: function() {
    return h1({}, 'hello ' + this.state.time);
  }

});
