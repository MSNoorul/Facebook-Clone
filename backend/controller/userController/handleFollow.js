
const User = require("../../modal/user");
const ResponseJson = require("../../utils/handleResponse");

// http.createServer((req ,res)=>{
async function handleFollow(req,res ,path) {

  const regex = /^\/user\/follow\/(\w+)$/;
  const Id = regex.exec(path)[1];

  const filter = {_id: Id }; // Replace with the appropriate filter
  const requestuserId = req.body.id;

  try {
    const user = await User.findOne(filter);
    const requestuser = await User.findOne({_id:requestuserId});
   
    if (!requestuser.following.includes(Id)) {

     const result1 =  await user.updateOne({$push:{followers:requestuserId}});
     const result2 =  await requestuser.updateOne({$push:{following:Id}});
     const updatedUser = await User.findOne({ _id: requestuserId });

     ResponseJson(res,200,{result:result2,currentUser:{...updatedUser._doc,refreshtoken:""} })
   
    }  else {
      ResponseJson(res,409,{message:  "Altready Followed" + user.username})
    
    }
  } catch (e) {
    ResponseJson(res,500,{message: e.message })

  }
}

module.exports = handleFollow;