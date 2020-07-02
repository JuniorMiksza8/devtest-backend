require('dotenv').config();
const mongoose = require('mongoose');



try {
  

  if(process.env.NODE_ENV  == 'test '){
    var url = 'mongodb://127.0.0.1:27017/testdev?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: process.env.NODE_ENV === 'test ' ? false : true ,
    }); 
  }else{
    mongoose.connect(process.env.DB_MAIN, {
      useNewUrlParser: true,
      useUnifiedTopology: process.env.NODE_ENV === 'test ' ? false : true ,
    }); 
  }
  

  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useCreateIndex', true);

} catch (error) {
  console.error(error);
}

mongoose.connection.on('error', (error) => {
  console.error(error);
});

module.exports = mongoose;