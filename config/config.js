const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mobileFirst',{
    
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("Connection is succesfull")
})
.catch((err)=>{
    console.log(err || "Connection failed")
})