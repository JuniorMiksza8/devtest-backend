const BrandModel = require('../models/brand.model');

module.exports = {

    async store(req, res) {
        const { name  } = req.body;

        try {

            const obj = new BrandModel({
                name: name
            });

            const save = await BrandModel.create(obj);

            res.json(save);

        } catch (error) {
            console.log(error);
            res.status(400).send({error});
        }


    },

    async update(req, res) {

        const uuid = req.params.uuid;
        const { name } = req.body;

        try {

            const update = await BrandModel.findByIdAndUpdate(uuid, {
                name
            }, { new: true });

            if(update){
                res.json(update);
            }else{
                res.status(400).send();
            }

        } catch (error) {

            console.log(error);
            res.status(400).send({error});
        }

    },

    async delete(req, res) {
        const uuid = req.params.uuid;
        try {

            const remove = await BrandModel.findByIdAndRemove(uuid);
            res.send(200);

        } catch (error) {
            console.log(error);
            res.status(400).send({error});
        }

    },

    async list(req, res) {
        const { name = ''} = req.query;
        try {
            const obj = await BrandModel.find({ 
                name: {'$regex' : `${name}`}
            });
            if(obj.length < 1){
                res.status(404);
            }
            res.json(obj);
        } catch (error) {
            console.log(error);
            res.status(400).send({error});
        }
    },


}