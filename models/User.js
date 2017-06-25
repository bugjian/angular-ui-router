/**
 * Created by jian on 2017/5/31.
 */
var mongoose=require("mongoose");
var usersSchema=require("../schemas/users.js");
module.exports = mongoose.model("User",usersSchema);