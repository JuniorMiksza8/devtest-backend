require('dotenv').config({
    path : './src/.env'
})
const logger = require('./services/log.service');
const routes = require('./routes');
const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use((req,res,next)=>{
    let oldsend = res.send;
    res.send = function(data){
        if(data.error){
            logger.error(`ON ${req.method}${req.path} - MESSAGE : ${data.error}`)
        }else{
            logger.info(`REQUEST ${req.method} ON ${req.path} DONE SUCESSFULY`)
        }
        
        oldsend.apply(res,arguments);
    }
    next();
})

app.use(routes);



module.exports = app;