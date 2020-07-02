const UserModel = require('../models/user.model');
const crypto = require('crypto');
const jwt = require('../config/jwt');
const logger = require('../services/log.service');

module.exports = {
    
    async login(req,res,next){

        //recebe hash com email e senha
        const [hashType,hash] = req.headers.authorization.split(' ');
        //transforma base64 em string e tira os 2 pontos para separar email de senha
        const [email,password] = Buffer.from(hash,'base64').toString().split(':');

        //criptografa a senha para comparar com a senha ja criptografada no banco
        crypto.createHash('md5').update(password).digest('hex');
        
        const user = UserModel.findOne({email,password}, (error,user) => {
            // caso ocorra erro 
            error ? res.status(500).send() : '';
            
            if(user){
                const token = jwt.sign({user : user._id});              
                res.json({user,token});
            }else{
                res.status(404).send({error : 'User not found'});
            }

        }) 

    },

    async logout(req,res){
        
        res.status(200).send();
    },

    async validate(req,res,next){ 

        //recebe o token e separa o bearer
        if(!req.headers.authorization){
            res.sendStatus(401);
        }else{

            const [,token] = req.headers.authorization.split(' ');

        try{

            //valida o token e procura usuario com o id recebido no token
            const payload = await jwt.decode(token);
            const user = await UserModel.findById(payload.user);
            
            if(!user){
                res.status(404).send();
            }

            req.auth = user;
            next();

        }catch(error){
            res.status(401);
            res.send(error);
        }

        }
        
    },


}