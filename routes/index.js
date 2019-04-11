var express = require('express');
var router = express.Router();
const userController = require('../controllers').user;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { obj : { title: 'Express' } } );
});

router.get('/sign_up', function(req, res, next){
  res.render('login/sign_up', {obj : {title:"회원가입"}});
});

router.get('/find_id', function(req, res, next){
  res.render('login/find_id', {obj : {title:"ID 찾기"}});
});

router.get('/find_pw', function(req, res, next){
  res.render('login/find_pw', {obj : {title:"PW 찾기"}});
});
router.get('/change_pw', function(req, res, next){
  res.render('login/change_pw', {obj : {title:"PW 변경"}});
});

module.exports = router;
