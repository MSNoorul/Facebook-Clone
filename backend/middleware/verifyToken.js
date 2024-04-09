const NWT = require("../lib/NWT");

function verifyToken(req, res) {
  try {
    const athuheader = req.headers['authorization'] 
    if(athuheader){
       const payload =  NWT.verifyToken(authorization,process.env.ACCESS_TOKEN_SECRET);
       req.user = payload.username;
       next();

    } else {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 401;
      res.end(JSON.stringify({ message: "no authorization" }));
    }
  } catch (e) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: e }));
  }
}

module.exports = verifyToken;