var express = require('express');
var session = require('express-session');
const nodemailer = require('nodemailer');
var router = express.Router();
var userController = require('../controllers').user;

router.post('/sign_auth', (req, res) => {
  // 회원가입 관련 처리
  if(req.session.redundancy_check === req.body.u_id){
    let email = req.body.email;
    let id = req.body.u_id;
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user:'syncjw19@gmail.com',
        pass:'4321wasd'
      }
    });

    let token = req.body.token;
    let mailOptions = {
      from: 'syncjw19@gmail.com',
      to: email,
      subject: 'LMS 회원가입 인증',
      html: '<h1>메일 인증</h1>' + email + '<p><a href="http://localhost:3000/email/signauth/?email=' + email + '&id=' + id + '&token=' + token + '">인증하기</a></p>'
    };

    transporter.sendMail(mailOptions, function(err, info){
      if(err){
        console.log("회원가입 이메일 에러", err);
        res.send( { errMessage : "인증 이메일을 전송하지 못했습니다." + "\n" + "이메일을 다시 한번 확인바랍니다." } );
      }else{
        userController.sign_up(req, res);
      };
    });
  }else{
    res.send( { content : "ID 중복검사를 완료해주시기 바랍니다." } );
  }
});

/* https://victorydntmd.tistory.com/113 */
router.post('/emailpost', (req, res) => {
    let email = req.body.email;
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user:'syncjw19@gmail.com',
        pass:'4321wasd'
      }
    });

    let token;
    switch(req.body.req){
      case 'find_id':
        token = 'qwert';
        break;
      case 'find_pw':
        token = 'qwerty';
        break;
      default:
        break;
    };

    let mailOptions = {
      from: 'syncjw19@gmail.com',
      to: email,
      subject: 'LMS 이메일 인증',
      html: '<h1>메일 인증</h1>' + email + '<p><a href="http://localhost:3000/email/emailauth/?email=' + email + '&token=' + token + '">인증하기</a></p>'
    };
  
    transporter.sendMail(mailOptions, function(err, info){
      if(err){console.log(err);}
      else{console.log('email sent: ' + info.response);};
    });
  
    res.send( { content : req.body.email + "로 이메일을 발송하였습니다." } );
  })
  
  // email 인증(성공시 session값 생성, 실패시 nothing)
  router.get('/emailauth', (req, res) => {
    // req.query.email
    req.session.email_auth !== undefined ? req.session.email_auth.email = req.query.email : req.session.email_auth = {email : req.query.email};

    switch(req.query.token){
      case 'qwer':
        req.session.email_auth.auth = "/sign_up";
        break;
      case 'qwert':
        req.session.email_auth.auth = "/find_id";
        break;
      case 'qwerty':
        req.session.email_auth.auth = "/find_pw";
        break;
      default:
        res.send('미인증');
    }
    
    res.send('인증 완료');
  });

  router.get('/signauth', (req, res) => {
    userController.update(req, res, {
    token : null
  },{
    where : {
      token : req.query.token,
      l_id : req.query.id,
      email : req.query.email
    }
  })
  .then(result => {
    if(result[0] === 1){
      res.send("회원가입 인증 처리가 완료되었습니다.");
    }else{
      res.send("회원가입 인증 요청이 올바르지 않습니다.");
    }
  })
  .catch(err => {
    console.log("회원가입 인증 처리 도중 에러 : ");
    console.log(err);
    console.log("=======================================");
    res.send("회원가입 인증 처리 도중 에러가 발생하였습니다.", err);
  })
  });
  
  module.exports = router;
  