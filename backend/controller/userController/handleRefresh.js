const NWT = require('../../lib/NWT');
const User = require('../../modal/user');
const ResponseJson = require("../../utils/handleResponse");

async function refreshtoken(req,res){
    const cookieHeader = req.headers.cookie;

    // Parse the cookie header manually
    const cookies = {};
    cookieHeader.split(';').forEach(cookie => {
      const parts = cookie.split('=');
      const name = parts[0].trim();
      const value = parts[1];
      cookies[name] = value;
    });
  

    try{
        const founduser = await User.findOne({refreshtoken:cookies.nwt})
        if(founduser){

           const payload =  NWT.verifyToken(founduser.refreshtoken, process.env.REFRESH_TOKEN_SECRET)
           const accesstoken = NWT.createToken({"username":username},process.env.ACCESS_TOKEN_SECRET,300);
          
           res.setHeader("Content-Type", "application/json");

           res.statusCode = 200;
           res.end(JSON.stringify({ accesstoken}));
        }else{
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 401;
            res.end(JSON.stringify({ message: "something error" }));
        }
    }catch(e){
        ResponseJson(res,500,{message: e })
    }
}

module.exports = refreshtoken;