const mongoose = require('mongoose');

const {MONGO_URI} = process.env;

mongoose.Promise = global.Promise;

exports.connect = () =>{}

mongoose.connect(MONGO_URI,{
    useNewUrlParser:true
})
.then(()=>{
    console.log('Database connected succes!');
})
.catch((error)=>{
    console.log('Database connection fail, exiting now!');
    console.log(error);
    process.exit(1);
})

