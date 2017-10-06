var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var mongoose = require('mongoose');
//var models = require('./model');

var index = require('./routes/index');
var users = require('./routes/users');

//var Movie = mongoose.model('Movie');

var app = express();

var db  = require('./db');
var collection;

// Connect to Mongo on start
db.connect('mongodb://teamhasnoname:popo1234@ds161008.mlab.com:61008/csci5117test1', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  }
    else{
        console.log("Connected");
        collection = db.get().collection('movies');
        
    }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


app.post('/mongo/insert',function(req,res){
   var name=req.body.name,
       desc=req.body.desc,
       rating= parseInt(req.body.rating),
       stars=req.body.stars,
       date=req.body.date;
    
    var starray = stars.split(",");
    for(var i = 0; i< starray.length; i++)
        starray[i]= starray[i].trim();
    
    collection.insert({"name":name,"description":desc,"rating":rating,"actors":starray,"release":date}).then(function(result) {
  console.log(result);
        res.json(result);
});
});


app.get('/mongo/findone',function(req,res){
   var name=req.query.name;    
    console.log(name);
    collection.findOne({"name":name}).then(function(result) {
  console.log(result);
        res.json(result);
});
});

app.get('/mongo/findall',function(req,res){
   var rating=parseInt(req.query.rating);    
    console.log(rating);

        
    collection.find({'rating': {$gte: rating}}).toArray(function(err,result) {
  console.log(result);
        res.json(result);
});
});

app.get('/mongo/delete',function(req,res){
   var name=req.query.name;    
    console.log(name);
    collection.deleteOne({name:name},function(err, result) {
  console.log(result);
        res.json(result);
});
});

app.post('/mongo/updateOne',function(req,res){
   var name=req.body.name; 
   var desc=req.body.desc;
    console.log(name);
    collection.updateOne({name:name},{$set:{description:desc}},function(err, result) {
  console.log(result);
        res.json(result);
});
});

app.post('/mongo/update',function(req,res){
   var star=req.body.star; 
   var rating=parseInt(req.body.rating);
    console.log(star);
    console.log(rating);
    collection.updateMany({actors: star},{$set:{rating:rating}},function(err, result) {
        if(err){res.send(err);}
  console.log(result);
        res.json(result);
});
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
