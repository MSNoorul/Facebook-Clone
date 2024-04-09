const Post = require("../../modal/post");
const User = require("../../modal/user");
const ResponseJson = require("../../utils/handleResponse");

// http.createServer((req ,res)=>{
async function getAllPost( res ,path) {

  const regex = /^\/post\/timeline\/(\w+)$/;
  const Id = regex.exec(path)[1];

  try {
    const user = await User.findById(Id);

    const userPosts = await Post.find({userId:Id});
    const frindsPosts = await Promise.all(
        user.following.map((id)=>Post.find({userId:id}))
    )

   const result = userPosts.concat(...frindsPosts);
   result.sort((a , b)=> new Date(b.createdAt) - new Date(a.createdAt) )

   ResponseJson(res,200,result)
    
  } catch (e) {
    ResponseJson(res,500, {message:e.message})
  }
}

module.exports = getAllPost;