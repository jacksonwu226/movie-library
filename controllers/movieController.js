const Movie = require("../models/movie");
const Director = require("../models/director");
const Actor = require("../models/actor");
const Genre = require("../models/genre");
const MovieInstance = require("../models/movieinstance");

const {body, validationResult} = require("express-validator");
const asyncHandler = require("express-async-handler");
const genre = require("../models/genre");

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
  const [allDirectors, allActors, allGenres] = await Promise.all([
    Director.find().sort({family_name:1}).exec(),
    Actor.find().sort({family_name:1}).exec(),
    Genre.find().sort({name:1}).exec(),
  ]);
  res.render("movie_form",{
    title: "Create Movie",
    directors: allDirectors,
    actors: allActors,
    genres: allGenres
  });
});

// Handle movie create on POST.
exports.movie_create_post =[
  (req, res, next) => {
    if(!Array.isArray(req.body.genre)){
      req.body.genre = typeof req.body.genre === "undefined" ? [] : [req.body.genre];
    }
    if(!Array.isArray(req.body.actor)){
      req.body.actor = typeof req.body.actor === "undefined" ? [] : [req.body.actor];
    }
    next();
  },
  body("title", "Title must not be empty.")
    .trim()
    .isLength({min:1})
    .escape(),
  body("director", "Director must not be empty.")
    .trim()
    .isLength({min:1})
    .escape(),
  body("actor.*").escape(),
  body("synopsis", "Summary must not be empty")
    .trim()
    .isLength({min:1})
    .escape(),
  body("length", "length must not be empty")
    .trim()
    .isFloat({min:1})
    .escape(),
  body("genre.*").escape(),
  body("rating").isNumeric().escape(),

  asyncHandler(async(req, res, next) =>{
    const errors = validationResult(req);

    const movie = new Movie({
      title: req.body.title,
      director: req.body.director,
      actor: req.body.actor,
      length: req.body.length,
      synopsis: req.body.synopsis,
      genre: req.body.genre,
      rating: req.body.rating
    });
    if(!errors.isEmpty()){
      const [allDirectors, allActors, allGenres] = await Promise.all([
        Director.find().sort({family_name: 1}).exec(),
        Actor.find().sort({family_name:1}).exec(),
        Genre.find().sort({name:1}).exec(),
      ])
      for (const genre of allGenres) {
        if (movie.genre.includes(genre._id)) {
          genre.checked = "true";
        }
      }
      for(const actor of allActors){
        if(movie.actor.includes(actor._id)){
          actor.checked = "true";
        }
      }
      res.render("movie_form", {
        title: "Create Movie",
        directors: allDirectors,
        actors: allActors,
        genres: allGenres,
        movie: movie,
        errors: errors.array(),
      });
    }else{
      await movie.save();
      res.redirect(movie.url);
    }
  })
];

// Display movie delete form on GET.
exports.movie_delete_get = asyncHandler(async (req, res, next) => {
  const [movie, movieInstances] = await Promise.all([
    Movie.findById(req.params.id).populate("director").populate("actor").populate("genre").exec(),
    MovieInstance.find({movie: req.params.id}).exec(),
  ])
  if(movie === null){
    res.redirect("/catalog/movies");
  }
  res.render("movie_delete", {
    title: "Delete Movie",
    movie: movie,
    movie_instances: movieInstances,
  });
});

// Handle movie delete on POST.
exports.movie_delete_post = asyncHandler(async (req, res, next) => {
  const [movie, movieInstances] = await Promise.all([
    Movie.findById(req.params.id).populate("director").populate("actor").populate("genre").exec(),
    MovieInstance.find({movie: req.params.id}).exec(),
  ]);
  if(movie === null){
    res.redirect("/catalog/movies");
  }
  if(movieInstances.length > 0){
    res.render("movie_delete", {
      titlie: "Delete Movie",
      movie: movie,
      movie_instances: movieInstances
    });
    return;
  }else{
    await Movie.findByIdAndDelete(req.body.id);
    res.redirect("/catalog/movies");
  }
});

// Display movie update form on GET.
exports.movie_update_get = asyncHandler(async (req, res, next) => {
  const [movie, allDirectors, allActors, allGenres] = await Promise.all([
    Movie.findById(req.params.id).populate("director").populate("actor").exec(),
    Director.find().sort({family_name: 1}).exec(),
    Actor.find().sort({family_name: 1}).exec(),
    Genre.find().sort({name: 1}).exec(),
  ]);

  if(movie  === null){ 
    const err = new Error("Movie not found");
    err.status = 404;
    return next(err);
  }
  allGenres.forEach((genre) => {
    if(movie.genre.includes(genre._id)){
      genre.checked = "true";
    }    
  })

  allActors.forEach((actor) => {
    if (movie.actor.some(_id => _id.equals(actor._id))) {
      actor.checked = "true";
    }
  });
  res.render("movie_form",  {
    title: "Update Movie",
    directors: allDirectors,
    actors: allActors,
    genres: allGenres,
    movie: movie,
  });
});

// Handle movie update on POST.
exports.movie_update_post = [
  (req, res, next) => {
    if(!Array.isArray(req.body.genre)){
      req.body.genre = typeof req.body.genre === "undefined" ? [] : [req.body.genre];
    }
    if(!Array.isArray(req.body.actor)){
      req.body.actor = typeof req.body.actor === "undefined" ? [] : [req.body.actor];
    }
    next();
  },
  body("title", "Title must not be empty.")
    .trim()
    .isLength({min:1})
    .escape(),
  body("director", "Director must not be empty.")
    .trim()
    .isLength({min:1})
    .escape(),
  body("actor.*").escape(),
  body("synopsis", "Summary must not be empty")
    .trim()
    .isLength({min:1})
    .escape(),
  body("length", "length must not be empty")
    .trim()
    .isFloat({min:1})
    .escape(),
  body("genre.*").escape(),
  body("rating").isNumeric().escape(),

  asyncHandler(async(req, res, next) =>{
    const errors = validationResult(req);

    const movie = new Movie({
      title: req.body.title,
      director: req.body.director,
      actor: req.body.actor,
      length: req.body.length,
      synopsis: req.body.synopsis,
      genre: req.body.genre,
      rating: req.body.rating,
      _id: req.params.id,
    });
    if(!errors.isEmpty()){
      const [allDirectors, allActors, allGenres] = await Promise.all([
        Director.find().sort({family_name: 1}).exec(),
        Actor.find().sort({family_name:1}).exec(),
        Genre.find().sort({name:1}).exec(),
      ])
      for (const genre of allGenres) {
        if (movie.genre.includes(genre._id)) {
          genre.checked = "true";
        }
      }
      for(const actor of allActors){
        if(movie.actor.includes(actor._id)){
          actor.checked = "true";
        }
      }
      res.render("movie_form", {
        title: "Create Movie",
        directors: allDirectors,
        actors: allActors,
        genres: allGenres,
        movie: movie,
        errors: errors.array(),
      });
    }else{
      const updateMovie = await Movie.findByIdAndUpdate(req.params.id, movie, {});
      res.redirect(updateMovie.url);
    }
  })
]