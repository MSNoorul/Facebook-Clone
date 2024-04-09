const Post = require("../../modal/post");
const ResponseJson = require("../../utils/handleResponse");
const Cloudinary = require("../../configration/cloudinary");

async function createPost(req, res) {
  try {
    const { img } = req.body;

    let data = {...req.body};

    if (img) {
      const resObj = await Cloudinary.uploader.upload(img, {
        folder: "fb_clone_userpost",
        resource_type: "image",
        quality: "auto",
      });

       data = {
 ...data, img: { public_id: resObj.public_id, url: resObj.url }
      };
    }

    
    const newpost = new Post(data);
    const result = await newpost.save();

    ResponseJson(res, 200, result);
  } catch (e) {
    ResponseJson(res, 500, {message :e.message});
  }
}

module.exports = createPost;
