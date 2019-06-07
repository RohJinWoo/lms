var express = require('express');
var router = express.Router();
const noticeController = require('../controllers').notice;
const studentController = require('../controllers').student;
const courceController = require('../controllers').cource;
const userController = require('../controllers').user;

router.get('/main', userController.login_access, (req, res) => {
  console.log("req.session.std_id :: ",req.session.std_id);
  Promise.all([noticeController.notice(req, res) , studentController.std_progress(req, res)])
  .then( value => {
    // 받아온 value 값을 처리
    console.log('value : ', value);
    console.log('value[0] : ', value[0]);
    console.log('value[1] : ', value[1]);
    res.render('std/main', { obj : { title : '가장 기본이 되는것', notice : value[0], sub_prog : value[1] } } );
  })
  .catch( err => {
    res.status(400).send(err);
  });
})

// 수강 신청
router.get('/sign-up-class', userController.login_access, (req, res) => {
    Promise.all([courceController.find(req, res)])
    .then( value => {
        console.log('value : ', value);
        console.log('value[0] : ', value[0]);
        res.render('std/sign_up_class', { obj : { title : '수강 신청' , cource : value[0] } } );
    })
    .catch( err => {
        res.status(400).send(err);
    });
});

// 수강 조회
router.get('/check-class', userController.login_access, (req, res) => {
  Promise.all([courceController.find(req, res)])
  .then( value => {
    console.log('value : ', value);
    console.log('value[0] : ', value[0]);
    res.render('std/check_class', { obj : { title : '수강 조회' , cource : value[0] } } );
  })
  .catch( err => {
      res.status(400).send(err);
  });
});

// 시험 보기
router.get('/exam', userController.login_access, (req, res) => {
  Promise.all([courceController.exam_find(req, res)])
  .then( value => {
    console.log('value : ', value);
    console.log('value[0] : ', value[0]);
    res.render('std/exam', { obj : { title : '시험 보기', exam : value[0] } } );
  })
  .catch( err => {
    res.status(400).send(err);
  });
});

// 성적 조회
router.get('/check-grade', userController.login_access, (req, res) => {
  Promise.all([studentController.std_year(req, res)])
  .then( value => {
    console.log('value : ', value);
    console.log('value[0] : ', value[0]);
    res.render('std/check_grade', { obj : { title : '성적 조회', year : value[0] } } );
  })
  .catch( err => {
    res.status(400).send(err);
  });
});

// 강의 평가
router.get('/rating-class', userController.login_access, (req, res) => {
  Promise.all([courceController.rating_class_find(req, res)])
  .then( value => {
    console.log('value : ', value);
    console.log('value[0] : ', value[0]);
    res.render('std/rating_class', { obj : { title : '강의 평가' , cource : value[0] } } );
  })
  .catch( err => {
    res.status(400).send(err);
  });
});

router.get('/notice', (req, res) => {
  if(req.query.notice_num === undefined){
    res.render('std/notice', { obj : { title : '공지사항', nowpage : 1 } } );
  }else{
    console.log("ㄹㅇㄴ라ㅓㅇㄴ러ㅣㅏ");
    Promise.all([noticeController.findOne(req, res), noticeController.filefindOne(req, res)])
    .then(result => {
        console.log(req.query);
        if(result[0][0] !== undefined){
          var obj = { id : result[0][0].n_id, title : result[0][0].n_title, content : result[0][0].n_content, filepath : result[1], updatedAt : result[0][0].updatedAt };
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
