const mongoose = require('mongoose');
const { DB_URL } = require('../config/index.js');
const { UserInit } = require('../models/user.js');
const { sucResHandler, failResHandler} = require('../controller/module/common.js');

function region(userInfo) {
    if(!userInfo || !userInfo.username || !userInfo.password || !userInfo.email) {
        return failResHandler('参数错误');
    }
    mongoose.connect(DB_URL, { useNewUrlParser: true }, (err, res)=> {
        if(err){
            console.log(err);
        }
    });

    const curUser = new UserInit(userInfo);
    curUser.save(function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });

    return sucResHandler();
}
module.exports = {
    region
};
