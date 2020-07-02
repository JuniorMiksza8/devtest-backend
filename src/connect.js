const mongoose = require('mongoose');
var url;

if(process.env.NODE_ENV  == 'test ' || 'test'){
  url = 'mongodb://127.0.0.1:27017/testdev?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';
}else{
  url = 'mongodb+srv://admin:j981174941@cluster0.czon8.mongodb.net/testdev?retryWrites=true&w=majority';
}

console.log(url);

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