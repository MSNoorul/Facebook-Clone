
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
const handleDelete = require("../controller/postController/deletePost");

const Router = require('../utils/router');

function handleUserRoutes(req, res) {

  const route = new Router(req,res);

  route.get(/^\/user\/(\w+)$/,handleGet)
  route.get(/^\/user\/followers\/(\w+)$/,findFollowers)
  route.get(/^\/user\/following\/(\w+)$/,findFollowing)

  route.post(/^\/user\/search\/(\w+)$/,handleSearch)
  route.post('/user/register',handleRegister)
  route.post('/user/login',handleLogin)
  route.post('/user/logout',handleLogout)

  route.update(/^\/user\/update\/(\w+)$/,handleUpdate)
  route.update(/^\/user\/follow\/(\w+)$/,handleFollow)
  route.update(/^\/user\/unfollow\/(\w+)$/,handleUnFollow)

  route.delete(/^\/user\/delete\/(\w+)$/,handleDelete)

}

module.exports = handleUserRoutes;
