const Genre = require("../models/genre");
const Movie = require("../models/movie");
const asyncHandler = require("express-async-handler");

// Display a list of genres
exports.genre_list = asyncHandler(async(req, res, next)=>{
  const allGenres = await Genre.find().sort({name: 1}).exec();
  res.render('genre_list', {
    title: "Genre List",
    genre_list: allGenres
  });
});

exports.genre_detail = asyncHandler(async(req,res, next) => {
  const [genre, genreMovies] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Movie.find({genre: req.params.id}).sort({title: 1}).exec()
  ]);
  if(genre === null){
    console.log("Genre not found");
    const err = new Error("Genre not found");
    err.status = 404;
    return next(err);
  }
  res.render("genre_detail",{
    title: "Genre Detail",
    genre: genre,
    genre_movies: genreMovies
  })
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