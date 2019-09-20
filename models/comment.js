'use strict';

var Q = require('q');
var pass = require('pwd');

module.exports = function (sequelize, DataTypes) {
	// const Op = sequelize.Op;

	var attributes = {
		comment: DataTypes.TEXT,
		idUser:DataTypes.INTEGER,
		idCompany:DataTypes.INTEGER,
		deletedAt: DataTypes.DATE
	};

	var Comment = sequelize.define('Comment', attributes);

	Comment.associate = function (models) {
		Comment.belongsTo(models.User);
		Comment.belongsTo(models.Main);
	};

	return Comment;
};
