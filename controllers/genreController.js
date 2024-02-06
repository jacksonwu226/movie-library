const Genre = require("../models/genre");
const asyncHandler = require("express-async-handler");

// Display a list of genres
exports.genre_list = asyncHandler(async(req, res, next)=>{
  res.send(`NOT IMPLEMENTED: GENRE LIST`);
});

exports.genre_detail = asyncHandler(async(req,res, next) => {
  res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
});

exports.genre_create_get = asyncHandler(async(req, res, next) => {
  res.send("Not implemented: genre create get");
});

exports.genre_create_post = asyncHandler(async(req,res,next) => {
  res.send("Not implemented: genre create post");
});

exports.genre_delete_get = asyncHandler(async(req, res, next) => {
  res.send("Not implemented: genre create post");
});

exports.genre_delete_post = asyncHandler(async(req, res, next) => {
  res.send("Not implemented: genre delete post");
});

exports.genre_update_get = asyncHandler(async(req, res, next) => {
  res.send("Not implemented: genre update get");
});

exports.genre_update_post = asyncHandler(async(req, res, next) => {
  res.send("Not implemented: genre update post");
})