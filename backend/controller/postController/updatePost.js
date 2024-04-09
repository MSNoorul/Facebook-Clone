const Post = require('../../modal/post');
const ResponseJson = require("../../utils/handleResponse");

async function updatePost(req, res, path) {

  const regex = /^\/post\/update\/(\w+)$/;
  const Id = regex.exec(path)[1];

  const filter = { _id: Id }; // Replace with the appropriate filter
  const update = { $set: req.body };
  try {
    const result = await Post.updateOne(filter, update);

    if (result.acknowledged) {
      ResponseJson(res,200,result)
    } 
     else {
      ResponseJson(res ,404 ,{message:"post not Found" })
    }
  } catch (e) {
      ResponseJson(res,500,{message:e.message})
  }
}

module.exports = updatePost;


