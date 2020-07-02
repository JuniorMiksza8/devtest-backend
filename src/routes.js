const routes = require('express').Router();
const userController = require('./controllers/user.controller');
const authController = require('./controllers/auth.controller');
const categoryController = require('./controllers/category.controller');
const brandController = require('./controllers/brand.controller');
const productController = require('./controllers/product.controller');


//rotas de autenticacao e registro de usuario
routes.post('/user',userController.store);

routes.get('/session',authController.login);

routes.delete('/session',authController.logout);

routes.get('/me',authController.validate,(req,res)=>{
    res.send(req.auth);
})

//rotas de categorias

routes.post('/category',authController.validate,categoryController.store);
routes.get('/category',authController.validate,categoryController.list);
routes.put('/category/:uuid',authController.validate,categoryController.update);
routes.delete('/category/:uuid',authController.validate,categoryController.delete);


//rotas de marcas

routes.post('/brand',authController.validate,brandController.store);
routes.get('/brand',authController.validate,brandController.list);
routes.put('/brand/:uuid',authController.validate,brandController.update);
routes.delete('/brand/:uuid',authController.validate,brandController.delete);

//rotas de produtos

routes.post('/product',authController.validate,productController.store);
routes.get('/product',authController.validate,productController.list);
routes.put('/product/:uuid',authController.validate,productController.update);
routes.delete('/product/:uuid',authController.validate,productController.delete);

module.exports = routes;