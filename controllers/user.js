const std = require('../models').Learners;
const prof = require('../models').Professors;
const sequelize = require('../models').sequelize;

module.exports = {

    std_login(req, res, next){
        return std
        .findOne({
            where : { l_id : req.body.u_id }
        })
        .then(result => {
            next();
        })
        .catch(err => {
            res.status(400).send(err);
        })
    },

    prof_login(req, res, next){
        return prof
        .findOne({
            where : { p_id : req.body.u_id }
        })
        .then(result => {
            next();
        })
        .catch(err => {
            res.status(400).send(err);
        })
    },

    sign_up(req, res){
        return std
        .create({
            l_id : req.body.u_id,
            l_name : req.body.u_name,
            password : req.body.password,
            email : req.body.email,
            token : req.body.token,
        })
        .then((result) => {
            console.log("result : ", result);
            if(result !== undefined){
                console.log("create complete! 이메일 인증해주시기 바랍니다.");
                console.log('email sent: ' + info.response);
                req.session.destroy();
                res.send( { link : 'user/sign_auth/?email=' + email + "&id=" + id } );
            }
        })
        .catch((err) => {
            console.log(err);  res.send( { errMessage : "회원가입 요청을 처리하는 도중 에러가 발생하였습니다." } );
        });
    },

    select(req, res, config){
        return std
        .findOne(config.data)
        .then((result) => {
            console.log('result      ::::  >>>>>>  ', result);
            if(config.type === "id"){
                return result.l_id;
            }else if(result !== null){
                return { l_id : result.l_id , result : true};
            }
            return false;
        });
    },

    update(req, res, field, config){
        return std
        .update(field, config)
        .catch(err => {
            res.status(400).send('DB Update 요청에서 에러가 발생하였습니다.', err);
        });
    },
    
    // 중복검사
    redundancy_check(req, res){
        return sequelize
        .query(
            'SELECT l_id FROM learners WHERE l_id = ?',
            { replacements : [req.body.u_id], type: sequelize.QueryTypes.SELECT }
        )
        .then(result => {
            console.log("redundancy_check() result :: ", result[0]);
            if(result[0] !== undefined){
                res.send( { content : "이미 존재하는 ID입니다.\n" + "다른 ID를 입력하시기 바랍니다." } );
            }else{
                req.session.redundancy_check = req.body.u_id;
                res.send( { content : "사용가능한 ID입니다." } );
            }
        })
        .catch(err => {
            console.log("redundancy_check() 에러 발생!!", err);
        });
    },

    logout(req, res){
        console.log("req.session :::: ", req.session);
        if(req.session.prof_id !== undefined){
            req.session.destroy();
        }else if(req.session.std_id !== undefined){
            req.session.destroy();
        }else{
            res.redirect('/');
        }
        console.log("req.session처리 이후 :: ", req.session);
        res.redirect('/');
    },

    login_access(req, res, next){
        if(req.session.std_id === undefined && req.session.prof_id === undefined){
            res.redirect('/');
        }else if(req.session.std_id !== undefined && req.baseUrl === "/prof"){
            res.redirect('/std/main');
        }else if(req.session.prof_id !== undefined && req.baseUrl === "/std"){
            res.redirect('/prof/main');
        }
        console.log("login_check() req.session : ", req.session);
        console.log("req.baseUrl :: ", req.baseUrl);
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        next();
    },

    login_check(req, res, next){
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        if(req.session.std_id !== undefined){
          res.redirect('/std/main');
        }else if(req.session.prof_id !== undefined){
          res.redirect('/prof/main');
        }
        next();
    }
};