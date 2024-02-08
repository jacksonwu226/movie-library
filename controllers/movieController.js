const Movie = require("../models/movie");
const Director = require("../models/director");
const Actor = require("../models/actor");
const Genre = require("../models/genre");
const MovieInstance = require("../models/movieinstance");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async(req, res, next) => {
  const [numMovies, numMovieInstances, numAvailableMovieInstances, numDirectors, numActors, numGenres,
  ] = await Promise.all([
      Movie.countDocuments({}).exec(),
      MovieInstance.countDocuments({}).exec(),
      MovieInstance.countDocuments({status:'in-stock'}).exec(),
      Director.countDocuments({}).exec(),
      Actor.countDocuments({}).exec(),
      Genre.countDocuments({}).exec(),
    ]);
  res.render('index', {
    title: "Movie Library Home",
    movie_count: numMovies,
    movie_instance_count: numMovieInstances,
    movie_instance_available_count: numAvailableMovieInstances,
    director_count: numDirectors,
    actor_count: numActors,
    genre_count: numGenres,
  });
});

exports.movie_list = asyncHandler(async(req, res, next) => {
  const allMovies = await Movie.find({}, "title director")
    .sort({ title: 1})
    .populate("director")
    .exec();

    res.render("movie_list", { title: "Movie List", movie_list: allMovies});
});

exports.movie_detail = asyncHandler(async(req, res, next) => {
  const [movie, movieInstances] = await Promise.all([
    Movie.findById(req.params.id).populate("director")
    .populate("actor").populate("genre"),
    MovieInstance.find({movie: req.params.id}).exec(),
  ]);
  if(movie === null){
    const err = new Error ("Movie not found");
    err.status = 404;
    return next(err);
  }
  res.render("movie_detail", {
    title: movie.title,
    movie: movie,
    movie_instances: movieInstances
  });
});

// Display movie create form on GET.
exports.movie_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: movie create GET");
});

// Handle movie create on POST.
exports.movie_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: movie create POST");
});

// Display movie delete form on GET.
exports.movie_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: movie delete GET");
});

// Handle movie delete on POST.
exports.movie_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: movie delete POST");
});

// Display movie update form on GET.
exports.movie_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: movie update GET");
});

// Handle movie update on POST.
exports.movie_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: movie update POST");
});