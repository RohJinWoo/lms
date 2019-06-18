const sequelize = require('../models').sequelize;

module.exports = {
    // 접속한 학생의 강의 진행 사항을 DB로부터 가져오는 곳

    login(req, res){
      return sequelize
      .query('SELECT pid, l_name FROM learners WHERE l_id = ? AND password = ?',
      { replacements : [req.body.u_id, req.body.password ], type : sequelize.QueryTypes.SELECT } )
      .catch(err => {
          console.log("std login() 에러 발생", err);
      })
    },

    std_progress(req, res){
        console.log("학생의 강의 진행도를 DB로부터 가져오는 단계");
        return [ { cource_name : '강좌1', progress : 95 }, { cource_name : '강좌2', progress : 10 } ];
    },

    std_year(req, res){
        console.log('학생의 활동 연도와 학기를 가져오는 단계');
        return [ 2019, 2018, 2017, 2016, 2015 ];
    },

    std_check(req, res){
      console.log('모든 학습자를 조회');
      return [ { } ];  
    },

    std_slump_check(req, res){
      console.log('학습 부진자를 조회');
      return [ { } ];  
    }
}