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
        console.log("바디,",req.body, "바디종료");
        console.log("파일",req.files.length);
        return sequelize
        .query(
            'INSERT INTO Notices(n_title, n_content, createdAt, updatedAt) VALUES(?, ?, ?, ?)',
            { replacements: [ req.body.title, req.body.content, req.query.now, req.query.now ], type: sequelize.QueryTypes.INSERT }
        )
        .catch(err => {
            console.log("create() 에러 발생!!!!! ", err);
        });
    },

    filecreate(req, res, upload_cnt){
        return sequelize
        .query(
            'INSERT INTO notice_uploadfiles(n_id, filepath) VALUES((SELECT n_id FROM notices ORDER BY n_id DESC LIMIT 0, 1), ?)',
            { replacements: [ req.files[upload_cnt].filename ], type : sequelize.query.INSERT }
        )
        .catch(err => {
            console.log("filecreate" + upload_cnt + "() 에러 발생!!!! ", err);
        });
    },
    
    nowpage(req, res){
        console.log(req.body);
        return sequelize
        .query('SELECT n.n_id, n.n_title, n.createdAt, nu.file_cnt FROM notices n LEFT JOIN (SELECT n_id, count(filepath) as file_cnt FROM notice_uploadfiles GROUP BY n_id) nu ON n.n_id = nu.n_id ORDER BY n.n_id DESC LIMIT ?, 10'
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

    filefindOne(req, res){
        return sequelize
        .query('SELECT filepath FROM notice_uploadfiles WHERE n_id = ?',
        { replacements : [req.query.notice_num] , type : sequelize.QueryTypes.SELECT } )
        .catch(err => {
            console.log("filefindOne() 에러 발생", err);
        })
    },

    update(req, res){
        return sequelize
        .query('UPDATE notices SET n_title = ?, n_content = ?, updatedAt = ? WHERE n_id = ?',
        { replacements : [ req.body.title, req.body.content, req.query.now, req.query.notice_num ], type : sequelize.QueryTypes.UPDATE } )
        .catch(err => {
            console.log("noticeController update() 에러 발생", err);
            res.select("noticeController update() 에러 발생", err);
        })
    },

    delete(req, res){
        return sequelize
        .query('DELETE FROM notice_uploadfiles WHERE filepath IN (?, ?, ?, ?, ?)',
        { replacements : [req.body.change_file[0], req.body.change_file[1], req.body.change_file[2], req.body.change_file[3], req.body.change_file[4] ], type : sequelize.QueryTypes.DELETE } )
        .catch(err => {
            console.log("noticeController delete() 에러 발생", err);
        })
    },

    deleteOne(req, res){
        return sequelize
        .query('DELETE FROM notice_uploadfiles WHERE filepath = ?',
        { replacements : [req.body.change_file ], type : sequelize.QueryTypes.DELETE } )
        .catch(err => {
            console.log("noticeController delete() 에러 발생", err);
        })
    },

    fileupdatecreate(req, res, upload_cnt){
        return sequelize
        .query(
            'INSERT INTO notice_uploadfiles(n_id, filepath) VALUES(?, ?)',
            { replacements: [ req.query.notice_num, req.files[upload_cnt].filename ], type : sequelize.query.INSERT }
        )
        .catch(err => {
            console.log("filecreate" + upload_cnt + "() 에러 발생!!!! ", err);
        });
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