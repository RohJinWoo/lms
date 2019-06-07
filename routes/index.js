var express = require('express');
var router = express.Router();
const userController = require('../controllers').user;

/* GET home page. */
router.get('/', userController.login_check, function(req, res, next) {
  res.render('login/login', { obj : { title: 'Login' } } );
});

router.get('/sign_up', userController.login_check, function(req, res, next){
  res.render('login/sign_up', {obj : {title:"Signup"}});
});

router.get('/find_id', userController.login_check, function(req, res, next){
  res.render('login/find_id', {obj : {title:"ID 찾기"}});
});

router.get('/find_pw', userController.login_check, function(req, res, next){
  res.render('login/find_pw', {obj : {title:"PW 찾기"}});
});

router.get('/change_pw', (req,res) => {
  res.render('login/change_pw', { obj : { title : "비밀번호 재설정" } } );
});

module.exports = router;
