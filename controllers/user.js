const std = require('../models').learners;
const prof = require('../models').professors;
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
        .catch((err) => {
            console.log(err);  res.send( { errMessage : "회원가입 요청을 처리하는 도중 에러가 발생하였습니다." } );
        });
    },

    select(req, res, config){
        return std
        .findOne(config.data)
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
        .catch(err => {
            console.log("redundancy_check() 에러 발생!!", err);
        });
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