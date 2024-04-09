const crypto = require("node:crypto");
const User = require("../../modal/user");
const ResponseJson = require("../../utils/handleResponse");

async function handleRegister(req, res) {

  const { username, email, password } = req.body;
  
  if (!username && !email && !password) {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 401;
    res.end(JSON.stringify({ message: "some fild are missing " }));
  }
  try {
    const saltLength = 16; // Length of the salt in bytes
    const iterations = 1000; // Number of iterations for key derivation
    const keyLength = 64; // Length of the derived key in bytes
    const salt = crypto.randomBytes(saltLength).toString("hex");
    const hashpwd = crypto
      .pbkdf2Sync(password, salt, iterations, keyLength, "sha512")
      .toString("hex");

    const newuser = new User({
      username: username,
      password: hashpwd,
      email: email,
      salt: salt,
    });

    const result = await newuser.save();
    ResponseJson(res,200,result)
  } catch (e) {
    if (e.code === 11000) {
      ResponseJson(res,409,{message: "username exist"})
 
    } else {
      ResponseJson(res,500, {message:e.message})
    }
  }
}

module.exports = handleRegister;
