const app = require('../../src/app');
const request = require('supertest');
const UserModel = require('../../src/models/user.model');

describe('Create and login user',()=>{

    it('Should delete test user',async ()=>{
       const remove = await UserModel.deleteOne({email : 'junior.miksza8@gmail.com'});
       console.info('Remove: ',remove);
    })

    it('Should create a new user',async ()=>{

        const user = {
            name : 'Junior Miksza',
            email : 'junior.miksza8@gmail.com',
            password : '123'
        };

        const response = await request(app).post('/user').send(user);
        expect(response.status).toBe(200);
    });

    it('Should not create a new user (same email)',async ()=>{

        const data = {
            name : 'Junior Miksza',
            email : 'junior.miksza8@gmail.com',
            password : '123'
        }

        const response = await request(app).post('/user').send(data);
        

        expect(response.status).toBe(400);
    });


    it('Should log-in',async ()=>{
        
        const response = await request(app)
            .get('/session')
            .auth('junior.miksza8@gmail.com','123');

        expect(response.status).toBe(200);
        
    });

    it('Should validate JWT Token',async ()=>{

        const login = await request(app)
            .get('/session')
            .auth('junior.miksza8@gmail.com','123');

        const token = login.body.token;
        const response = await request(app)
            .get('/me')
            .set('Authorization','Bearer ' + token);

        expect(response.status).toBe(200);

    });

    it('Should delete test user',async ()=>{
        const remove = await UserModel.deleteOne({email : 'junior.miksza8@gmail.com'});
        console.info('Remove: ',remove);
     })
   

});