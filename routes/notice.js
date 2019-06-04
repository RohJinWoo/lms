var express = require('express');
var router = express.Router();
var noticeController = require('../controllers').notice;
var multer = require('multer');
var fs = require('fs');

var testController = require('../controllers').tests;

var storage = multer.diskStorage({
    // 저장 경로(해당 경로에 디렉토리가 존재해야지만 가능)
    destination: (req, file, cb) => {
        console.log("destination req :: ", req.body);
        console.log("destination file :: ", file);
        cb(null, 'uploads/notices');
    },
    // 파일 이름
    filename: (req, file, cb) => {
        console.log("filename req :: ", req.body);
        console.log("filename file :: ", file);
        cb(null, Date.now() + "-" + file.originalname);
    }
});
var fileFilter = function(req, file, cb){
    cb(null, true);
}
var noticeupload = multer( {
    storage: storage,
    limits : {
        fileSize : 5 * 1024 * 1024
        // 파일 크기를 5MB 이하만 허용
    },
    fileFilter : fileFilter
} );

var filepath = __dirname + "/../uploads/notices";

router.get('/', (req, res) => {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    // console.log("req.query.nowpage   ", req.query.nowpage);
    // req.body.nowpage = req.query.nowpage;
    console.log("/notice", req.route.path);
    console.log(req.query);

    if(req.query.notice_num === undefined){
        res.render('notice/notice', { obj : { title : "공지사항", nowpage : req.query.nowpage === undefined ? 1 : req.query.nowpage } } );
    }else{
        Promise.all([noticeController.findOne(req, res), noticeController.filefindOne(req, res)])
        .then(result => {
            console.log("결과",result,"end");
            if(result[0] !== undefined){
                var obj = { id : result[0][0].n_id, title : result[0][0].n_title, content : result[0][0].n_content, filepath : result[1], updatedAt : result[0][0].updatedAt };
                console.log("result :::: ",result[0]);
                if(req.query.m === 'write'){
                    res.render("notice/notice_modify", { obj } );
                }else{
                    res.render("notice/notice_board", { obj } );
                }
            }else{
                res.redirect('/notice');
            }
        })
        .catch(err => {
            res.status(400).send(err);
        })
    }
});

router.post('/pagination', (req, res) => {
    // req.body.nowpage 현재 페이지
    Promise.all([noticeController.count(req), noticeController.nowpage(req, res)])
    .then(value => {
        // value[0]/10 페이지개수
        console.log("/notice/pagination", req.route.path);
        console.log('value[0] ::: ', Math.ceil(value[0][0].count/10));
        console.log('value[1] ::: ', value[1]);
        res.send( { pageNum : Math.ceil(value[0][0].count/10), notice : value[1], nowpage : req.body.nowpage === undefined ? 1 : req.body.nowpage } );
    });
});

router.get('/edit', (req, res) => {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    console.log("/notice", req.route.path);
    res.render('notice/notice_edit', { obj : { } } );
});

router.post('/create', (req, res) => {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    noticeupload.array("userfile", 5)(req, res, (err) => {
        if(err){
            console.log("post create err발생", err);
            console.log(err.message);
            res.send("에러" + err);
        }else{
            noticeController.create(req, res, null)
            .then(result => {
                if(result){
                    req.query.notice_num = result[0];
                    if(req.files.length > 0){
                        noticeController.filecreate(req, res)
                        .then(result => {
                            console.log("확인용", result);
                        });
                    }
                    // res.send( { content : "생성 완료", link : "/notice" } );
                    res.redirect('/notice')
                }else{
                    fs.unlink(filepath + "/" + req.file.filename, (err) => {
                        // DB에 데이터 입력 실패시 업로드된 파일을 삭제
                        if(err){
                            res.send(filepath + "/" + req.file.filename, " => 업로드 디렉토리 내의 파일 삭제 도중 에러 발생!\n", err);
                        }else{
                            res.send( "DB 저장 도중 에러발생" );
                        }
                    })
                }
            });
        }
    });
});

