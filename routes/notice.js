var express = require('express');
var router = express.Router();
var noticeController = require('../controllers').notice;
var multer = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({
    // 저장 경로(해당 경로에 디렉토리가 존재해야지만 가능)
    destination: (req, file, cb) => {
        cb(null, 'uploads/notices');
    },
    // 파일 이름
    filename: (req, file, cb) => {
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
                var obj = { id : result[0][0].n_id, title : result[0][0].n_title, content : result[0][0].n_content, filepath : result[1], createdAt : result[0][0].createdAt };
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
            noticeController.create(req, res)
            .then(result => {
                if(result){
                    for(var upload_cnt = 0; upload_cnt < req.files.length; upload_cnt++){
                        noticeController.filecreate(req, res, upload_cnt);
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
        if(err){
            console.log("에러",err);
            res.send(err);
        }else if(req.query.change !== "false"){
            if(typeof(req.body.change_file) !== "string"){
                for(var delete_cnt = 0; delete_cnt < req.body.change_file.length; delete_cnt++){
                    fs.unlink(filepath + "/" + req.body.change_file[delete_cnt], (err) => {
                        if(err){
                            res.send(filepath + "/" + req.body.change_file[delete_cnt], " => 업로드 디렉토리 내의 파일 삭제 도중 에러 발생!\n", err);
                        }
                    });
                }
                noticeController.delete(req, res);
            }else{
                fs.unlink(filepath + "/" + req.body.change_file, (err) => {
                    if(err){
                        res.send(filepath + "/" + req.body.change_file, " => 업로드 디렉토리 내의 파일 삭제 도중 에러 발생!\n", err);
                    }
                });
                noticeController.deleteOne(req, res);
            }
        }
        
        for(var upload_cnt = 0; upload_cnt < req.files.length; upload_cnt++){
            noticeController.fileupdatecreate(req, res, upload_cnt);
        }

        noticeController.update(req, res)
        .then(result => {
            console.log("notice/update : ", result);
            if(result[1] === 1){
                res.redirect('/notice?notice_num=' + req.query.notice_num);
            }else{
                res.send("공지사항 변경도중 에러가 발생하였습니다!");
            }
        });
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