
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

const verifyToken = require('../middleware/verifyToken')

const Router = require('../utils/router');
const refreshtoken = require("../controller/userController/handleRefresh");

function handleUserRoutes(req, res) {

  const route = new Router(req,res);

  route.get(/^\/user\/followers\/(\w+)$/,verifyToken,findFollowers)
  route.get(/^\/user\/following\/(\w+)$/,verifyToken,findFollowing)
  route.get('/user/refresh',refreshtoken)
  route.get(/^\/user\/(\w+)$/,verifyToken,handleGet)

  route.post(/^\/user\/search\/(\w+)$/,handleSearch)
  route.post('/user/register',handleRegister)
  route.post('/user/login',handleLogin)
  route.post('/user/logout',handleLogout)

  route.update(/^\/user\/update\/(\w+)$/,verifyToken,handleUpdate)
  route.update(/^\/user\/follow\/(\w+)$/,handleFollow)
  route.update(/^\/user\/unfollow\/(\w+)$/,handleUnFollow)

  route.delete(/^\/user\/delete\/(\w+)$/,verifyToken,handleDelete)

}

module.exports = handleUserRoutes;
