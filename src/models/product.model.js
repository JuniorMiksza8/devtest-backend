const mongoose = require('mongoose');
const schema = mongoose.Schema;
const connection = require('../connect');
const uuid = require('uuid');
const crypto = require('crypto');
const uniqueValidator = require('mongoose-unique-validator');

const ProductSchema = new mongoose.Schema({

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
        lowercase : true
    },
    price : {
        type : Number,
        required : true
    },
    stock : {
        type : Number,
        required : true
    },
    category : {
        type : schema.Types.String,
        required : true,
        ref : 'Category'    
    },
    brand : {
        type : schema.Types.String,
        required : true,
        ref : 'Brand'
    },

},{
    timestamps : {}
});

ProductSchema.plugin(uniqueValidator);

module.exports = connection.model('Product',ProductSchema);