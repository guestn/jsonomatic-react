//const path = require('path');
//e from 'http';
//const Express = require('express');
//const React = require('react');
var renderToString = require('react-dom/server');
var RouterContext = require('react-dom/server');
//import { match, RouterContext } from 'react-router';
var match = require('react-router')
//const routes = require('./routes');
//const NotFoundPage = require('./components/NotFoundPage');

/*
// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));
*/






var express = require('express');
//var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var favicon = require('serve-favicon');
var methodoverride = require('method-override');
var FM = require('./modules/functions-manager');



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
//app.use(express.favicon("public/images/favicon.png")); 














// universal routing and rendering

app.post('/submit', urlencodedParser, function (req, res, err) {
	console.log(req.body)
   var jsonInput = req.body.output;
   console.log(jsonInput);
   FM.process(req, res);
   
});

app.get('/', function(req, res){
	console.log('hi');
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
*/
	
	res.render('index.ejs',{markup})
});

/*
app.get('/settings', function(req,res){
	let markup;
	
	markup = renderToString('<RouterContext {...renderProps}/>');
	return res.render('index.ejs', { markup });

})
*/
	

/*
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
        markup = renderToString('<RouterContext {...renderProps}/>');
      } else {
        // otherwise we can render a 404 page
        markup = renderToString('<NotFoundPage/>');
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});
*/

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

http.createServer(app).listen(app.get('port'), server_ip_address, function(){
	console.log("Express server listening on ip "+server_ip_address+" port " + server_port);
})