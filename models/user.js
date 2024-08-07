const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
       name: {
        type: String,
        require: true
       },
       email:{
        type: String,
        require: true
       },
       contact:{
        type: Number,
        require: false
       },
       password:{
        type: String,
        require: true
       },
       country:{
        type: String,
        require: false
       }
})

module.exports = mongoose.model('User', UserSchema);
