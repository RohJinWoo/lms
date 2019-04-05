var express = require('express');
var router = express.Router();
const noticeController = require('../controllers').notice;
const studentController = require('../controllers').student;
const courceController = require('../controllers').cource;

router.get('/main', (req, res) => {
  Promise.all([noticeController.notice(req, res), studentController.std_progress(req, res)])
  .then( value => {
    res.send(value);
  })
  .catch( err => {
    res.status(400).send(err);
  });
});

router.get('/sign-up-class', (req, res) => {
  Promise.all([courceController.find(req, res)])
  .then( value => {
    res.send(value);
  })
  .catch( err => {
    res.status(400).send(err);
  });
});

router.get('/check-class', (req, res) => {
  Promise.all([courceController.find(req, res)])
  .then( value => {
    res.send(value);
  })
  .catch( err => {
    res.status(400).send(err);
  });
});

router.get('/exam', (req, res) => {
  Promise.all([courceController.exam_find(req, res)])
  .then( value => {
    res.send(value);
  })
  .catch( err => {
    res.status(400).send(err);
  });
});

  module.exports = router;