const ProductModel = require('../models/product.model');

module.exports = {

    async store(req, res) {
        const { name,description,price,stock,category,brand  } = req.body;

        try {

            const obj = new ProductModel({
                name,description,price,stock,category,brand
            });

            const save = await ProductModel.create(obj);

            res.json(save);

        } catch (error) {
            console.log(error);
            res.status(400).send({error});
        }


    },

    async update(req, res) {

        const uuid = req.params.uuid;
        const { name,description,price,stock,category,brand  } = req.body;

        try {

            const update = await ProductModel.findByIdAndUpdate(uuid, {
                name,description,price,stock,category,brand
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

            const remove = await ProductModel.findByIdAndRemove(uuid);
            res.send(200);

        } catch (error) {
            console.log(error);
            res.status(400).send({error});
        }

    },

    async list(req, res) {

        const { name = '',description = '',category = '',brand = ''} = req.query;

        try {

            const obj = await ProductModel.find({ 
                name: {'$regex' : `${name}`},
                description: {'$regex' : `${description}`},
                brand: {'$regex' : `${brand}`},
                category: {'$regex' : `${category}`},
            })
            .populate({
                path : 'category brand',
                select : '-createdAt -updatedAt -__v'
            })
            
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