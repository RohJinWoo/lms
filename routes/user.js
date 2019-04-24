var express = require('express');
var session = require('express-session');
var router = express.Router();
var emailController = require('../controllers').email;
var userController = require('../controllers').user;

router.post('/login_std',  (req, res) => {
    // 로그인 관련 처리 및 세션 생성
    res.send( { link : '../std/main' } );
});

router.post('/login_prof', (req, res) => {
    // 로그인 관련 처리 및 세션 생성
    res.send( { link : '../prof/main' } );
});

router.get('/sign_auth', (req, res) => {
    res.render('login/email_auth', { obj : { id : req.query.id, email : req.query.email } } );
});

router.post('/find_id', emailController.auth, (req, res) => {
    userController.select(req, res, {
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
        res.send( { content : "찾으시는 ID는 [ " + result + " ]입니다." } );
    })
    .catch((err) => {
        console.log(err); res.send( { errMessage : "ID를 찾는 도중 에러가 발생하였습니다." } );
    });
});

router.post('/find_pw', emailController.auth, (req, res) => {
    userController.select(req, res, {
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
        if(result.result){
            var sess = req.session;
            sess.l_id = result.l_id;
            console.log("req.session.l_id ====================== ", req.session.l_id);
            res.render("login/change_pw", { obj : { title : "비밀번호 재설정" } } );
        }else{
            res.send( { errMessage : "입력하신 정보가 올바르지 않습니다." } );
        }
    })
    .catch((err) => {
        console.log(err); res.send( { errMessage : "PW를 찾는 도중 에러가 발생하였습니다."} );
    });
});

router.post('/change_pw', (req, res) => {
    userController.update(req, res, {
        password : req.body.password
    },
    {
        where : { 
            l_id : req.session.l_id,
        }
    })
    .then(result => {
        // 회원가입 관련 처리
        console.log("FDFDSFS");
        console.log(result);
        if(result !== null){
            console.log(result);
            req.session.l_id = undefined;
            res.send( { content : "입력하신 내용으로 비밀번호 변경이 완료되었습니다." } );
        }else{
            res.send( { errMessage : "입력하신 정보가 올바르지 않습니다." } );
        }
    })
    .catch((err) => {
        console.log(err); res.send( { errMessage : "PW변경 도중 에러가 발생하였습니다." } );
    });
});

module.exports = router;