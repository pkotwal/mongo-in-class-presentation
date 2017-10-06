var express = require('express');
var router = express.Router();

var mongoose = require('mongoose'):
var Movies = require("./Models/Movies");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Recipic!' });
});

router.get('/mongo/findone',function(req,res){
   var name=req.query.name;    
   console.log(name);
   
   var Movie = mongoose.model('Movie', Movies);
	
   Movie.findOne({"name": name}, function(result) {
  	console.log(result);
    res.json(result);
});
});

router.post('/mongo/updateOne',function(req,res){
   var name=req.body.name; 
   var desc=req.body.desc;
   console.log(name);
   var Movie = mongoose.model('Movie', Movies);
   Movie.findOneandUpdate({name:name},{$set:{description:desc}},function(err, result) {
   console.log(result);
   res.json(result);
});
});

module.exports = router;
