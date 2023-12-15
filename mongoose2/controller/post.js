const Post=require("../model/post");

module.exports.getAllPost=async(req,res)=>{
    try{

        let allPost=await Post.find({});
        res.send(allPost);
    }
    catch(error){
        res.send(error);
    }
}
module.exports.postAddPost=async(req,res)=>{
    const {postName,imageURL,caption}=req.body;
    let newPost=new Post({postName:postName,imageURL:imageURL,caption:caption});
    await newPost.save();
    res.send("Post Added");
}
module.exports.getOnePost=(req,res)=>{
    const {id}=req.params;
    let post=Post.find({_id:id});
    res.json(post[0]); //array ki form ko avoid krne ke liye [0]

}
module.exports.deleteOnePost=(req,res)=>{

}
module.exports.getAllPost=(req,res)=>{

}
module.exports.putUpdatePost=(req,res)=>{

}