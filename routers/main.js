/**
 * Created by jian on 2017/6/22.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/User.js');

router.get('/',function(req,res,next){
   res.render('main/index',{

   })
});
router.get('/designer',function(req,res,next){
   User.find().then(function(data){
      res.render('main/designer',{
         userinfo:data
      })
   });
});
router.get('/topbar',function(req,res,next){
   res.render('main/topbar',{
      userinfo:req.userinfo
   })
});

module.exports = router;