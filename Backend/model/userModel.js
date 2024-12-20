const mongoose=require('mongoose')

const userModel=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    is_blocked:{
        type:Boolean,
        default:false
    }
},{versionKey:false,timestamps:true})

module.exports=mongoose.model('User',userModel)