
const createPost = require("../controller/postController/createPost");
const deletePost = require("../controller/postController/deletePost");
const updatePost = require("../controller/postController/updatePost");
const getPost = require('../controller/postController/getPost');
const likePost = require('../controller/postController/likePost');
const dislikePost = require("../controller/postController/dislikePost");
const getAllPost = require("../controller/postController/getAllPost");

function handlePostRoutes(req, res, path) {

  if (/^\/post\/(\w+)$/.test(path) && req.method === "GET") {
    getPost(res ,path);
  } 
  else if (/^\/post\/timeline\/(\w+)$/.test(path) && req.method === "GET") {
    getAllPost(res ,path);
  } 
  else if (path === "/post/create" && req.method === "POST") {
    createPost(req, res);
  } 
  else if (/^\/post\/update\/(\w+)$/.test(path) && req.method === "PUT") {
    updatePost(req, res, path);
  }
   else if (/^\/post\/delete\/(\w+)$/.test(path) && req.method === "DELETE") {
    deletePost(req, res, path);
  }
   else if (/^\/post\/like\/(\w+)$/.test(path) && req.method === "PUT") {
    likePost(req, res, path);
  }
   else if (/^\/post\/dislike\/(\w+)$/.test(path) && req.method === "PUT") {
    dislikePost(req, res, path);
  }
   else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route not found");
  }
}

module.exports = handlePostRoutes;