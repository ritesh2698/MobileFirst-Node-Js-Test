const mongoose = require('mongoose')
const Schema = mongoose.Schema

const useSchema = new Schema({
    username : {
        type : String,
        require : true,       
    },
    password : {
        type : String,
        require : true,
        
    },
    qualification : {
        type : String,
        require: true,              
    },      
    city:{
        type : String,
        require : true
    },
    phone:{
        type : Number,
        require : true,
    },
   email: {
        type : String,
        require : true
    },
    token: { 
        type: String
     }

})
module.exports = mongoose.model('Users',useSchema)