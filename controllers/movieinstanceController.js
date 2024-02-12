const MovieInstance = require("../models/movieinstance");
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
  res.send("NOT IMPLEMENTED: MOVIE INSTANCE CREATE GET");
});

exports.movieinstance_create_post = asyncHandler(async(req, res, next)=> {
  res.send("NOT IMPLEMENTED: MOVIE INSTANCE CREATE POST");
});

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