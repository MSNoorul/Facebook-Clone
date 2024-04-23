const User = require("../../modal/user");
const ResponseJson = require("../../utils/handleResponse");

// http.createServer((req ,res)=>{
async function handleGet( req ,res ,path) {

  const regex = /^\/user\/(\w+)$/;
  const Id = regex.exec(path)[1];

  const filter = { _id: Id }; // Replace with the appropriate filter

  try {
    const result = await User.findOne(filter);
    
    if (result) {
      ResponseJson(res,200,result)
     
    }  else {
      ResponseJson(res,404,{message: "User Not Found" })

    }
  } catch (e) {
    ResponseJson(res,500,{message: e.message})
  
  }
}

module.exports = handleGet;