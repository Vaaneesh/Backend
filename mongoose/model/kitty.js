const mongoose=require('mongoose');
//document add krte hai uska structure hota hai Schema
const kittySchema = new mongoose.Schema({
    name: String
});
  
module.exports= mongoose.model('Kitten', kittySchema);