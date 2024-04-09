
const handleRegister = require("../controller/userController/handleRegister");
const handleLogin = require("../controller/userController/handleLogin");
const handleUpdate = require("../controller/userController/handleUpdate");
const handleGet = require('../controller/userController/handleGet');
const handleFollow = require('../controller/userController/handleFollow');
const handleUnFollow = require('../controller/userController/handleUnFollow');
const handleSearch = require("../controller/userController/handleSearch");
const handleLogout = require("../controller/userController/handleLogout");
const findFollowers = require("../controller/userController/findFollowers");
const findFollowing = require("../controller/userController/findFollowing");

function handleUserRoutes(req, res, path) {
  
  if (/^\/user\/search\/(\w+)$/.test(path) && req.method === "POST") {
    handleSearch(req,res, path)
  } 
  else if (/^\/user\/(\w+)$/.test(path) && req.method === "GET") {
    handleGet(res ,path);
  } 
  else if (path === "/user/register" && req.method === "POST") {
    handleRegister(req, res);
  } 
  else if (path === "/user/login" && req.method === "POST") {
    handleLogin(req, res);
  } 
  else if (path === "/user/logout" && req.method === "POST") {
    handleLogout(req, res);
  } 
  else if (/^\/user\/update\/(\w+)$/.test(path) && req.method === "PUT") {
    handleUpdate(req, res, path);
  }
   else if (/^\/user\/delete\/(\w+)$/.test(path) && req.method === "DELETE") {
    handleDelete(req, res, path);
  }
   else if (/^\/user\/follow\/(\w+)$/.test(path) && req.method === "PUT") {
    handleFollow(req, res, path);
  }
   else if (/^\/user\/unfollow\/(\w+)$/.test(path) && req.method === "PUT") {
    handleUnFollow(req, res, path);
  }
   else if (/^\/user\/followers\/(\w+)$/.test(path) && req.method === "GET") {
    findFollowers(req, res, path);
  }
   else if (/^\/user\/following\/(\w+)$/.test(path) && req.method === "GET") {
    findFollowing(req, res, path);
  }
   else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route not found");
  }
}

module.exports = handleUserRoutes;
