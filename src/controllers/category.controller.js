const CategoryModel = require('../models/category.model');

module.exports = {

    async store(req, res) {
        const { name, description } = req.body;

        try {

            const obj = new CategoryModel({
                name: name,
                description: description
            });

            const save = await CategoryModel.create(obj);

            res.json(save);

        } catch (error) {
            console.log(error);
            res.status(400).send();
        }


    },

    async update(req, res) {

        const uuid = req.params.uuid;
        const { name, description } = req.body;

        try {

            const update = await CategoryModel.findByIdAndUpdate(uuid, {
                name,
                description
            }, { new: true });

            if(update){
                res.json(update);
            }else{
                res.status(400).send();
            }

        } catch (error) {

            console.log(error);
            res.status(400).send();
        }

    },

    async delete(req, res) {
        const uuid = req.params.uuid;
        try {

            const remove = await CategoryModel.findByIdAndRemove(uuid);
            res.send(200);

        } catch (error) {
            console.log(error);
            res.status(400).send({error});
        }

    },

    async list(req, res) {
        const { name = '', description = '' } = req.query;
        try {
            const obj = await CategoryModel.find({ 
                name: {'$regex' : `${name}`},
                description: {'$regex' : `${description.toLowerCase()}`}
            });
            if(obj.length < 1){
                res.status(404);
            }
            res.json(obj);
        } catch (error) {
            console.log(error);
            res.status(400).send();
        }
    },


}