const MovieInstance = require("../models/movieinstance");
const Movie = require('../models/movie');

const {body, validationResult} = require("express-validator")
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
  const movieInstance = await MovieInstance.findById(req.params.id).
    populate("movie").
    exec();
  if(movieInstance === null){
    const err = new Error("Movie instance not found");
    err.status = 404;
    return next(err);
  }
  res.render('movieinstance_detail', {
    title: "Movie: ",
    movieinstance: movieInstance
  })
});

exports.movieinstance_create_get = asyncHandler(async (req, res, next) => {
  const allMovies = await Movie.find({}, "title").sort({title:1}).exec();
  res.render("movieinstance_form", {
    title: "Create Movie Instance",
    movie_list: allMovies
  })
});

exports.movieinstance_create_post = [
  body('movie', "Movie must be specified").trim().isLength({min: 1}).escape(),
  body('status').escape(),
  body('price')
    .trim()
    .isFloat({min:0})
    .escape(),

  asyncHandler(async(req,res,next)=>{
    const errors = validationResult(req);
    const movieInstance = new MovieInstance({
      movie: req.body.movie,
      status: req.body.status,
      price: req.body.price,
    })
    if(!errors.isEmpty()){
      const allMovies = await Movie.find({}, "title").sort({title: 1}).exec();
      res.render("movieinstance_form",{
        titlie: "Create MovieInstance",
        movie_list: allMovies,
        selected_movie: movieInstance.movie._id,
        errors: errors.array(),
        movieinstance: movieInstance
      })
      return;
    }else{
      await movieInstance.save();
      res.redirect(movieInstance.url);
    }
  }),
];
exports.movieinstance_delete_get = asyncHandler(async(req,res,next)=>{
  const movieinstance = await MovieInstance.findById(req.params.id).populate('movie').exec();
  if(movieinstance === null){
    res.redirect('/catalog/movieinstances')
  }
  res.render("movieinstance_delete",{
    title: "Delete movieinstance",
    movieinstance: movieinstance,
  })
});

exports.movieinstance_delete_post = asyncHandler(async(req, res, next) =>{
  await MovieInstance.findByIdAndDelete(req.body.id);
  res.redirect("/catalog/movieinstances")
})

exports.movieinstance_update_post = asyncHandler(async(req, res, next)=>{
  res.send("NOT IMPLEMENTED: MOVIE INSTANC UPDATE POST");
});

exports.movieinstance_update_get = asyncHandler(async(req,res,next) => {
  res.send("NOT IMPLEMENTED: MOVIE INSTANCE UPDATE GET")
})