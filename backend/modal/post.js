const mongoose = require('mongoose');


const imgSchema = new mongoose.Schema({
    public_id:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
})

const postSchema = new mongoose.Schema({
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'User'
    },
    dec:{
        type:String,
        max:500
    },
    img:{
        type:imgSchema,
        required:false
    },
    likes:{
        type:Array,
        default:[]
    }
    },   {timestamps:true});
  
  // Create the user model from the schema
  const Post = mongoose.model('Post', postSchema);
  
  module.exports = Post;