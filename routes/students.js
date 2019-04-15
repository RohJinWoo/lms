var express = require('express');
var router = express.Router();
const noticeController = require('../controllers').notice;
const studentController = require('../controllers').student;
const courceController = require('../controllers').cource;

router.get('/main', (req, res) => {
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

router.get('/sign-up-class', (req, res) => {
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

router.get('/check-class', (req, res) => {
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

router.get('/exam', (req, res) => {
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

router.get('/check-grade', (req, res) => {
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

router.get('/rating-class', (req, res) => {
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

router.get('/nav.ejs', (req,res)=>{
  res.render('std/nav');
})
module.exports = router;
