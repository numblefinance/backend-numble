var express = require('express');
var router = express.Router();
var Graph = require('./../models').Graph;

router.route('/')
	.get(function (req, res) {
		Graph.findAll({order: [ 
			['year', 'ASC']
		]}).then(function (result) {
			res.status(200).send(result);
		}, function (err) {
			res.status(500).send({ message: 'There was a problem getting the Graphs', err: err });
		});
	});

router.route('/:id')
	.get(function (req, res) {
		Graph.findById(req.params.id, {
			attributes: { exclude: ['hash', 'salt'] }
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
				res.status(200).send({status:'Update'});
			} else {
				res.status(404).send({ message: "This Graph doesn't exist" });
			}
		});
	});

module.exports = router;
