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
        return sequelize
        .query(
            'INSERT INTO Notices(n_title, n_content, createdAt, updatedAt) VALUES(?, ?, ?, ?)',
            { replacements: [ req.body.title, req.body.content, req.body.now, req.body.now ], type: sequelize.QueryTypes.INSERT }
        )
        .then(result => {
            console.log("/notice", req.route.path);
            console.log('result :::::: ', result);
            if(result[0]){
                console.log("req.body   ::::::::    ", req.body);
                console.log("/notice/create");
                res.send( { content : "생성 완료", link : "/notice" } );
            }
            res.send( { errMessage : "에러발생" } );
        })
        .catch(err => {
            console.log("create() 에러 발생!!!!! ", err);
        });
     },
    
    nowpage(req, res){
        console.log(req.body);
        return sequelize
        .query('SELECT n_id, n_title, createdAt FROM notices ORDER BY n_id DESC LIMIT ?, 10'
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
        { replacements : [req.body.title, req.body.content,req.body.update, req.query.notice_num], type : sequelize.QueryTypes.UPDATE } )
        .then(result => {
            console.log("notice/update : ", result);
            if(result[1] === 1){
                res.send( { content : "공지사항 변경이 완료되었습니다!", link : "/notice?notice_num=" + req.query.notice_num } );
            }else{
                res.send( { errMessage : "공지사항 변경도중 에러가 발생하였습니다!", link : "/notice?notice_num=" + req.query.notice_num } );
            }
        })
        .catch(err => {
            console.log("noticeController update() 에러 발생", err);
        })
    },

    delete(req, res){
        return sequelize
        .query('DELETE FROM notices WHERE n_id = ?',
        { replacements : [parseInt(req.query.notice_num)], type : sequelize.QueryTypes.DELETE } )
        .then(() => {
            return sequelize
            .query('SELECT count(*) as count FROM notices WHERE n_id = ?',
            { replacements : [req.query.notice_num], type : sequelize.QueryTypes.SELECT } )
            .then(result => {
                console.log(result);
                if(result[0].count === 0){
                    res.send( { content : "공지사항 삭제가 성공적으로 완료되었습니다!", link : "/notice" } );
                }else{
                    res.send( { content : "공지사항 삭제가 정상적으로 이루어지지 않았습니다!", link : "/notice?notice_num=" + req.query.notice_num } );
                }
            })
        })
        .catch(err => {
            console.log("noticeController delete() 에러 발생", err);
        })
    }
}