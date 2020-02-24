'use strict';

var Q = require('q');
var pass = require('pwd');

module.exports = function (sequelize, DataTypes) {
	// const Op = sequelize.Op;

	var attributes = {
		ticker: { type: DataTypes.STRING },
		year: DataTypes.STRING,
		cashAndEquivalents: DataTypes.INTEGER,
		shortTermInvestments: DataTypes.INTEGER,
		accReceivable: DataTypes.INTEGER,
		loans: DataTypes.INTEGER,
		investmentSecurities: DataTypes.INTEGER,
		premisesAndEquipment: DataTypes.INTEGER,
		otherAssets: DataTypes.INTEGER,
		separateAccountAssets: DataTypes.INTEGER,
		totalAssets: DataTypes.INTEGER,
		customerDeposits: DataTypes.INTEGER,
		travelersChequesAndOther: DataTypes.INTEGER,
		accPayable: DataTypes.INTEGER,
		investmentCertificate: DataTypes.INTEGER,
		insuranceAndAnnuity: DataTypes.INTEGER,
		shortTermBorrowings: DataTypes.INTEGER,
		longTermDebt: DataTypes.INTEGER,
		otherLiabilities: DataTypes.INTEGER,
		separateAccLiabilities: DataTypes.INTEGER,
		totalLiabilities: DataTypes.INTEGER,
		guaranPreferredBenefIntres: DataTypes.INTEGER,
		preferredShares: DataTypes.INTEGER,
		commonStock: DataTypes.INTEGER,
		addPaidinCapital: DataTypes.INTEGER,
		retainedEarnings: DataTypes.INTEGER,
		totalAccumOtherIncome: DataTypes.INTEGER,
		totalEquity: DataTypes.INTEGER,
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
							cashAndEquivalents: element.cashAndEquivalents,
							shortTermInvestments: element.shortTermInvestments,
							accReceivable: element.accReceivable,
							loans: element.loans,
							investmentSecurities: element.investmentSecurities,
							premisesAndEquipment: element.premisesAndEquipment,
							otherAssets: element.otherAssets,
							separateAccountAssets: element.separateAccountAssets,
							totalAssets: element.totalAssets,
							customerDeposits: element.customerDeposits,
							travelersChequesAndOther: element.travelersChequesAndOther,
							accPayable: element.accPayable,
							investmentCertificate: element.investmentCertificate,
							insuranceAndAnnuity: element.insuranceAndAnnuity,
							shortTermBorrowings: element.shortTermBorrowings,
							longTermDebt: element.longTermDebt,
							otherLiabilities: element.otherLiabilities,
							separateAccLiabilities: element.separateAccLiabilities,
							totalLiabilities: element.totalLiabilities,
							guaranPreferredBenefIntres: element.guaranPreferredBenefIntres,
							preferredShares: element.preferredShares,
							commonStock: element.commonStock,
							addPaidinCapital: element.addPaidinCapital,
							retainedEarnings: element.retainedEarnings,
							totalAccumOtherIncome: element.totalAccumOtherIncome,
							totalEquity: element.totalEquity
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
