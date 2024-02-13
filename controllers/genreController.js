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
  const [genre, allMoviesWithGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Movie.find({genre: req.params.id}, "title synopsis").exec()
  ]);
  if(genre === null){
    res.redirect("/catalog/genres");
  }
  res.render("genre_delete",{
    title: "Delete Genre",
    genre: genre,
    genre_movies: allMoviesWithGenre
  });
});

exports.genre_delete_post = asyncHandler(async(req, res, next) => {
  const [genre, allMoviesWithGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Movie.find({genre: req.params.id}, "title synopsis").exec()
  ]);
  if(allMoviesWithGenre.length > 0){
    res.render("genre_delete",{
      title: "Delete Genre",
      genre: genre,
      genre_movies: allMoviesWithGenre
    });
    return;
  }else{
    await Genre.findByIdAndDelete(req.body.genreid);
    res.redirect("/catalog/genres");
  }
});

exports.genre_update_get = asyncHandler(async(req, res, next) => {
  const genre = await Genre.findById(req.params.id).exec();

  if(genre === null){
    // no results
    const err = new Error("Genre not found");
    err.status = 404;
    return next(err);
  }
  res.render("genre_form", {
    title: "Update Genre",
    genre: genre
  })
});

exports.genre_update_post = [
  // Validate and sanitize the name field.
  body("name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request .
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data (and the old id!)
    const genre = new Genre({
      name: req.body.name,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values and error messages.
      res.render("genre_form", {
        title: "Update Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid. Update the record.
      await Genre.findByIdAndUpdate(req.params.id, genre);
      res.redirect(genre.url);
    }
  }),
];