const mongoose = require('mongoose');
const connection = require('../connect');
const uuid = require('uuid');
const crypto = require('crypto');
const uniqueValidator = require('mongoose-unique-validator');

const BrandSchema = new mongoose.Schema({

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

},{
    timestamps : {}
});

BrandSchema.plugin(uniqueValidator);

module.exports = connection.model('Brand',BrandSchema);