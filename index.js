var express = require('express');
var fortune = require('./lib/fortune.js');

var app = express();

//set  up handlebars view engine
var handlebars = require('express3-handlebars').create({ defaultLayout : 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//adding the static middleware
app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

<<<<<<< HEAD
app.use(function(req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

//roustes are present below----

=======
app.use(function(req, res, next){
 res.locals.showTests = app.get('env') !== 'production' &&
 req.query.test === '1';
 next();
});

// routes go here--------------------------------
>>>>>>> origin/qa_testing_wks
app.get('/', function(req, res) {
	res.render('home');
});

app.get('/about', function(req, res) {
<<<<<<< HEAD
    res.render('about', {
        fortune : fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
=======
    res.render('about',{ 
    	fortune : fortune.getFortune(),
    	pageTestScript: '/qa/tests-about.js'
>>>>>>> origin/qa_testing_wks
    });
});

app.get('/tours/hood-river', function(req, res){
<<<<<<< HEAD
    res.render('tours/hood-river');
});
app.get('/tours/request-group-rate', function(req, res){
    res.render('tours/request-group-rate');
=======
 	res.render('tours/hood-river');
});

app.get('/tours/oregon-coast', function(req, res) {
	res.render('tours/oregon-coast');
});

app.get('/tours/request-group-rate', function(req, res){
 	res.render('tours/request-group-rate');
>>>>>>> origin/qa_testing_wks
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

<<<<<<< HEAD
if( app.thing == null ) console.log( 'bleat!' );
=======
>>>>>>> origin/qa_testing_wks
