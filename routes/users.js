var express = require('express');
var router = express.Router();

const User = require('../models/user');

router.get('/all-businesses', (req, res, next) => {
  User.find({type: 'business'}, (err, businesses) => {
    if (err) { return res.json(err).status(500); }

    return res.json(businesses);
  });
});

module.exports = router;
