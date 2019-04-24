var express = require('express');
var session = require('express-session');
const nodemailer = require('nodemailer');
var router = express.Router();
var userController = require('../controllers').user;

router.post('/sign_auth', userController.sign_up, (req, res) => {
  // 회원가입 관련 처리
  res.redirect('/user/sign_auth/?email=' + req.body.email + "&id=" + req.body.u_id);
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
      case 'sign_up':
        token = 'qwer';
        break;
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
  })
  
  module.exports = router;
  