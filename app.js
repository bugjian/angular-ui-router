/**
 * Created by jian on 2017/6/22.
 */
var express = require('express');
var app = express();

app.use('/public',express.static( __dirname+ "/public"));
app.use('/views',express.static( __dirname+ "/views"));

var swig = require("swig");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var Cookies = require("cookies");

app.engine("html",swig.renderFile);
app.set("views","./views");
app.set("view engine","html");
swig.setDefaults({cache:false});
app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req,res,next){
    req.cookies=new Cookies(req,res);
    //建立一个大家都能访问的到的对象
    //解析登录用户的cookies信息
    req.userinfo={};
    if(req.cookies.get("userinfo")){
        try{
            req.userinfo=JSON.parse(req.cookies.get("userinfo"));
            User.findById(req.userinfo._id).then(function(userinfo){
                req.userinfo.isAdmin = Boolean(userinfo.isAdmin);
                next();
            });
        }catch(e){
            next();
        }
    }else{
        next();
    }
});
//模块化路由句柄
app.use("/admin",require("./routers/admin"));
app.use("/api",require("./routers/api"));
app.use("/",require("./routers/main"));

mongoose.connect("mongodb://localhost:27017/mobil",function(err){
    if(err){
        console.log("数据库连接失败");
    }else{
        console.log("数据库连接成功");
        app.listen(8081);
    }
});