const Genre = require("../models/genre");
const Movie = require("../models/movie");
const asyncHandler = require("express-async-handler");
const { body, validationResult} = require("express-validator");

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

exports.genre_create_get = (req, res, next) => {
  res.render("genre_form", {title: "Create Genre"});
};

exports.genre_create_post = [
  body("name", "Genre name must contain at least 3 characters")
  .trim()
  .isLength({min:3})
  .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const genre = new Genre({name: req.body.name});

    if (!errors.isEmpty()){
      res.render("genre_form", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array(),
      });
    }else{
      const genreExists = await Genre.findOne({name: req.body.name}).exec();
      if(genreExists){
        res.redirect(genreExists.url);
      }else{
        await genre.save();
        res.redirect(genre.url);
      }
    }
  })
]
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