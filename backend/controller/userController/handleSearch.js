const User = require("../../modal/user");
const ResponseJson = require("../../utils/handleResponse");

// http.createServer((req ,res)=>{
async function handleSearch(req , res  ,path) {

  const regex = /^\/user\/search\/(\w+)$/;
  const query = regex.exec(path)[1];

  try {
    const result =  await User.find({ username: { $regex: `^${query}`, $options: 'i' } ,_id: { $ne: req.body.id }});
    
    if (result) {
      ResponseJson(res,200,result)
    }  else {
      ResponseJson(res,404,{message:"User Not Found"})
    }
  } catch (e) {
    ResponseJson(res,500, {message:e.message})
  }
}

module.exports = handleSearch;