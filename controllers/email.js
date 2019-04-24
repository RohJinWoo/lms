module.exports = {
  auth(req, res, next){
    console.log('req.body : ', req.body);
    if(req.session.email_auth !== undefined){
      console.log('req ===================================>>>>>>>>>>>>>>>>>>>>>>> ');
      console.log(req.body);
      let email_auth = req.session.email_auth;
      let email = req.body.email;
      let path = req.route.path;
      console.log('email_auth.auth === path >>>>>>>>>>>>>>>>>>>>>>>>>>>. ', email_auth.auth, ' / ',  path);
      console.log('email_auth.auth === path >>>>>>>>>>>>>>>>>>>>>>>>>>>. ', email_auth.auth === path);
      if(email_auth.auth === path && email_auth.email === email)
      {
        console.log('이메일 인증 완료된 상태');
        req.session.email_auth = undefined;
        next();
      }
      else
      {
        req.session.email_auth = undefined; 
        res.send( { errMessage : "이메일 인증처리 도중 에러가 발생하였습니다." } );
      }
    }
    else
    {
      res.send( { errMessage : "이메일 인증을 해주세요." } );
    }
  },
}