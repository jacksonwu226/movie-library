const express = require("express");
const router = express.Router();  

const movie_controller = require("../controllers/movieController");
const actor_controller = require("../controllers/actorController");
const director_controller = require("../controllers/directorController");
const movie_instance_controller = require("../controllers/movieinstanceController");
const genre_controller = require("../controllers/genreController");

// movie routes

// get home page
router.get("/", movie_controller.index);

// get request for creating movies
router.get("/movie/create", movie_controller.movie_create_get);

// post request for creating movies
router.post("/movie/create", movie_controller.movie_create_post);

// get request for deleting a movie
router.get("/movie/:id/delete", movie_controller.movie_delete_get);

// post request for deleting a movie
router.post("/movie/:id/delete", movie_controller.movie_delete_post);

// get request for updating a movie
router.get("/movie/:id/update", movie_controller.movie_update_get);

// post request for updating a movie
router.post("/movie/:id/update", movie_controller.movie_update_post);

// get request for one movie
router.get("/movie/:id", movie_controller.movie_detail);

// get request for a list of movies
router.get("/movies", movie_controller.movie_list);


// director routes
router.get("/director/create", director_controller.director_create_get);
router.post("/director/create", director_controller.director_create_post);
router.get("/director/:id/delete", director_controller.director_delete_get);
router.post("/director/:id/delete", director_controller.director_delete_post);
router.get("/director/:id/update", director_controller.director_update_get);
router.post("/director/:id/update", director_controller.director_update_post);
router.get("/director/:id", director_controller.director_detail);
router.get("/directors", director_controller.director_list);

// actor routes
router.get("/actor/create", actor_controller.actor_create_get);
router.post("/actor/create", actor_controller.actor_create_post);
router.get("/actor/:id/delete", actor_controller.actor_delete_get);
router.post("/actor/:id/delete", actor_controller.actor_delete_post);
router.get("/actor/:id/update", actor_controller.actor_update_get);
router.post("/actor/:id/update", actor_controller.actor_update_post);
router.get("/actor/:id", actor_controller.actor_detail);
router.get("/actors", actor_controller.actor_list);

// genre routes
router.get("/genre/create", genre_controller.genre_create_get);
router.post("/genre/create", genre_controller.genre_create_post);
router.get("/genre/:id/delete", genre_controller.genre_delete_get);
router.post("/genre/:id/delete", genre_controller.genre_delete_post);
router.get("/genre/:id/update", genre_controller.genre_update_get);
router.post("/genre/:id/update", genre_controller.genre_update_post);
router.get("/genre/:id", genre_controller.genre_detail);
router.get("/genres", genre_controller.genre_list);

// movie instance routes
router.get("/movieinstance/create", movie_instance_controller.movieinstance_create_get);
router.post("/movieinstance/create", movie_instance_controller.movieinstance_create_post);
router.get("/movieinstance/:id/delete", movie_instance_controller.movieinstance_delete_get);
router.post("/movieinstance/:id/delete", movie_instance_controller.movieinstance_delete_post);
router.get("/movieinstance/:id/update", movie_instance_controller.movieinstance_update_get);
router.post("/movieinstance/:id/update", movie_instance_controller.movieinstance_update_post);
router.get("/movieinstance/:id", movie_instance_controller.movieinstance_detail);
router.get("/movieinstances", movie_instance_controller.movieinstance_list);

module.exports = router;