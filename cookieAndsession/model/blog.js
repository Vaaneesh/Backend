const mongoose=require('mongoose');
const {Schema}=mongoose;
const blogSchema=new mongoose.Schema({
    title:String,
    imageURL:String,
    content:String,
    user:{
        type:  Schema.Types.ObjectId,
        ref:"User"
    }
})
module.exports=mongoose.model("blog",blogSchema);