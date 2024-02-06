const Actor = require("../models/actor");
const asyncHandler = require("express-async-handler");

exports.actor_list = asyncHandler(async(req, res, next) => {
  res.send("Not implemented: actor list");
});

exports.actor_detail = asyncHandler(async(req, res, next) => {
  res.send(`Not implemented: actor detail: ${req.params.id}`);
});

exports.actor_create_get = asyncHandler(async(req,res,next) => {
  res.send("Not implemented: actor create get");
});

exports.actor_create_post = asyncHandler(async(req, res, next) => {
  res.send("Not implemented: actor create post");
});

exports.actor_delete_get = asyncHandler(async(req, res, next) => {
  res.send("Not implemented: actor delete get");
});

exports.actor_delete_post = asyncHandler(async(req, res, next) => {
  res.send("Not implemented: actor delete post");
})

exports.actor_update_get = asyncHandler(async(req, res, next) => {
  res.send("Not implemetned: actor update get");
})

exports.actor_update_post = asyncHandler(async(req, res, next) => {
  res.send("Not implemented: actor update post");
})