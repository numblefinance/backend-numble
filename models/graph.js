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

	Graph.uploadCSV = function (regis) {
		return new Promise((resolve, reject) => {
			let countUpdate = 0;
			let countInsert = 0
			regis.shift();
			regis.forEach(element => {
				Graph.findOne({ where: { ticker: element.ticker }, attributes: ['id'] }).then(project => {
					if (project) {
						countUpdate++;
						Graph.update({
							ticker: element.ticker,
							year: element.year,
							revenue: element.revenue,
							costRevenue: element.costRevenue,
							grossProfit: element.grossProfit,
							research: element.research,
							selling: element.selling,
							other: element.other,
							incomeTax: element.incomeTax,
							netIncome: element.netIncome,
							company: element.company
						}
							, {
								where: {
									ticker: element.ticker
								}
							});
					} else {
						countInsert++;
						Graph.create(element);
					}
					if (regis.length == countInsert + countUpdate) {
						let response = {
							countUpdate: countUpdate,
							countInsert: countInsert
						}
						resolve(response);
					}
				})
			});
		})
	};

	return Graph;
};
