var express = require('express');
var router = express.Router();
var Comment = require('./../models').Comment;

router.route('/:id')
	.get(function (req, res) {
		Comment.findAll({
			where: {
				idCompany: req.params.id
			}
		  }).then(function (result) {
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
