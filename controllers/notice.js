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

    filecreate(req, res, t){
        let insert_query = 'INSERT INTO notice_uploadfiles(n_id, filepath) VALUES', insert_replacements =[];

        for(let i = 0; i < req.files.length; i++){
            insert_query = insert_query + "(?, ?),";
            insert_replacements.push(req.query.notice_num);
            insert_replacements.push(req.files[i].filename);
        }


        return sequelize
        .query(
            insert_query.slice(0, insert_query.length - 1),
            { replacements: insert_replacements, type : sequelize.query.INSERT }, { transaction : t }
        )
        .then(result => {
            if(t){
                console.log("filecreate() 트랜잭션 완료");
                return { result : true, transaction : t };
            }
            else{
                return result;
            }
        })
        .catch(err => {
            console.log("filecreate" + upload_cnt + "() 에러 발생!!!! ", err);

            if(t){
                return { result : false, transaction : t };
            }
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


        return sequelize.transaction().then((t) => {
            return sequelize
            .query('DELETE FROM notice_uploadfiles WHERE n_id = ?',
            { replacements : [ req.query.notice_num, req.query.notice_num ], type : sequelize.QueryTypes.DELETE }, { transaction : t } )
            .then(() => {
                return sequelize
                .query('DELETE FROM notices WHERE n_id = ?',
                {replacements : [ req.query.notice_num ], type : sequelize.QueryTypes.DELETE }, { transaction : t } )
                .then(() => {
                    return sequelize
                    .query("SELECT * FROM notices n, notice_uploadfiles nu WHERE n.n_id = nu.n_id AND n.n_id = ?",
                    { replacements : [ req.query.notice_num ], type : sequelize.QueryTypes.SELECT }, { transaction : t} )
                    .then(result => {
                        if(result.length){
                            // 삭제 안됨
                            return { result : false, transaction : t }
                        }else{
                            // 완벽 삭제
                            return { result : true, transaction : t }
                        }
                    })
                    .catch(err => {
                        console.log("delete() 트랜잭션 오류 : ", err);
                        return { result : false, transaction : t }
                    })
                })
            })
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
    },

    fileupdate_commit_rollback(req, res){
        // 쿼리문을 프론트에서 어느정도 가꿔서 서버로 보내준다.

        // delete sql
        let delete_query;
        if(req.body.delete.length > 2){
            delete_query = "DELETE FROM notice_uploadfiles WHERE filepath IN " + req.body.delete;
        }else{
            delete_query = "DELETE FROM notice_uploadfiles WHERE false";
        }

        return sequelize.transaction().then((t) => {
            return sequelize
            // delete는 쿼리 조건에 or로 해결
            .query(delete_query,
            { type : sequelize.QueryTypes.DELETE }, { transaction : t })
            .then(() => {
                return sequelize
                .query("UPDATE notices SET n_title = ?, n_content = ? WHERE n_id = ?",
                { replacements : [ req.body.title, req.body.content, req.query.notice_num ], type : sequelize.QueryTypes.UPDATE }, { transaction : t })
                .then((result) => {
                    console.log("fileupdate_commit_rollback() 실행 완료 : ", result);
                    if(req.files.length > 0){
                        this.filecreate(req, res, t)
                        .then(result => {
                            return result;
                        });
                    }
                    return { result : true, transaction : t };
                })
                .catch((err) => {
                    console.log("fileupdate_commit_rollback() 실행 오류 : ", err);
                    return { result : false, transaction : t };
                })
            })
        })
    }
}