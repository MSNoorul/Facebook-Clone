const Post = require("../../modal/post");
const User = require("../../modal/user");
const ResponseJson = require("../../utils/handleResponse");


async function dislikePost(req, res, path) {

  const regex = /^\/post\/dislike\/(\w+)$/;
  const Id = regex.exec(path)[1];

  const filter = { _id: Id }; // Replace with the appropriate filter

  try {
    const post = await Post.findOne(filter);
    const currentuser = await User.findOne({ _id: req.body.id });
    if (post.likes.includes(currentuser._id)) {
      
      const result = await post.updateOne({ $pull: { likes: currentuser._id } });

      ResponseJson(res,200,result)
    } else {
      ResponseJson(res ,404 ,{message: "Already Disliked" })
    }
  } catch (e) {
    ResponseJson(res,500,{message:e.message})
  }
}

module.exports = dislikePost;