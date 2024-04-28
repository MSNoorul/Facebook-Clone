
const Cloudinary = require("../../configration/cloudinary");
const Post = require("../../modal/post");
const ResponseJson = require("../../utils/handleResponse");

async function handleDelete(req, res, path) {

  const regex = /^\/post\/delete\/(\w+)$/;
  const Id = regex.exec(path)[1];

  const filter = { _id: Id }; // Replace with the appropriate filter

  try {

    let imgFlag = false;
    let result ;

    const post = await Post.findById(Id);
    const userid = post.userId.toString() // to convert the ObjectId to str
    if(userid !== req.body.id) return ResponseJson(res,401,"You can't Delete")

    if(!post) return ResponseJson(res ,404 ,{message:"Post Not Found" })

    if(post.img)  {
      const resObj = await Cloudinary.uploader.destroy(post.img.public_id)
      imgFlag = resObj.result;
    }

    if((imgFlag && post.img)  || (!imgFlag && !post.img) ){
      const response = await Post.deleteOne(filter);
      result = response;
    }

    if (result?.acknowledged) {
      ResponseJson(res,200,result)
    } 

  } catch (e) {
    ResponseJson(res,500, {message:e.message})
  }
}

module.exports = handleDelete;

// })
