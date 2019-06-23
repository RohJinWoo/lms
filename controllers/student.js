const sequelize = require('../models').sequelize;

module.exports = {
    // 접속한 학생의 강의 진행 사항을 DB로부터 가져오는 곳

    login(req, res){
      return sequelize
      .query('SELECT pid, l_name, token FROM learners WHERE l_id = ? AND password = ?',
      { replacements : [req.body.u_id, req.body.password ], type : sequelize.QueryTypes.SELECT } )
      .catch(err => {
          console.log("std login() 에러 발생", err);
      })
    }
}