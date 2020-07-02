const UserModel = require('../models/user.model');
const jwt = require('../config/jwt');

module.exports = {

    async store(req,res){

        const data = req.body;

        try{

            const userModel = new UserModel(data);

            const save = await userModel.save();
            const {password,...user} = save.toObject();

            const token = jwt.sign({user : user.id});
            
            res.json({user,token}); 
            

        }catch(error){
            res.status(400).send({error : error.message});
        }
              
    }

}