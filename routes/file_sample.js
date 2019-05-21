var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({
    // 저장 경로(해당 경로에 디렉토리가 존재해야지만 가능)
    destination: (req, file, cb) => {
        cb(null, 'uploads/' + (req.query.dir !== undefined ? req.query.dir : null));
    },
    // 파일 이름
    filename: (req, file, cb) => {
        // console.log("filename : ", req);
        cb(null, Date.now() + "-" + file.originalname);
    }
});
var fileFilter = function(req, file, cb){
    cb(null, true);
}
var fileupload = multer( {
    storage: storage,
    limits : {
        fileSize : 5 * 1024 * 1024
        // 파일 크기를 5MB 이하만 허용
    },
    fileFilter : fileFilter
} );

var videoupload = multer( {
    storage: storage,
    limits : {
        fileSize : 1024 * 1024 * 1024
        // 파일 크기를 1GB 이하만 허용
    },
    fileFilter : fileFilter
} );

var filepath = __dirname + "/../uploads";

router.get('/upload', (req, res) => {
    res.render('file/upload');
});

router.post('/upload', (req, res) => {
    var upload = ((req.query.dir).split('/')[1] === "files") ? fileupload : videoupload;
    upload.single('userfile')(req, res, (err) =>{
        if(err){
            console.log("post upload err발생", err);
            console.log(err.message);
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
    fs.readdir(filepath + (req.query.dir !== undefined ? req.query.dir : ''), (err, dirlist) => {
        if(err){
            console.log("에러 발생");
            console.log(err);
            // 디렉토리가 아닐시 errno -4052가 발생함. 해당 링크를 응답하여 url전환을 요구.
            if(err.errno === -4052){
                res.send( { link :  req.baseUrl + "/download?download=" + req.query.dir } );
            }
        }else{
            res.send( { list : dirlist } );
        }
    });
});

router.get('/stream', (req, res) => {
    console.log(filepath+'/KakaoTalk_Video_20181107_2252_15_598.mp4');
    res.writeHead(200, { 'Content-Type' : 'video/mp4' } );
    var stream = fs.createReadStream(filepath+'/KakaoTalk_Video_20181107_2252_15_598.mp4');
    stream.pipe(res);
});

router.get('/video', (req, res) => {
    res.render('file/video');
});

module.exports = router;