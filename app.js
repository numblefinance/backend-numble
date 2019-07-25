var express = require('express');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var db = require('./models');
var ENV = "development";
var config = require('./config/database.json')[ENV];
var cookieParser = require('cookie-parser');

var app = express();
var cors = require('cors');

// all environments
app.set('port', process.env.PORT || config.port);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser('qwerty')); // TODO: change secret to production, TODO: check cookie signature
app.use(methodOverride());

app.use(cors());
app.options('/*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	res.send(200);
});

// development only
if (ENV === 'development') {
	app.use(errorHandler());
}

console.log('Environment: ' + config.port);
console.dir(config);	
console.log('Express server listening on port ' + app.get('port'));


db.sequelize.sync().then(function () {
	console.log('Connected to database');

	app.listen(app.get('port'), function () {
		console.log('Express server listening on port ' + app.get('port'));
	});

	var routes = require('./routes');

	app.use('/api', routes);
}, function (err) {
	console.log('Database connection error');
	console.log(err);
	throw err;
});
