const jwt = require('jsonwebtoken');
const secret = 'JjqwjrqwjrQKWRJQRQJsajqrw';

module.exports = {
    sign(payload){
        return jwt.sign(payload,secret,{expiresIn : 86400});
    },
    decode(token){
        return jwt.verify(token,secret);   
    }
}