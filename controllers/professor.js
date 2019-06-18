const sequelize = require('../models').sequelize;

module.exports = {
    ex(req, res){
        console.log("예시용");
        return [{}];
    },
    
    login(req, res){
        return sequelize
        .query('SELECT pid, p_name FROM professors WHERE p_id = ? AND password = ?',
        { replacements : [req.body.u_id, req.body.password ], type : sequelize.QueryTypes.SELECT } )
        .catch(err => {
            console.log("prof login() 에러 발생", err);
        })
    }
};