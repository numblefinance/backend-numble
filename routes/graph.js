var express = require('express');
var router = express.Router();
var Graph = require('./../models').Graph;

router.route('/')
	.get(function (req, res) {
		Graph.findAll({
			order: [
				['year', 'ASC']
			]
		}).then(function (result) {
			res.status(200).send(result);
		}, function (err) {
			res.status(500).send({ message: 'There was a problem getting the Graphs', err: err });
		});
	});

router.route('/:ticker')
	.get(function (req, res) {
		Graph.findAll({
			attributes: {
				exclude: ['hash', 'salt'],
			},
			order: [
				['year', 'ASC']
			],
			where: {
				ticker: req.params.ticker
			}
		}).then(function (result) {
			res.send(result);
		}, function (err) {
			res.status(404).send({ message: "This Graph doesn't exist", err: err });
		});
	})
	.patch(function (req, res) {
		Graph.update(req.body.Graph, {
			where: {
				id: req.params.id
			}
		}).then(function (result) {
			if (result[0] === 1) {
				res.status(200).send({ status: 'Update' });
			} else {
				res.status(404).send({ message: "This Graph doesn't exist" });
			}
		});
	});

router.route('/uploadCSV')
	.post(function (req, res) {
		Graph.uploadCSV(req.body.regis).then(function (result) {
			res.status(200).send(result);
		}, function (err) {
			res.status(500).send({ message: 'There was a problem login the upload', err: err });
		});
	});

module.exports = router;
