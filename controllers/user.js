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
                req.session.redundancy_check = undefined;
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
        })
    },
};