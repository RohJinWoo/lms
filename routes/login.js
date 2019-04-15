var express = require('express');
var router = express.Router();
var loginController = require('../controllers').user;

router.post('/std', loginController.std_login, (req, res) => {
    res.redirect('../std/main');
});

router.post('/prof', (req, res) => {
    res.redirect('../prof/main');
});

module.exports = router;