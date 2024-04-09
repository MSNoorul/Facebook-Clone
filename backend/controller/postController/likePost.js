const Post = require("../../modal/post");
const User = require("../../modal/user");
const ResponseJson = require("../../utils/handleResponse");


async function likePost(req, res, path) {

  const regex = /^\/post\/like\/(\w+)$/;
  const Id = regex.exec(path)[1];

  const filter = { _id: Id }; 

  try {
    const post = await Post.findOne(filter);
    const currentuser = await User.findOne({ _id: req.body.id});

    if (!post.likes.includes(currentuser._id)) {

      const result = await post.updateOne({ $push: { likes: currentuser._id} });

      ResponseJson(res,200,result)
    } else {
      ResponseJson(res ,404 ,{message:"Altready Liked" })
    }
  } catch (e) {
    ResponseJson(res,500,{message:e.message})
  }
}

module.exports = likePost;
