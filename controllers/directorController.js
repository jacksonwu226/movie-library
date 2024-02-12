const Director = require("../models/director");
const Movie = require("../models/movie");
const { body, validationResult } = require("express-validator");

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

exports.director_create_get = (req,res,next) =>{
  res.render("director_form", {title: "Create Director"});
};

exports.director_create_post = [
  body("first_name")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("family_name")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),
  body("date_of_birth", "Invalid date of birth")
    .optional({values: "falsy"})
    .isISO8601().
    toDate(),
  body("date_of_birth", "Invalid date of birth")
    .optional({values: "falsy"})
    .isISO8601().
    toDate(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const director = new Director({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    });
    if(!errors.isEmpty()){
      res.render("director_form",{
        title: "Create Director",
        director: director,
        errors: errors.array(),
      });
      return;
    }else{
      await director.save();
      res.redirect(director.url);
    }
  })
]


exports.director_delete_get = asyncHandler(async(req, res, next) => {
  const [director, allMoviesWithDirector] = await Promise.all([
    Director.findById(req.params.id).exec(),
    Movie.find({director: req.params.id}).exec(),
  ]);
  if(director === null){
    res.redirect("/catalog/directors");
  }
  res.render("director_delete", {
    title: "Delete Director",
    director: director,
    director_movies: allMoviesWithDirector
  });
});

exports.director_delete_post = asyncHandler(async(req, res, next) => {
  const [director, allMoviesWithDirector] = await Promise.all([
    Director.findById(req.params.id),
    Movie.find({director: req.params.id}).exec(),
  ]);
  if(allMoviesWithDirector.length > 0){
    res.render("director_delete",{
      title: "Delete Director",
      director: director,
      director_movies: allMoviesWithDirector
    });
    return;
  } else{
    await Director.findByIdAndDelete(req.body.directorid);
    res.redirect("/catalog/directors");
  }
})

exports.director_update_get = asyncHandler(async(req, res, next) => {
  res.send("Not implemetned: director update get");
})

exports.director_update_post = asyncHandler(async(req, res, next) => {
  res.send("Not implemented: director update post");
})