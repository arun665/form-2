var express = require('express');
var router = express.Router();
var empModel=require('../modules/employee');
var employee=empModel.find({});



router.post("/",function(req,res,next){

  var empDetails = new empModel({

    name:req.body.name,
    email:req.body.email,
    etype:req.body.etype,
    hourlyrate:req.body.hourlyrate,
    totalHour:req.body.totalHour


  });
empDetails.save(function(err,res1){

  if(err) throw err;

  employee.exec(function(err,data){
    if(err) throw err;
    
    res.render('index.ejs',{title:'Emplyee Records',records:data,success:'Record installed successfully'});
      
      });
 
});

});

/* GET home page. */
router.get('/', function(req, res, next) {

//set DEBUG=myapp:* & npm start


  employee.exec(function(err,data){
if(err) throw err;

res.render('index.ejs',{title:'Emplyee Records',records:data,success:''});
  
  });
  
});



router.get('/delete/:id', function(req, res, next) {

  //set DEBUG=myapp:* & npm start
  var  id=req.params.id;
  var del=empModel.findByIdAndDelete(id);
  
  
    del.exec(function(err){
  if(err) throw err;
  
  employee.exec(function(err,data){
    if(err) throw err;
    
    res.render('index.ejs',{title:'Emplyee Records',records:data,success:'Record deleted successfully'});
      
      });
    
    });
    
  });

  
router.get('/edit/:id', function(req, res, next) {

  //set DEBUG=myapp:* & npm start
  var  id=req.params.id;
  var del=empModel.findById(id);
  
  
  del.exec(function(err,data){
  if(err) throw err;
  

  res.render('edit.ejs',{title:"update the records",records:data})
    
    });
    
  });
  

   
router.post('/update/', function(req, res) {

  //set DEBUG=myapp:* & npm start
  
  var update=empModel.findByIdAndUpdate(req.body.id,{


    name:req.body.name,
    email:req.body.email,
    etype:req.body.etype,
    hourlyrate:req.body.hourlyrate,
    totalHour:req.body.totalHour


  });

  
    update.exec(function(err){
  if(err) throw err;
  
  
  
    employee.exec(function(err,data){
      if(err) throw err;
      
      res.render('index.ejs',{title:'Emplyee Records',records:data,success:'Record updated successfully'});
        
        });
   
  });
  

    
    });
    
  
module.exports = router;
