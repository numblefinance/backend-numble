'use strict';

var Q = require('q');
var pass = require('pwd');

module.exports = function (sequelize, DataTypes) {
	// const Op = sequelize.Op;

	var attributes = {
		ticker: { type: DataTypes.STRING },
		year: DataTypes.STRING,
		revenue: DataTypes.INTEGER,
		costRevenue: DataTypes.INTEGER,
		grossProfit: DataTypes.INTEGER,
		research: DataTypes.INTEGER,
		selling: DataTypes.INTEGER,
		other: DataTypes.INTEGER,
		incomeTax: DataTypes.INTEGER,
		netIncome: DataTypes.INTEGER,
		deletedAt: DataTypes.DATE
	};

	var Graph = sequelize.define('Graph', attributes);

	return Graph;
};
