function cors(res ,req) {

  res.setHeader("Access-Control-Allow-Origin", "https://facebook-clone-am4b.onrender.com");
  res.setHeader('Access-Control-Allow-Methods', "GET ,POST,PUT,DELETE");
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization,X-Auth-Token,Origin');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }
}
/*"origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204*/

module.exports = cors;
