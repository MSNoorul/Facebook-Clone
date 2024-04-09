
const User = require("../../modal/user");
const ResponseJson = require("../../utils/handleResponse");

async function handleDelete(req, res, path) {

  const regex = /^\/user\/delete\/(\w+)$/;
  const Id = regex.exec(path)[1];

  const filter = { username: Id }; // Replace with the appropriate filter

  try {
    const result = await User.deleteOne(filter);
    
    if (result.acknowledged) {
      ResponseJson(res,200,result)
    }  else {
      ResponseJson(res,404,{message: "User Not Found" })
    }
  } catch (e) {
    ResponseJson(res,500,{message:e.message})
  }
}

module.exports = handleDelete;
