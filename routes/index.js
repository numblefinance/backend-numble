var routes = require('express').Router();
var morgan = require('morgan');
routes.use(morgan('dev'));
   
 
routes.use('/user', require('./user')); 
routes.use('/main', require('./main')); 
routes.use('/comment', require('./comment')); 

module.exports = routes;
