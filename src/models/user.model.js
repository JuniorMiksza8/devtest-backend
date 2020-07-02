const mongoose = require('mongoose');
const connection = require('../connect');
const uuid = require('uuid');
const crypto = require('crypto');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    _id : {
        type: String,
        default: function genUUID() {
            return uuid.v1()
        }
    },
    name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        lowercase : true,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true,
        select : false,
        set : value => crypto.createHash('md5').update(value).digest('hex')
    }

},{
    timestamps : {}
});

UserSchema.plugin(uniqueValidator);

module.exports = connection.model('User',UserSchema);