var express = require('express');
var router = express.Router();
const noticeController = require('../controllers').notice;
const studentController = require('../controllers').student;
const professorController = require('../controllers').professor;
const userController = require('../controllers').user;

router.get('/main', userController.login_access, (req, res) => {
    console.log("req.session.prof_id ::: ",req.session.prof_id);
    Promise.all([noticeController.notice(req, res), professorController.ex(req, res)])
    .then( value => {
        res.render('prof/main', { obj : { title : '메인', notice : value[0] } } );
    })
    .catch(err => {
        console.log('/main err : ', err);
        res.status(400).send(err);
    });
});

router.get('/learner-check', userController.login_access, (req, res) => {
    Promise.all([studentController.std_check(req, res)])
    .then( value => {
        res.render('prof/learner_check', { obj : { title : '학습자 조회', students : value[0] } } );
    })
    .catch( err => {
        res.status(400).send(err);
    })
});

router.get('/learner-slump-check', userController.login_access, (req, res) => {
    Promise.all([studentController.std_slump_check(req, res)])
    .then( value => {
        res.render('prof/learner_slump_check', { obj : { title : '학습 부진자 조회', students : value[0] } } );
    })
    .catch( err => {
        res.status(400).send(err);
    })
});

module.exports = router;