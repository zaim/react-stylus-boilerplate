/**
 * Main application
 *
 * @jsx React.DOM
 */

var App = React.createClass({
  render : function () {
    return (
      <div>
        <h1>Hello</h1>
        <p>TODO - write your app!</p>
      </div>
    );
  }
});

React.renderComponent(<App/>, document.getElementById('app'));

