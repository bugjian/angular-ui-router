/**
 * Created by jian on 2017/6/22.
 */
var express = require('express');
var router = express.Router();
module.exports = router;
var User = require("../models/User.js");
router.post("/register",function(req,res){
    var username = req.body.name;
    var password = req.body.password;
    var repassword = req.body.repassword;
    var reply = {
        code:0,
        message:"注册成功"
    };
    if(username == ""||password == ""){
        reply.code = 1;
        reply.message = "用户名与账号不能为空";
        res.json(reply);
        return;
    }
    if(password != repassword ){
        reply.code = 2;
        reply.message = "俩次输入密码不同";
        res.json(reply);
        return;
    }
    User.findOne({
        username:username
    }).then(function(result){
        if(result != null){
            reply.code = 4;
            reply.message = "该用户名已存在";
            res.json(reply);
            return;
        }else{
            var user = new User({
                username:username,
                password:password
            });
            return user.save();
        }
    }).then(function(result){
        req.cookies.set("userinfo",JSON.stringify({
            _id:result.id,
            username:result.username
        }));
        res.json(reply);
    })
});
router.post("/login",function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var reply = {
        code:0,
        message:"登录成功"
    };
    if(username == ""||password == ""){
        reply.code = 1;
        reply.message = "用户名与账号不能为空";
        res.json(reply);
        return;
    }
    User.findOne({
        username:username,
        password:password
    }).then(function(result){
        if(result == null){
            reply.code = 1;
            reply.message = "用户名或密码错误";
            res.json(reply);
            return ;
        }else{
            req.cookies.set("userinfo",JSON.stringify({
                _id:result.id,
                username:result.username
            }));
            //一定要有返回才能执行
            res.json(reply);
        }
    })
});
router.post("/back",function(req,res){
    req.cookies.set("userinfo",null);
    res.json({});
});
