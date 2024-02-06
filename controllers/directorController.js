const Director = require("../models/director");
const asyncHandler = require("express-async-handler");

exports.director_list = asyncHandler(async(req, res, next) => {
  res.send("Not implemented: director list");
});

exports.director_detail = asyncHandler(async(req, res, next) => {
  res.send(`Not implemented: director detail: ${req.params.id}`);
});

exports.director_create_get = asyncHandler(async(req,res,next) => {
  res.send("Not implemented: director create get");
});

exports.director_create_post = asyncHandler(async(req, res, next) => {
  res.send("Not implemented: director create post");
});

exports.director_delete_get = asyncHandler(async(req, res, next) => {
  res.send("Not implemented: director delete get");
});

exports.director_delete_post = asyncHandler(async(req, res, next) => {
  res.send("Not implemented: director delete post");
})

exports.director_update_get = asyncHandler(async(req, res, next) => {
  res.send("Not implemetned: director update get");
})

exports.director_update_post = asyncHandler(async(req, res, next) => {
  res.send("Not implemented: director update post");
})