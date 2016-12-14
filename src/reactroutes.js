
var React = require('react')
var { Route, IndexRoute } = require('react-router')
var Layout = require('./components/Layout');
var IndexPage = require('./components/IndexPage');
var SecondaryPage = require('./components/SecondaryPage');
var NotFoundPage = require('./components/NotFoundPage');

/*
const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage}/>
    <Route path="/:id" component={SecondaryPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
*/

module.exports = [
  <Route path="/" handler={require("./server.js")}>{/* ... */}</Route>
]

