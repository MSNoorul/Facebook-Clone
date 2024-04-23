const Post = require("../../modal/post");
const User = require("../../modal/user");
const ResponseJson = require("../../utils/handleResponse");

// http.createServer((req ,res)=>{
async function getAllPost(req ,res, path) {
  const regex = /^\/post\/timeline\/(\w+)$/;
  const Id = regex.exec(path)[1];

  try {
    const user = await User.findById(Id);

    const userPosts = await Post.find({ userId: Id });
    const frindsPosts = await Promise.all(
      user.following.map((id) => Post.find({ userId: id }))
    );

    //  this function for the pagenation with the post sort by date (with bugs)
    //   const getPost = async (page)=> {

    //   const limit = path.limit;
    //   const offset = path.offset;

    //   const userPosts = await Post.find({userId:Id}).skip(page).limit(limit);
    //   const frindsPosts = await Promise.all(
    //     user.following.map((id)=>Post.find({userId:id}).skip(page).limit(limit))
    //   )

    //   const data = userPosts.concat(...frindsPosts);
    //   data.sort((a , b)=> new Date(b.createdAt) - new Date(a.createdAt) )

    //   const result = result.splice(offset,limit);
    //   if(result.leght == 0) return ResponseJson()
    //   if(result.lenght < limit) {getPost(page+limit)}
    // }

    // second logic

    // not efficiand bug fixed 

    // const getPost = async (page , rest) => {

    //   const limit = path.limit;
    //   const offset = path.offset -1;

    //   let userPosts = await Post.find({ userId: Id })
    //     .sort({ createdAt: -1 })
    //     .skip(page)
    //     .limit(limit);

    //   const frindsPosts = await Promise.all(
    //     user.following.map((id) =>
    //       Post.find({ userId: id }).skip(page).limit(limit)
    //     )
    //   );
    //   // sort frindsPosts to see the user have newest post
    //   frindsPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    //   if (userPosts[limit - 1].createdAt < frindsPosts[0].createdAt && offset > 0) {
    //     userPosts = await Post.find({ userId: Id })
    //       .sort({ createdAt: -1 })
    //       .skip(page + limit)
    //       .limit(limit);
    //   }

    //   const data = userPosts.concat(...frindsPosts,...rest);
    //   // rest data from the first dataArr
    //   data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    //   const result = result.splice(offset, limit);

    //   // if result is emty return 
    //   if (result.leght == 0) return ResponseJson();

    //   // if the result arr have less data inc the offset call the func
    //   if (result.lenght < limit) {
    //     getPost(page + limit , result);
    //   }
    // };
    //

    const result = userPosts.concat(...frindsPosts);
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    ResponseJson(res, 200, result);
  } catch (e) {
    ResponseJson(res, 500, { message: e.message });
  }
}

module.exports = getAllPost;
