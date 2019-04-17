module.exports = {
  auth(req, res, next){
    if(req.session.email_auth !== undefined){
      let email_auth = req.session.email_auth;
      if(email_auth.auth === "qwer" && email_auth.email === req.body.email)
      {
        console.log('이메일 인증 완료된 상태 sign_auth');
      }
      else if(email_auth.auth === "qwert" && email_auth.email === req.body.email)
      {
        console.log('이메일 인증 완료된 상태 find_no');
      }
      else if(email_auth.auth === "qwerty" && email_auth.email === req.body.email)
      {
        console.log('이메일 인증 완료된 상태 find_pw');
      }
      else
      {
        req.session.email_auth = undefined;
        res.render('error', { obj : { errMessage : "이메일 인증처리 도중 에러가 발생하였습니다.", path : req.route.path } } );
      }
      req.session.email_auth = undefined;
      next();
    }
    else
    {
      res.render('error', { obj : { errMessage : "이메일 인증을 해주세요.", path : req.route.path } } );
    }
  },
}