const mongoose=reuire("mongoose");

const postSchema=new mongoose.Schema({
    postName:String,
    imageURL:String,
    caption:String
})

module.exports=mongoose.model("Post",postSchema);
