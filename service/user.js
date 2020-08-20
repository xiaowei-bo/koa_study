const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/firstBlood';
const { UserInit } = require('../controller/module/schema.js');
const { sucResHandler, failResHandler} = require('../controller/module/common.js');

function region(userInfo) {
    if(!userInfo || !userInfo.username || !userInfo.password || !userInfo.email) {
        return failResHandler('参数错误');
    }
    mongoose.connect(DB_URL, { useNewUrlParser: true }, (err, res)=> {
        if(!err){
            console.log(res)
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
