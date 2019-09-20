'use strict';

var Q = require('q');
var pass = require('pwd');

module.exports = function (sequelize, DataTypes) {
	// const Op = sequelize.Op;

	var attributes = {
		username: { type: DataTypes.STRING, unique: true },
		password: DataTypes.STRING, 
		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
		email: {
			type: DataTypes.STRING
		}, 
		type: DataTypes.STRING,
		deletedAt: DataTypes.DATE
	};

	var User = sequelize.define('User', attributes);
	User.associate = function (models) {
		User.hasMany(models.Comment);
	};
	

	User.login = function (body) {
		return User.findAll({ 
			where: {
				username: body.username,
				password: body.password
			}
		});
	};

 

	return User;
};
