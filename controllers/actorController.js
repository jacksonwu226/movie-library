const Actor = require("../models/actor");
const Movie = require("../models/movie")
const {body, validationResult} = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.actor_list = asyncHandler(async(req, res, next) => {
  const allActors = await Actor.find()
    .sort({family_name: 1})
    .exec();
  res.render("actor_list", {
    title: "Actor List",
    actor_list: allActors
  });
});

exports.actor_detail = asyncHandler(async(req, res, next) => {
  const [actor, allMoviesByActor] = await Promise.all([
    Actor.findById(req.params.id).exec(),
    Movie.find({actor: req.params.id}, "title synopsis")
    .sort({title : 1}).exec()
  ]);
  if(actor === null){
    console.log("actor not found");
    const err = new Error("Actor not found");
    err.status = 404;
    return next(err);
  }
  res.render("actor_detail",{
    title: "Actor Detail",
    actor: actor,
    actor_movies: allMoviesByActor
  });
});

exports.actor_create_get = (req, res, next) => {
  res.render("actor_form", {title: "Create Actor"});
}

exports.actor_create_post =[
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
  asyncHandler(async(req, res, next) => {
    const errors = validationResult(req);
    const actor = new Actor({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    });
    if(!errors.isEmpty()){
      res.render("actor_form", {
        title: "Create Director",
        actor: actor,
        errors: errors.array(),
      });
      return;
    }else{
      await actor.save();
      res.redirect(actor.url);
    }
  })
]

exports.actor_delete_get = asyncHandler(async(req, res, next) => {
  res.send("Not implemented: actor delete get");
});

exports.actor_delete_post = asyncHandler(async(req, res, next) => {
  res.send("Not implemented: actor delete post");
})

exports.actor_update_get = asyncHandler(async(req, res, next) => {
  res.send("Not implemetned: actor update get");
})

exports.actor_update_post = asyncHandler(async(req, res, next) => {
  res.send("Not implemented: actor update post");
})