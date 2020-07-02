const app = require('../../src/app');
const request = require('supertest');
const UserModel = require('../../src/models/user.model');

describe('Category CRUD tests', () =>{

    let id;
    let token;
    

    it('Should delete test user',async ()=>{
        const remove = await UserModel.deleteOne({email : 'junior.miksza9@gmail.com'});
        console.info('Remove: ',remove);
     })
 
     it('Should create a new user',async ()=>{
 
         const user = {
             name : 'Junior Miksza',
             email : 'junior.miksza9@gmail.com',
             password : '123'
         };
 
         const response = await request(app).post('/user').send(user);
         expect(response.status).toBe(200);
     });
    

    //primeiro precisamos logar para ter acesso as rotas com o token 
    

    it('Should log-in',async ()=>{
        
        const response = await request(app)
            .get('/session')
            .auth('junior.miksza9@gmail.com','123');

        expect(response.status).toBe(200);
        token = response.body.token;
    });

    it('Should create new Category by request',async ()=>{
        const response = await request(app)
        .post('/category')
        .set('Authorization','Bearer ' + token)
        .send({
            name : 'categoria teste',
            description : 'Categoria de teste',
        });
        id = response.body._id;
        expect(response.status).toBe(200)
    });

    it('Should return a filtered category',async ()=>{
        const response = await request(app).get('/category?name=cate').set('Authorization','Bearer ' + token);

        expect(response.body[0].name).toBe('categoria teste');
    })

    it('Should update the test made category',async ()=>{
        const newData = {
            name : 'categoria teste',
            description : 'categoria atualizada!'
        };
        const response = await request(app).put(`/category/${id}`).set('Authorization','Bearer ' + token).send(newData);

        const check = await request(app).get(`/category?description=${newData.description}`).set('Authorization','Bearer ' + token);
        
        expect(check.body[0].description).toBe(newData.description);
    })

    it('Should delete the test made category',async ()=>{
        const response = await request(app).delete(`/category/${id}`).set('Authorization','Bearer ' + token);

        const check = await request(app).get('/category?name=categoria').set('Authorization','Bearer ' + token);

        expect(check.status).toBe(404);
        
    });


    it('Should delete test user',async ()=>{
        const remove = await UserModel.deleteOne({email : 'junior.miksza9@gmail.com'});
        console.info('Remove: ',remove);
     })
    
})