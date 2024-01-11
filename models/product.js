const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:[true,"price must be provided"]
    },
    price_id:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    company:{
        type:String,
    }
});

module.exports=mongoose.model("Product",productSchema);