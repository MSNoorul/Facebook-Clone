const NWT = require("../lib/NWT");

function verifyToken(req, res) {
  try {
    const athuheader = req.headers["authorization" || "Authorization"];
    const token = athuheader?.split(" ")[1];
    if (!token) {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 401;
      res.end(JSON.stringify({ message: "no authorization header" }));
      return;
    }
    const payload = NWT.verifyToken(token, process.env.ACCESS_TOKEN_SECRET);

    if(payload){
      req.user = payload.username;
      return true; // to continue the middleware Func call - see Router util class For more
    }
    else {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 403;
      res.end(JSON.stringify({ message: "Token expired" }));
      return;
    }

  } catch (e) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: e.message }));
  }
}

module.exports = verifyToken;
