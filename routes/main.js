var express = require('express');
var router = express.Router();
var Main = require('./../models').Main;

router.route('/')
	.get(function (req, res) {
		Main.findActiveMains().then(function (result) {
			res.status(200).send(result);
		}, function (err) {
			res.status(500).send({ message: 'There was a problem getting the mains', err: err });
		});
	});

router.route('/:id')
	.get(function (req, res) {
		Main.findById(req.params.id, {
			attributes: { exclude: ['hash', 'salt'] }
		}).then(function (result) {
			res.send(result);
		}, function (err) {
			res.status(404).send({ message: "This main doesn't exist", err: err });
		});
	})
	.patch(function (req, res) {
		Main.update(req.body, {
			where: {
				id: req.params.id
			}
		}).then(function (result) {
			if (result[0] === 1) {
				res.status(204).send();
			} else {
				res.status(404).send({ message: "This main doesn't exist" });
			}
		});
	});

module.exports = router;
