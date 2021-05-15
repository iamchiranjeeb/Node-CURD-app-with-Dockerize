const mongoose = require('mongoose');

const link = 'mongodb://mongo:27017/demo'

mongoose.connect(link,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
},()=>{
    console.log("Connected to Data Base.")
})