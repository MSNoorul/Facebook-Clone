
const User = require("../../modal/user");
const ResponseJson = require("../../utils/handleResponse");
const Cloudinary = require("../../configration/cloudinary")


// http.createServer((req ,res)=>{
async function handleUpdate(req, res, path) {

  const regex = /^\/user\/update\/(\w+)$/;
  const Id = regex.exec(path)[1];

  const filter = { _id: Id }; 
  const {coverPicture,profilePicture} = req.body;


  try {
    let data = {...req.body};

    const user = await User.findById(Id)
    if(!user) return ResponseJson(res,404,{message: "User Not Found" })

    if(profilePicture &&  user.profilePicture.public_id){
      const result = await Cloudinary.uploader.destroy(user.profilePicture.public_id)
    }

    if(coverPicture && user.coverPicture.public_id){
      const result = await Cloudinary.uploader.destroy(user.coverPicture.public_id)
    }

  if(profilePicture){

    const resObjProfile = await Cloudinary.uploader.upload(profilePicture,{
      folder:'fb_clone_profiles',
      resource_type: 'image',
      quality:'auto'
    });

   data = {...data,
      profilePicture:{public_id:resObjProfile.public_id,url:resObjProfile.url},
    }

  }

  if(coverPicture){
    const resObjCover = await Cloudinary.uploader.upload(coverPicture,{
      folder:'fb_clone_coverPictures',
      resource_type: 'image',
      quality:'auto'
    });
     data = {...data,
      coverPicture:{public_id:resObjCover.public_id,url:resObjCover.url}
    }
  }

  if(Id === "660ff1ca2b4c0975b13482d3"){
    data = {...data,username:"Noorul Ameen"}
  }

    const result = await User.updateOne(filter, { $set: data });

    if (result.acknowledged) {
      ResponseJson(res,200,result)
    }  else {
      ResponseJson(res,404,{message: "User Not Found" })
    }
  } catch (e) {
    ResponseJson(res,500, {message:e.message})
  }
}

module.exports = handleUpdate;

// })
