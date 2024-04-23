function cors(res ,req) {
  const allowOrigin = process.env.NODE_ENV == 'development'?'http://localhost:5173':'https://face-book-social.netlify.app'
  res.setHeader("Access-Control-Allow-Origin",allowOrigin);
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
