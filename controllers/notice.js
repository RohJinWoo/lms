const sequelize = require('../models').sequelize;

// console.log(models.sequelize.query())
// console.log('notice??',notice)
module.exports = {
    // 공지 사항 내용을 DB로부터 가져오는 곳
    notice(req, res){
        console.log('공지사항을 DB로부터 값을 가져와야함')
        // return  [ {title : '공지 제목1', date : '2019-02-04'}, {title : '공지 제목2', date : '2019-01-29'} ];
        return sequelize
        .query('SELECT n_id, n_title, createdAt FROM notices ORDER BY n_id DESC LIMIT 0, 4',
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
        console.log(req.body);
        console.log(req.file);
        return sequelize
        .query(
            'INSERT INTO Notices(n_title, n_content, filepath, createdAt, updatedAt) VALUES(?, ?, ?, ?, ?)',
            { replacements: [ req.body.title, req.body.content, req.file.filename !== undefined ? req.file.filename : null, req.query.now, req.query.now ], type: sequelize.QueryTypes.INSERT }
        )
        .catch(err => {
            console.log("create() 에러 발생!!!!! ", err);
        });
     },
    
    nowpage(req, res){
        console.log(req.body);
        return sequelize
        .query('SELECT n_id, n_title, CASE WHEN filepath IS NULL THEN false ELSE true END AS uploadfile, createdAt FROM notices ORDER BY n_id DESC LIMIT ?, 10'
        , { replacements: [ (req.body.nowpage - 1) * 10 ], type: sequelize.QueryTypes.SELECT } )
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

    update(req, res){
        return sequelize
        .query('UPDATE notices SET n_title = ?, n_content = ?, updatedAt = ? WHERE n_id = ?',
        { replacements : [ req.body.title, req.body.content, req.query.now, req.query.notice_num ], type : sequelize.QueryTypes.UPDATE } )
        .catch(err => {
            console.log("noticeController update() 에러 발생", err);
        })
    },

    fileupdate(req, res){
        // console.log("fileupdate controller req.file.filename ::: ", req.file.filename);
        return sequelize
        .query('UPDATE notices SET n_title = ?, n_content = ?, filepath = ?, updatedAt = ? WHERE n_id = ?',
        { replacements : [ req.body.title, req.body.content, req.file !== undefined ? req.file.filename : null, req.query.now, req.query.notice_num ], type : sequelize.QueryTypes.UPDATE } )
        .catch(err => {
            console.log("noticeController update() 에러 발생", err);
        })
    },

    delete(req, res){
        return sequelize
        .query('DELETE FROM notices WHERE n_id = ?',
        { replacements : [parseInt(req.query.notice_num)], type : sequelize.QueryTypes.DELETE } )
        .catch(err => {
            console.log("noticeController delete() 에러 발생", err);
        })
    },

    select(req, res){
        return sequelize
        .query('SELECT count(*) as count FROM notices WHERE n_id = ?',
        { replacements : [req.query.notice_num], type : sequelize.QueryTypes.SELECT } )
        .catch(err => {
            console.log("noticeController select() 에러 발생", err);
        })
    }
}