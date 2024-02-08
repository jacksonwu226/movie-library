const Director = require("../models/director");
const Movie = require("../models/movie");
const asyncHandler = require("express-async-handler");

exports.director_list = asyncHandler(async(req, res, next) => {
  const allDirectors = await Director.find()
    .sort({family_name: 1})
    .exec();
  res.render("director_list", {
    title: "Director List",
    director_list: allDirectors
  });
});

exports.director_detail = asyncHandler(async(req, res, next) => {
  const [director, allMoviesByDirector] = await Promise.all([
    Director.findById(req.params.id).exec(),
    Movie.find({director: req.params.id}, "title synopsis")
      .sort({title: 1})
      .exec()
  ]);
  console.log("director not found")

  if(director === null){
    console.log("director not found");
    const err = new Error("Director not found");
    err.status = 404;
    return next(err);
  }
  res.render("director_detail", {
    title: "Director Detail",
    director: director,
    director_movies: allMoviesByDirector
  });
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