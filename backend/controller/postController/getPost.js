const Post = require("../../modal/post");
const ResponseJson = require("../../utils/handleResponse");

// http.createServer((req ,res)=>{
async function getPost(req, res ,path) {

  const regex = /^\/post\/(\w+)$/;
  const Id = regex.exec(path)[1];

  const filter = { _id: Id }; // Replace with the appropriate filter

  try {
    const result = await Post.findOne(filter);
    
    if (result) {
      ResponseJson(res,200,result)
    }  else {
      ResponseJson(res ,404 ,{message:"post not Found" })
    }
  } catch (e) {
    ResponseJson(res,500,{message:e.message})
  }
}

module.exports = getPost;