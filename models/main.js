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
	Main.associate = function (models) {
		Main.hasMany(models.Comment);
	};
	
	Main.uploadCSV = function (regis) {
		return new Promise((resolve, reject) => {
			let countUpdate = 0;
			let countInsert = 0
			regis.shift();
			regis.forEach(element => {
				Main.findOne({ where: { ticker: element.ticker }, attributes: ['id'] }).then(project => {
					if (project) {
						countUpdate++;
						Main.update({
							company: element.company,
							count: element.count,
							graph1: element.graph1,
							graph2: element.graph2,
							description: element.description,
							comun: element.comun,
							url: element.url
						}
							, {
								where: {
									ticker: element.ticker
								}
							});
					} else {
						countInsert++;
						Main.create(element);
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

	return Main;
};
