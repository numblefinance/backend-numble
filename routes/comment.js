var express = require('express');
var router = express.Router();
var Comment = require('./../models').Comment;

router.route('/')
	.get(function (req, res) {
		Comment.findAll().then(function (result) {
			res.status(200).send(result);
		}, function (err) {
			res.status(500).send({ message: 'There was a problem getting the comments', err: err });
		});
	}); 
router.route('/create')
	.post(function (req, res) {
		Comment.create(req.body.comment).then(function (result) {
			res.status(200).send(result);
		}, function (err) {
			res.status(500).send({ message: 'There was a problem create the comments', err: err });
		});
	});
router.route('/:id')
	.get(function (req, res) {
		Comment.findById(req.params.id, {
			attributes: { exclude: ['hash', 'salt'] }
		}).then(function (result) {
			res.send(result);
		}, function (err) {
			res.status(404).send({ message: "This comment doesn't exist", err: err });
		});
	})
	.patch(function (req, res) {
		Comment.update(req.body, {
			where: {
				id: req.params.id
			}
		}).then(function (result) {
			if (result[0] === 1) {
				res.status(204).send();
			} else {
				res.status(404).send({ message: "This comment doesn't exist" });
			}
		});
	});

module.exports = router;
