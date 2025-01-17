const crypto = require("node:crypto");
const User = require("../../modal/user");
const NWT = require('../../lib/NWT');
const ResponseJson = require("../../utils/handleResponse");
const { log } = require("node:console");
async function handleLogin(req, res) {

  const { username,  password } = req.body;
 
  if (!username && !password) {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 401;
    res.end(JSON.stringify({ message: "some fild are missing " }));
  }
  try {
    const iterations = 1000; // Number of iterations for key derivation
    const keyLength = 64; // Length of the derived key in bytes
     
    const finduser = await User.findOne({username :req.body.username});

    if(!finduser) {return ResponseJson(res,404,{message: "User Not Found" })}
    const { password: storedpwd, salt } = finduser;

    const hashpwd = crypto
      .pbkdf2Sync(password, salt, iterations, keyLength, "sha512")
      .toString("hex");

    if (hashpwd === storedpwd) {

      const accesstoken = NWT.createToken({"username":username},process.env.ACCESS_TOKEN_SECRET,1000 * 60 * 60 * 24 );
      const refreshtoken = NWT.createToken({"username":username},process.env.REFRESH_TOKEN_SECRET, 1000 *60 *60 * 24 );
     
      await  User.updateOne({ username: username }, { $set: {refreshtoken : refreshtoken } });

      res.setHeader('Set-Cookie', `jwt=${refreshtoken}; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`);

      ResponseJson(res,200,{...finduser._doc,accesstoken,refreshtoken:""})
    } else {
      ResponseJson(res,401,{message: "Incorrect Password" })
    }
  } catch (e) {
    ResponseJson(res,500, {message :e.message} )
  }
}

module.exports = handleLogin;
