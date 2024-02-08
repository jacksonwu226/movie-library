const MovieInstance = require("../models/movieinstance");
const asyncHandler = require("express-async-handler");

// display all movie instances
exports.movieinstance_list = asyncHandler(async (req, res, next) => {
  const allMovieInstances = await MovieInstance.find({}).populate("movie").exec();
  res.render("movieinstance_list", {
    title: "Movie Instance List",
    movieinstance_list : allMovieInstances
  });
});

exports.movieinstance_detail = asyncHandler(async (req,res, next)=> {
  res.send(`NOT IMPLEMENTED: BOOK INSTANCE DETAIL: ${req.params.id}`);
});

exports.movieinstance_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: MOVIE INSTANCE CREATE GET");
});

exports.movieinstance_create_post = asyncHandler(async(req, res, next)=> {
  res.send("NOT IMPLEMENTED: MOVIE INSTANCE CREATE POST");
});

exports.movieinstance_delete_get = asyncHandler(async(req,res,next)=>{
  res.send("NOT IMPLEMENTED: MOVIE INSTANCE DELETE GET");
});

exports.movieinstance_delete_post = asyncHandler(async(req, res, next) =>{
  res.send("NOT IMPLEMENTED: BOOK INSTANCE DELETE POST");
})

exports.movieinstance_update_post = asyncHandler(async(req, res, next)=>{
  res.send("NOT IMPLEMENTED: MOVIE INSTANC UPDATE POST");
});

exports.movieinstance_update_get = asyncHandler(async(req,res,next) => {
  res.send("NOT IMPLEMENTED: MOVIE INSTANCE UPDATE GET")
})