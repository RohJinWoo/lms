var express = require('express');
var router = express.Router();
const noticeController = require('../controllers').notice;
const studentController = require('../controllers').student;
const courceController = require('../controllers').cource;
const userController = require('../controllers').user;

router.get('/main', userController.login_access, (req, res) => {
  console.log("req.session.std_id :: ",req.session.std_id);
  noticeController.notice(req, res)
  .then(result => {
    console.log(result);
    res.render('std/main', { obj : { notice : result, name : req.session.std_name } } );
  })
  .catch( err => {
    res.status(400).send(err);
  });
});

router.get('/notice', userController.login_access, (req, res) => {
  if(req.query.notice_num === undefined){
    res.render('std/notice', { obj : { title : '공지사항', nowpage : 1 } } );
  }else{
    Promise.all([noticeController.findOne(req, res), noticeController.filefindOne(req, res)])
    .then(result => {
        console.log(req.query);
        if(result[0][0] !== undefined){
          var obj = { id : result[0][0].n_id, title : result[0][0].n_title, content : result[0][0].n_content, filepath : result[1], updatedAt : result[0][0].updatedAt, createdAt : result[0][0].createdAt };
          console.log("result :::: ",result[0]);
            res.render("std/notice_board", { obj } );
        }else{
            res.redirect('/std/notice');
        }
    })
    .catch(err => {
        res.status(400).send(err);
    })
  }
});

module.exports = router;
