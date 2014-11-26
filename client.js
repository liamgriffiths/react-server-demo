var React = require('react');
var Hello = React.createFactory(require('./hello'));

var root = document.querySelector('body');
React.render(new Hello(), root);
