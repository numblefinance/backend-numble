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
			type: DataTypes.STRING,
			unique: 'compositeIndex'
		}, 
		deletedAt: DataTypes.DATE
	};

	var User = sequelize.define('User', attributes);
 

	User.login = function (user) {
		return User.find({
			attributes: ['id', 'username', 'hash', 'salt', 'type', 'active', 'blocked', 'quizReady'],
			where: {
				username: user
			}
		});
	};

 

	return User;
};
