const { isObjectIdOrHexString } = require("mongoose");

const mongoose = require("mongoose")
module.exports = mongoose=>{
    const auth = mongoose.Schema({
        name: {
            type:String,
            required:true
        },
        email: {
            type:String,
            required:true
        },
        password: {
            type:String,
            required:true
        },
        token:{
            type:String,
        },
        status: {
            type: String,
            default: 'active',
        },
    createdAt: {
            type: Date,
            default: Date.now(),
        },
       
    },
 
    
    
    );
    

    const User = mongoose.model("User",auth);
   
    return {User}
    
}