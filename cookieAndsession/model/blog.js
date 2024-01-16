const mongoose=require('mongoose');
const {Schema}=mongoose;
const blogSchema=new mongoose.Schema({
    title:String,
    content:String,
    user:{
        type:  Schema.Types.ObjectId,
        ref:"User"
    },
    isApproved:{type:Boolean,default:false},
    userEmail:String,
    imageUrl:String
})
module.exports=mongoose.model("blog",blogSchema);