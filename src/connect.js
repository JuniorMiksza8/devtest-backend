const mongoose = require('mongoose');
var url;

if(process.env.NODE_ENV  == 'test ' || 'test'){
  url = process.env.DB_TEST;
}else{
  url = process.env.DB_MAIN;
}



try {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: process.env.NODE_ENV === 'test ' ? false : true ,
  }); 

  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useCreateIndex', true);

} catch (error) {
  console.error(error);
}

mongoose.connection.on('error', (error) => {
  console.error(error);
});

mongoose.Promise = global.Promise;

module.exports = mongoose;