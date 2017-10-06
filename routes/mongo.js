var express = require('express');
var router = express.Router();

var db  = require('../db');
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

router.post('/insert',function(req,res){
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


router.get('/findone',function(req,res){
   var name=req.query.name;    
    console.log(name);
    collection.findOne({"name":name}).then(function(result) {
  console.log(result);
        res.json(result);
});
});

router.get('/findall',function(req,res){
   var rating=parseInt(req.query.rating);    
    console.log(rating);

        
    collection.find({'rating': {$gte: rating}}).toArray(function(err,result) {
  console.log(result);
        res.json(result);
});
});

router.get('/delete',function(req,res){
   var name=req.query.name;    
    console.log(name);
    collection.deleteOne({name:name},function(err, result) {
  console.log(result);
        res.json(result);
});
});

router.post('/updateOne',function(req,res){
   var name=req.body.name; 
   var desc=req.body.desc;
    console.log(name);
    collection.updateOne({name:name},{$set:{description:desc}},function(err, result) {
  console.log(result);
        res.json(result);
});
});

router.post('/update',function(req,res){
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

module.exports = router;
