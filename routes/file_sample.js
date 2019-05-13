var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({
    // 저장 경로(해당 경로에 디렉토리가 존재해야지만 가능)
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    // 파일 이름
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
var fileFilter = function(req, file, cb){
    cb(null, true);
}
var upload = multer( {
    storage: storage,
    limits : {
        fileSize : 5 * 1024 * 1024
        // 파일 크기를 5MB 이하만 허용
    },
    fileFilter : fileFilter
} );

var filepath = __dirname + "/../uploads";

router.get('/upload', (req, res) => {
    res.render('file/upload');
});

router.post('/upload', (req, res) => {
    upload.single('userfile')(req, res, (err) =>{
        if(err){
            console.log("post upload err발생", err);
            console.log(err.message)
            res.send("에러" + err);
        }else{
            res.redirect('./list');
        }
    });
});

router.get('/download', (req, res) => {
    if(req.query.download !== undefined){
        console.log(filepath + '/' + req.query.download);
        res.download(filepath + '/' + req.query.download);
        // next();
    }else{
        res.send("에러");
    }
});

router.get('/list', (req, res) => {
    fs.readdir(filepath, (err, filelist) => {
        // console.log(filelist);
        if(err){
            console.log('/list err 발생 : ', err);
            res.send("에러");
        }else{
            console.log("get list 성공 실행");
            console.log(filelist);
            res.render('file/list', { obj : { list : filelist } } );
        }
    });
});

router.post('/list', (req, res) => {
    fs.readdir(filepath, (err, filelist) => {
        // console.log(filelist);
        if(err){
            console.log('/list err 발생 : ', err);
        }else{
            console.log("post list 성공 실행");
            res.send( { list : filelist } );
        }
    });
});

module.exports = router;