router.post('/fileupdate', (req, res) => {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

    noticeupload.array("userfile", 5)(req, res, (err) => {
    // 1.수정으로 추가되는 파일을 multer 업로드

        if(err){
            // 1의 에러 발생시 파일 업로드 사용자에게 알림
            console.log("/fileupdate multer를 통한 파일 업로드 도중 에러 발생! : ",err);
            res.send("/fileupdate multer를 통한 파일 업로드 도중 에러 발생! : ", err);

        }else{
            // 2. 공지사항 수정 및 삭제 사항 DB 처리
            noticeController.fileupdate_commit_rollback(req, res)
            .then(result => {
                if(result.result){
                    console.log("성공 커밋합니다.");
                    console.log(req.files);
                    result.transaction.commit();
                    req.body.delete_file !== undefined ? delete_uploadfile(req.body.delete_file) : null;
                    res.send( { link : "/notice?notice_num=" + req.query.notice_num } );
                }else{
                    // 2의 에러 발생시 1에서 추가된 파일들을 삭제하고 오류를 사용자에게 알림
                    // (파일 삭제 도중 오류 발생시 3의 대처 방식과 같음)
                    console.log("실패 롤백합니다.");
                    result.transaction.rollback();
                    req.files !== undefined ? delete_rollbackfile(req.files) : null;
                    res.send( { link : "/notice?m=write&notice_num" + req.query.notice_num, err : "수정 실패" } );
                }
            })
            .catch(err => {
                console.log("noticeController.fileupdate_commit_rollback() 에러 발생!!!");
                console.log(err);
                res.send("noticeController.fileupdate_commit_rollback() 에러 발생!!!", err);
            })

            
            // 3. fs.unlink()로 파일 삭제
            let delete_uploadfile = (deletefile) => {
                if(typeof(deletefile) === 'string'){
                    fs.unlink(filepath + "/" + deletefile, (err) => {
                        if(err){
                            console.log(deletefile + " 삭제도중 에러 발생");
                        }else{
                            console.log("성공적으로 삭제 완료. 파일명 : ", deletefile);
                        }
                    });
                }else{
                    for(let i = 0; i < deletefile.length; i++){
                        fs.unlink(filepath + "/" + deletefile[i], (err) => {
                            if(err){
                                console.log(deletefile[i] + " 삭제도중 에러 발생");
                            }else{
                                console.log("성공적으로 삭제 완료. 파일명 : ", deletefile[i]);
                            }
                        });
                    }
                }
            },
            delete_rollbackfile = (deletefile) => {
                for(let i = 0; i < deletefile.length; i++){
                    fs.unlink(filepath + "/" + deletefile[i].filename, (err) => {
                        if(err){
                            console.log(deletefile[i].filename + " 삭제도중 에러 발생");
                        }else{
                            console.log("성공적으로 삭제 완료. 파일명 : ", deletefile[i].filename);
                        }
                    });
                }
            }

        }
    });
});

router.delete('/delete', (req, res) => {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    console.log("/delete");
    noticeController.delete(req, res)
    .then(() => {
        noticeController.select(req, res)
        .then(result => {
            console.log(result);
            if(result[0].count === 0){
                res.send( { content : "공지사항 삭제가 성공적으로 완료되었습니다!", link : "/notice" } );
            }else{
                res.send( { content : "공지사항 삭제가 정상적으로 이루어지지 않았습니다!", link : "/notice?notice_num=" + req.query.notice_num } );
            }
        })
    })
});

router.post('/file_search', (req, res) => {
    noticeController.filefindOne(req, res)
    .then(value => {
        console.log("/file_search value : ", value);
        if(value[0].filepath !== null){
            res.redirect("/file_sample/download?download=notices/" + value[req.query.num].filepath);
        }else{
            res.send( "요청한 내용에 관한 정보가 없습니다." );
        }
    })
    .catch(err => {
        res.status(400).send(err);
    })
});

module.exports = router;