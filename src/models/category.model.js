const mongoose = require('mongoose');
const connection = require('../connect');
const uuid = require('uuid');
const crypto = require('crypto');
const uniqueValidator = require('mongoose-unique-validator');
const CategorySchema = new mongoose.Schema({

    _id : {
        type: String,
        default: function genUUID() {
        return uuid.v1()
    }
    },
    name : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },

    description : {
        type : String,
        required : true,      
        lowercase : true, 
    },

},{
    timestamps : {}
});

CategorySchema.plugin(uniqueValidator);
module.exports = connection.model('Category',CategorySchema);