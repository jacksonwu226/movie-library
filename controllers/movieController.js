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
  res.send(`Not implemented: movie list`);
});

exports.movie_detail = asyncHandler(async(req, res, next) => {
  res.send(`Not implemented: movie detail: ${req.params.id}`);
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