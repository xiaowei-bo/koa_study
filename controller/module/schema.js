const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});
const UserInit = mongoose.model('User', UserSchema);

module.exports = {
    UserInit
};
