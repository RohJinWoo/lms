var express = require('express');
var router = express.Router();
const noticeController = require('../controllers').notice;
const studentController = require('../controllers').student;
const professorController = require('../controllers').professor;
const userController = require('../controllers').user;

router.get('/main', userController.login_access, (req, res) => {
  console.log("req.session.prof_id :: ",req.session.prof_id);
  noticeController.notice(req, res)
  .then(result => {
    console.log(result);
    res.render('prof/main', { obj : { notice : result, name : req.session.prof_name } } );
  })
  .catch( err => {
    res.status(400).send(err);
  });
});
  
router.get('/notice', userController.login_access, (req, res) => {
  if(req.query.notice_num === undefined){
    res.render('prof/notice', { obj : { title : '공지사항', nowpage : 1 } } );
  }else{
    Promise.all([noticeController.findOne(req, res), noticeController.filefindOne(req, res)])
    .then(result => {
        console.log(req.query);
        if(result[0][0] !== undefined){
          var obj = { id : result[0][0].n_id, title : result[0][0].n_title, content : result[0][0].n_content, filepath : result[1], updatedAt : result[0][0].updatedAt, createdAt : result[0][0].createdAt };
          console.log("result :::: ",result[0]);
          if(req.query.m === 'write'){
              res.render("prof/notice_modify", { obj } );
          }else{
              res.render("prof/notice_board", { obj } );
          }
        }else{
            res.redirect('/prof/notice');
        }
    })
    .catch(err => {
        res.status(400).send(err);
    })
  }
});

router.get('/notice/edit', userController.login_access, (req, res) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.render('prof/notice_edit', { obj : { } } );
});

module.exports = router;