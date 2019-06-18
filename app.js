var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

const helmet = require('helmet');

var indexRouter = require('./routes/index'),
    studentsRouter = require('./routes/students'),
    professorsRouter = require('./routes/professors'),
    apiRouter = require('./routes/api'),
    emailRouter = require('./routes/email'),
    userRouter = require('./routes/user'),
    noticeRouter = require('./routes/notice'),
    file_sampleRouter = require('./routes/file_sample');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  key: 'sid',
  secret: 'sync',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'axios', 'dist')));
app.use('/resume', express.static(path.join(__dirname, 'node_modules', 'startbootstrap-resume')));

app.use('/', indexRouter);
app.use('/std', studentsRouter);
app.use('/prof', professorsRouter);
app.use('/api', apiRouter);
app.use('/email', emailRouter);
app.use('/user', userRouter);
app.use('/notice', noticeRouter);
app.use('/file_sample', file_sampleRouter);

app.use('/file_sample', express.static('uploads/'));
app.use(helmet());
app.disable('x-powered-by');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if(req.path.split('/')[2] === 'images'){
    res.redirect('/file_sample/images/no_image.jpg');
  }else{
    res.render('error');
  }
});

//Models
var models = require('./models');
//Sync Database
models.sequelize.sync().then(function(){
  console.log('Databas Sync.');
}).catch(function(err){
  console.log(err, 'Something went wrong with the Database update');
});

module.exports = app;
