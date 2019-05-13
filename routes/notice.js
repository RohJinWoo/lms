var express = require('express');
var router = express.Router();
var noticeController = require('../controllers').notice;

router.get('/', (req, res) => {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    // console.log("req.query.nowpage   ", req.query.nowpage);
    // req.body.nowpage = req.query.nowpage;
    console.log("/notice", req.route.path);
    console.log(req.query);

    if(req.query.notice_num === undefined){
        res.render('notice/notice', { obj : { title : "공지사항", nowpage : req.query.nowpage === undefined ? 1 : req.query.nowpage } } );
    }else{
        noticeController.findOne(req, res)
        .then(result => {
            console.log(req.query);
            if(result[0] !== undefined){
                var obj = { id : result[0].n_id, title : result[0].n_title, content : result[0].n_content, createdAt : result[0].createdAt };
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
    noticeController.create(req, res)
    .then(result => {
        console.log("/notice", req.route.path);
        console.log('result :::::: ', result);
        if(result[0]){
            console.log("req.body   ::::::::    ", req.body);
            console.log("/notice/create");
            res.send( { content : "생성 완료", link : "/notice" } );
        }
        res.send( { errMessage : "에러발생" } );
    });
});

router.put('/update', (req, res) => {
    noticeController.update(req, res)
    .then(result => {
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        console.log("notice/update : ", result);
        if(result[1] === 1){
            res.send( { content : "공지사항 변경이 완료되었습니다!", link : "/notice?notice_num=" + req.query.notice_num } );
        }else{
            res.send( { errMessage : "공지사항 변경도중 에러가 발생하였습니다!", link : "/notice?notice_num=" + req.query.notice_num } );
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

router.get('/count', (req, res) => {
    noticeController.count(req)
    .then(result => {
        console.log("/notice", req.route.path);
        res.send(req.body.allnotice + " / 확인용");
    });
});

module.exports = router;