'use strict';

var Q = require('q');
var pass = require('pwd');

module.exports = function (sequelize, DataTypes) {
	// const Op = sequelize.Op;

	var attributes = {
		ticker: { type: DataTypes.STRING, unique: true },
		company: DataTypes.STRING, 
		count: DataTypes.INTEGER, 
		graph1: DataTypes.STRING,
		graph2: DataTypes.STRING,  
		description: DataTypes.TEXT, 
		comun: DataTypes.STRING,  
		url: DataTypes.STRING, 
		deletedAt: DataTypes.DATE
	};

	var Main = sequelize.define('Main', attributes);
 

	Main.login = function (main) {
		return Main.find({
			attributes: ['id', 'mainname', 'hash', 'salt', 'type', 'active', 'blocked', 'quizReady'],
			where: {
				mainname: main
			}
		});
	};

 

	return Main;
};
