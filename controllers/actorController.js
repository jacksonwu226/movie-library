const Actor = require("../models/actor");
const Movie = require("../models/movie")
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

exports.actor_create_get = asyncHandler(async(req,res,next) => {
  res.send("Not implemented: actor create get");
});

exports.actor_create_post = asyncHandler(async(req, res, next) => {
  res.send("Not implemented: actor create post");
});

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