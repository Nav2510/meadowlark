var express = require('express');
var fortune = require('./lib/fortune.js');
var formidable = require('formidable');
var jqupload = require('jquery-file-upload-middleware');
var credentials = require('./credentials.js');

var app = express();

//------------------DUMMY WEATHER DATA-----------
function getWeatherData() {
	return {
		locations: [
			{
				name : 'Portland',
				forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
				iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
				weather: 'Overcast',
				temp: '54.1 F (12.3 C)',
			},
			{
				name: 'Bend',
				forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
				iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
				weather: 'Partly Cloudy',
				temp: '55.0 F (12.8 C)',
			},
			{
				name: 'Manzanita',
				forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
				iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
				weather: 'Light Rain',
				temp: '55.0 F (12.8 C)',
			},
		],
	};
}
//set  up handlebars view engine
var handlebars = require('express3-handlebars').create({ defaultLayout : 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

//adding the static middleware
app.use(express.static(__dirname + '/public'));

//adding body-parser middleware
app.use(require('body-parser')());

app.get('/newsletter', function(req, res) {
	res.render('newsletter', {csrf: 'CSRF token goes here'});
});

app.post('/process', function(req, res) {
	console.log('Form (form querystring):' + req.query.form);
	console.log('CSRF token (from hidden form field): ' + req.body._csrf);
	console.log('Name (from visible form field):' + req.body.name);
	console.log('Email (from visible form field):' + req.body.email);
	res.redirect(303, '/thank-you');
});


app.get('/', function(req, res) {
	res.render('home');
});

app.get('/about', function(req, res) {
    res.render('about',{fortune : fortune.getFortune()});
});

app.get('/thank-you', function(req, res) {
	res.render('thank-you');
});

//upload photo form handling
app.get('/contest/vacation-photo', function(req, res) {
	var now = new Date();
	res.render('contest/vacation-photo', {
		year: now.getFullYear(), month:now.getMonth()
	});
});

app.post('/contest/vacation-photo/:year/:month', function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		if (err) return res.redirect(303, '/error');
		console.log('received fields:');
		console.log(fields);
		console.log('received files:');
		console.log(files);
		res.redirect(303, '/thank-you');
	});
});

//using cookies
app.use(require('cookie-parser')(credentials.cookieSecret));


//creating middle ware to inject forecast data into res.locals.partials object
app.use(function(req, res, next) {
	if (!res.locals.partials) {
		res.locals.partials = {};
	}
	res.locals.partials.weather = getWeatherData();
	next();
});

//route handlers for nursery rhyme page
app.get('/nursery-rhyme', function(req, res) {
	res.render('nursery-rhyme');
});
app.get('/data/nursery-rhyme', function(req, res) {
	res.json({
		animal : 'squirrel',
		bodyPart: 'tail',
		adjective: 'bushy',
		noun: 'heck',
	});
});

//404 catch-all handler(middleware)
app.use( function (req, res, next) {
	res.status(404);
	res.render('404');
});

//500 error handler (middleware)
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function () {
	console.log(" Express started on http://localhost:" + app.get('port') + '; press Ctrl-C to terminate.');
});