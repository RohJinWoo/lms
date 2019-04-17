const std = require('../models').Learners;
const prof = require('../models').Professors;
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

    sign_up(req, res, next){
        return std
        .create({
            l_id : req.body.u_id,
            l_name : req.body.u_name,
            password : req.body.password,
            email : req.body.email
        })
        .then((result) => {
            console.log("create complete!"); next();
        })
        .catch((err) => {
            console.log(err);  res.render('error', { obj : { errMessage : "회원가입 요청을 처리하는 도중 에러가 발생하였습니다." } } );
        });
    },

    find(req, res, config){
        return std
        .findOne(config.data)
        .then((result) => {
            if(config.type === "id"){
                return result.l_id;
            }else if(result !== null){
                return true;
            }
            return false;
        });
    }
};