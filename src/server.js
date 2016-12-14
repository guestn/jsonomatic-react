#!/usr/bin/env node

var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var favicon = require('serve-favicon');
var methodoverride = require('method-override');
var FM = require('./modules/functions-manager');

var React = require('react')
//var Router = require('react-router')
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import NotFoundPage from './components/NotFoundPage';


var routes = require('./reactroutes')



var app = express();

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3020;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || 'localhost'; //'0.0.0.0';

// all environments
app.set('port', server_port);
app.set('views', path.join(__dirname, 'views'));

/*
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
*/
//app.set('view engine', 'jade')



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true}));     // to support URL-encoded bodies
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.methodOverride());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'static')));
app.use(favicon(__dirname + '/static/favicon.png'));

//app.use(express.favicon("favicon.png")); 



// universal routing and rendering

app.post('/submit', urlencodedParser, function (req, res, err) {
	console.log(req.body)
   var jsonInput = req.body.output;
   console.log(jsonInput);
   FM.process(req, res);
   
});

/*
app.get('/', function(req, res){
	let markup;
	
	 //if (renderProps) {
      // if the current route matched we have renderProps
      markup = '<RouterContext {...renderProps}/>';
/*
    } else {
      // otherwise we can render a 404 page
      markup = renderToString('<NotFoundPage/>');
      res.status(404);
    }

	res.render('index.ejs',{markup})
});
*/

/*
app.use(function(req, res, next) {
  var router = Router.create({location: req.url, routes: routes})
  router.run(function(Handler, state) {
    var html = React.renderToString('<Handler/>')
    return res.render('index.ejs', {html: html})
  })
})
*/

/*
app.get('/settings', function(req,res){
	let markup;
	
	markup = renderToString('<RouterContext {...renderProps}/>');
	return res.render('index.ejs', { markup });

})
*/
	


app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});


// start the server
/*
const port = process.env.PORT || 3050;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
*/
const env = process.env.NODE_ENV || 'production';


http.createServer(app).listen(app.get('port'), server_ip_address, function(){
	console.log("Express server listening on ip "+server_ip_address+" port " + server_port);
})