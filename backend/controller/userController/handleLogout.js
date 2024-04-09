const User = require("../../modal/user");
const ResponseJson = require("../../utils/handleResponse");

async function handleLogout(req, res) {

  try {
   
    const {user } = req.body.username
    // Invalidate the token by removing it from the user's document in the database
    await User.updateOne({ username: user }, { $unset: { refreshtoken: "" } });

    // Clear the cookie in the user's browser
    res.setHeader('Set-Cookie', `jwt=; HttpOnly; Max-Age=0`);

    ResponseJson(res,200,{message: "Logged out successfully" })
  } catch (e) {
    // If there's an error (e.g., token verification failure, database error), handle it appropriately
    ResponseJson(res,500,{message: "Error Unable to Log Out" })
   
  }
}

module.exports = handleLogout;

