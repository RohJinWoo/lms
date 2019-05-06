const sequelize = require('../models').sequelize;

// console.log(models.sequelize.query())
// console.log('notice??',notice)
module.exports = {
    // 공지 사항 내용을 DB로부터 가져오는 곳
    notice(req, res){
        console.log('공지사항을 DB로부터 값을 가져와야함')
        // return  [ {title : '공지 제목1', date : '2019-02-04'}, {title : '공지 제목2', date : '2019-01-29'} ];
        return sequelize
        .query('SELECT n_id, n_title, createdAt FROM notices WHERE  n_id BETWEEN (SELECT count(*) -4 as count FROM Notices) AND (SELECT count(*) as count FROM Notices) ORDER BY n_id DESC',
        { type : sequelize.QueryTypes.SELECT } )
        .catch(err => {
            console.log("notice() 에러남", err);
        })
    },

    // notice
    count(req){
        return sequelize
        // .count()
        .query('SELECT count(*) as count FROM Notices', { type: sequelize.QueryTypes.SELECT } )
        // .then(result => {
        //     req.body.allnotice = result[0].count;
        //     console.log('result      : ', result[0].count);
        //     console.log("req.body.allnotice : ",req.body.allnotice);
        // })
        .catch(err => {
            console.log("notice count에러 발생!!! ", err);
        })
    },

    create(req, res){
        return sequelize
        .query(
            'INSERT INTO Notices VALUES((SELECT Count(*) + 1 FROM Notices n), ?, ?, ?, ?)',
            { replacements: [ req.body.title, req.body.content, req.body.now, req.body.now ], type: sequelize.QueryTypes.INSERT }
        )
        .catch(err => {
            console.log("create() 에러 발생!!!!! ", err);
        });
     },
    
    nowpage(req, res){
        console.log(req.body);
        return sequelize
        .query('SELECT n_id, n_title, createdAt FROM notices WHERE n_id BETWEEN (SELECT count(*) - ? as count FROM Notices) AND (SELECT count(*) - ? as count FROM Notices) ORDER BY n_id DESC'
        // , { replacements: [req.body.startnotice === undefined ? req.body.allnotice - 9 : req.body.startnotice, req.body.endnotice === undefined ? req.body.allnotice : req.body.endnotice], type: sequelize.QueryTypes.SELECT } )
        , { replacements: [req.body.nowpage === undefined ? 9 : (req.body.nowpage * 10 - 1), req.body.nowpage === undefined ? 0 : ((req.body.nowpage - 1) * 10)], type: sequelize.QueryTypes.SELECT } )
        // .then(result => {
        //     console.log(result);
        //     console.log("req.body.allnotice ::: ",req.body.allnotice);
        // })
        .catch(err => {
             console.log("nowpage() 에러 발생", err);
        });  
    },

    findOne(req, res){
        return sequelize
        .query('SELECT * FROM notices WHERE n_id = ?',
        { replacements : [req.query.notice_num] , type : sequelize.QueryTypes.SELECT } )
        .catch(err => {
            console.log("findOne() 에러 발생", err);
        })
    },
}