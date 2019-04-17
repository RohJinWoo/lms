var express = require('express');
var session = require('express-session');
var router = express.Router();
var emailController = require('../controllers').email;
var userController = require('../controllers').user;

router.post('/login_std',  (req, res) => {
    // 로그인 관련 처리 및 세션 생성
    res.send('../std/main');
});

router.post('/login_prof', (req, res) => {
    // 로그인 관련 처리 및 세션 생성
    res.send('../prof/main');
});

router.post('/sign_up', emailController.auth, userController.sign_up, (req, res) => {
    // 회원가입 관련 처리
    res.redirect('/');
});

router.post('/find_id', emailController.auth, (req, res) => {
    userController.find(req, res, {
        type : "id",
        data : {
             where : {
                l_name : req.body.u_name,
                email : req.body.email }
            }
        })
    .then(result => {
        // 회원가입 관련 처리
        console.log(result);
        res.render("login/find_id_result", { obj : { u_id : result } } );
    })
    .catch((err) => {
        console.log(err); res.render('error', { obj : { errMessage : "ID를 찾는 도중 에러가 발생하였습니다.", path : req.route.path } } );
    });
});

router.post('/find_pw', emailController.auth, (req, res) => {
    userController.find(req, res, {
        type : "pw",
        data : {
            where : { 
                l_id : req.body.u_id,
                l_name : req.body.u_name,
                email : req.body.email
            }
        }
    })
    .then(result => {
        // 회원가입 관련 처리
        if(result){
            res.render("login/change_pw", { obj : { title : "비밀번호 재설정" } } );
        }else{
            res.render("error", { obj : { errMessage : "입력하신 정보가 올바르지 않습니다.", path : req.route.path } } );
        }
    })
    .catch((err) => {
        console.log(err); res.render('error', { obj : { errMessage : "PW를 찾는 도중 에러가 발생하였습니다.", path : req.route.path } } );
    });
});

module.exports = router;