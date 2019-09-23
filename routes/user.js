var express = require('express');
var router = express.Router();
var User = require('./../models').User;

router.route('/')
	.get(function (req, res) {
		User.findAll().then(function (result) {
			res.status(200).send(result);
		}, function (err) {
			res.status(500).send({ message: 'There was a problem getting the users', err: err });
		});
	});
router.route('/login')
	.post(function (req, res) {
		User.login(req.body.user).then(function (result) {
			res.status(200).send(result);
		}, function (err) {
			res.status(500).send({ message: 'There was a problem login the users', err: err });
		});
	});
router.route('/register')
	.post(function (req, res) {
		User.create(req.body.user).then(function (result) {
			res.status(200).send(result);
		}, function (err) {
			res.status(500).send({ message: 'There was a problem create the users', err: err });
		});
	});
router.route('/:id')
	.get(function (req, res) {
		User.findById(req.params.id, {
			attributes: { exclude: ['hash', 'salt'] }
		}).then(function (result) {
			res.send(result);
		}, function (err) {
			res.status(404).send({ message: "This user doesn't exist", err: err });
		});
	})
	.patch(function (req, res) {
		User.update(req.body.user, {
			where: {
				id: req.params.id
			}
		}).then(function (result) { 
			if (result[0] === 1) {
				res.status(200).send({status:'Update'});
			} else {
				res.status(404).send({ message: "This user doesn't exist" });
			}
		});
	});

module.exports = router;
