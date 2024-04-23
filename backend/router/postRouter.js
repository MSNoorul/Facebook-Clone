
const createPost = require("../controller/postController/createPost");
const deletePost = require("../controller/postController/deletePost");
const updatePost = require("../controller/postController/updatePost");
const getPost = require('../controller/postController/getPost');
const likePost = require('../controller/postController/likePost');
const dislikePost = require("../controller/postController/dislikePost");
const getAllPost = require("../controller/postController/getAllPost");

const Router = require('../utils/router');

function handlePostRoutes(req, res) {

  const route = new Router(req,res);

  route.get(/^\/post\/(\w+)$/,getPost)
  route.get(/^\/post\/timeline\/(\w+)$/,getAllPost)

  route.post('post/create',createPost)

  route.update(/^\/post\/update\/(\w+)$/,updatePost)
  route.update(/^\/post\/like\/(\w+)$/,likePost)
  route.update(/^\/post\/dislike\/(\w+)$/,dislikePost)

  route.delete(/^\/post\/delete\/(\w+)$/,deletePost)

}

module.exports = handlePostRoutes;