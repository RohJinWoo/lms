var express = require('express');
var router = express.Router();
const noticeController = require('../controllers').notice;
const studentController = require('../controllers').student;

// 로그인 이후 기본 메인 페이지
router.get('/main', (req, res) => {
  noticeController.notice(req, res)
  .then(result => {
    res.send(result);
  })
  .catch( err => {
    res.status(400).send(err);
  });
});

// 공지사항 (+추가설명 - 파라미터 notice_num : number / m : string(값 'write')에 따라 달라짐)
router.get('/notice', (req, res) => {
  if(req.query.notice_num === undefined){
    res.send( { obj : { title : '공지사항', nowpage : 1 } } );
  }else{
    Promise.all([noticeController.findOne(req, res), noticeController.filefindOne(req, res)])
    .then(result => {
        if(result[0][0] !== undefined){
          var obj = { id : result[0][0].n_id, title : result[0][0].n_title, content : result[0][0].n_content, filepath : result[1], updatedAt : result[0][0].updatedAt };
          console.log("result :::: ",result[0]);
          if(req.query.m === 'write'){
              res.send( obj );
          }else{
              res.send( obj );
          }
        }else{
            res.send( result );
        }
    })
    .catch(err => {
        res.status(400).send(err);
    })
  }
});

// 공지사항 페이지네이션
router.get('/pagination', (req, res) => {
  if(req.query.nowpage !== undefined){
    req.body = { nowpage : req.query.nowpage };
    Promise.all([noticeController.count(req), noticeController.nowpage(req, res)])
    .then(value => {
        res.send( { pageNum : Math.ceil(value[0][0].count/10), notice : value[1], nowpage : req.body.nowpage === undefined ? 1 : req.body.nowpage } );
    });
  }else{
    res.send( "파라미터 변수 nowpage : number 보내주세요." );
  }
});

// 공지사항 페이지네이션 조건검색
router.get('/pagination_search_condition', (req, res) => {
  if(req.query.search_cnt && (req.query.search_title || req.query.search_content) && req.query.nowpage){
    req.body = {
      search_cnt : req.query.search_cnt,
      search_title : req.query.search_title !== undefined ? req.query.search_title : undefined,
      search_content : req.query.search_content !== undefined ? req.query.search_content : undefined,
      nowpage : req.query.nowpage };

    Promise.all( [ noticeController.search_condtion_count(req, res), noticeController.search_condtion(req, res) ] )
    .then(value => {
        // value[0]/10 페이지개수
        console.log("/notice/pagination_search_condition", req.route.path);
        console.log("value :::::: ", value);
        console.log('value[0] ::: ', Math.ceil(value[0][0].count/10));
        console.log('value[1] ::: ', value[1]);
        res.send( { pageNum : Math.ceil(value[0][0].count/10), notice : value[1], nowpage : req.body.nowpage === undefined ? 1 : req.body.nowpage } );
    });
  }else{
    res.send( "파라미터 변수 search_cnt : number / nowpage : number / search_title 또는 search_content : string 보내주세요." );
  }
});

  module.exports = router;