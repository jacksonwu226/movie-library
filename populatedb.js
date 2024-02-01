console.log(
  `This script populates some test movies, directors, actors, genres, and movie instances`
)

const userArgs = process.argv.slice(2);

const Actor = require('./models/actor');
const Director = require('./models/director');
const Genre = require('./models/genre');
const Movie = require('./models/movie');
const MovieInstance = require('./models/movieinstance');

const genres = [];
const directors = [];
const actors = [];
const movies = [];
const movieinstances = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main(){
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createGenres();
  await createDirectors();
  await createActors();
  await createMovies();
  await createMovieInstances();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function genreCreate(index, name){
  const genre = new Genre({name: name});
  await genre.save();
  genres[index] = genre;
  console.log(`Added genre: ${name}`);
};

async function directorCreate(index, first_name, family_name, d_birth, d_death){
  const directordetail = {first_name: first_name, family_name: family_name};
  if(d_birth != false){
    directordetail.date_of_birth = d_birth;
  }
  if(d_death != false){
    directordetail.date_of_death = d_death;
  }

  const director = new Director(directordetail);
  await director.save();
  directors[index] = director;
  console.log(`Added director: ${first_name} ${family_name}`);
};

async function actorCreate(index, first_name, family_name, d_birth, d_death){
  const actordetail = {first_name: first_name, family_name: family_name};
  if(d_birth != false){
    actordetail.date_of_birth = d_birth;
  }
  if(d_death != false){
    actordetail.date_of_death = d_death;
  }

  const actor = new Actor(actordetail);
  await actor.save();
  actors[index] = actor;
  console.log(`Added actor: ${first_name} ${family_name}`);
};

async function movieCreate(index, title, director, actor, length, synopsis, genre, rating){
  const moviedetail = {
    title: title, 
    director: director,
    actor: actor,
    length: length,
    synopsis: synopsis,
    rating: rating,
  };
  if(genre != false) moviedetail.genre = genre;

  const movie = new Movie(moviedetail);
  await movie.save();
  movies[index] = movie;
  console.log(`Added movie: ${title}`);
}

async function movieInstanceCreate(index, movie, status, price){
  const movieinstancedetail = {
    movie: movie,
    price: price
  };
  if (status != false) movieinstancedetail.status = status;

  const movieinstance = new MovieInstance(movieinstancedetail);
  await movieinstance.save();
  movieinstances[index] = movieinstance;
  console.log(`Added movie instance ${movie}: ${price}`);
}

async function createGenres(){
  console.log("Adding genres");
  await Promise.all([
    genreCreate(0, "Fantasy"),
    genreCreate(1, "Science Fiction"),
    genreCreate(2, "Horror"),
    genreCreate(3, "Romance"),
    genreCreate(4, "Action"),
    genreCreate(5, "Superhero"),
    genreCreate(6, "Crime"),
    genreCreate(7, "Thriller"),
    genreCreate(8, "Biographical Drama"), // Adding a new genre for "Oppenheimer"
  ]);
}

async function createDirectors(){
  console.log("Adding directors");
  await Promise.all([
    directorCreate(0, 'Peter', 'Jackson', '1961-10-31', false),
    directorCreate(1, 'Christopher', 'Nolan', '1970-07-30', false),
    directorCreate(2, 'Denis', 'Villeneuve', '1967-10-03', false)
  ]);
}

async function createActors(){
  console.log("Adding actors");
  await Promise.all([
    actorCreate(0, 'Christian', 'Bale', '1974-01-30', false),
    actorCreate(1, 'Heath', 'Ledger', '1979-04-04', '2008-01-22'),
    actorCreate(2, 'Tom', 'Hardy', '1977-09-15', false),
    actorCreate(3, 'Michael', 'Caine', '1933-03-14', false),
    actorCreate(4, 'Joseph', 'Gordon-Levitt', '1981-02-17', false),
    actorCreate(5, 'Cillian', 'Murphy', '1976-05-25', false),
    actorCreate(6, 'Amy', 'Adams', '1974-08-20', false),
    actorCreate(7, 'Russell', 'Crowe', '1964-04-07', false),
    actorCreate(8, 'Florence', 'Pugh', '1996-01-03', false),
    actorCreate(9, 'Emily', 'Blunt', '1983-02-23', false),
    // Add more actors as needed
  ]);
}

async function createMovies(){
  console.log("Adding movies");
  await Promise.all([
    movieCreate(0, 
      'Inception', 
      directors[1], 
      [actors[0], actors[4], actors[5]], 
      148, 
      "Dom Cobb (Leonardo DiCaprio) is a thief with the rare ability to enter people's dreams and steal their secrets from their subconscious. His skill has made him a hot commodity in the world of corporate espionage but has also cost him everything he loves. Cobb gets a chance at redemption when he is offered a seemingly impossible task: Plant an idea in someone's mind. If he succeeds, it will be the perfect crime, but a dangerous enemy anticipates Cobb's every move.", 
      genres[1], 8.8),
    movieCreate(1, 
      'The Dark Knight', 
      directors[1], 
      [actors[0], actors[1], actors[5]], 
      152, 
      "With the help of allies Lt. Jim Gordon (Gary Oldman) and DA Harvey Dent (Aaron Eckhart), Batman (Christian Bale) has been able to keep a tight lid on crime in Gotham City. But when a vile young criminal calling himself the Joker (Heath Ledger) suddenly throws the town into chaos, the caped Crusader begins to tread a fine line between heroism and vigilantism.", 
      genres[4], 
      9.0),
    movieCreate(2, 
      'The Dark Knight Rises', 
      directors[1], 
      [actors[0], actors[2], actors[4]], 
      165, 
      "It has been eight years since Batman (Christian Bale), in collusion with Commissioner Gordon (Gary Oldman), vanished into the night. Assuming responsibility for the death of Harvey Dent, Batman sacrificed everything for what he and Gordon hoped would be the greater good. However, the arrival of a cunning cat burglar (Anne Hathaway) and a merciless terrorist named Bane (Tom Hardy) force Batman out of exile and into a battle he may not be able to win.", 
      genres[4], 
      '8.4'),
    movieCreate(3, 
      'Arrival', 
      directors[2],
      [actors[6], 
      actors[4], 
      actors[5]], 
      116, 
      "Linguistics professor Louise Banks (Amy Adams) leads an elite team of investigators when gigantic spaceships touch down in 12 locations around the world. As nations teeter on the verge of global war, Banks and her crew must race against time to find a way to communicate with the extraterrestrial visitors. Hoping to unravel the mystery, she takes a chance that could threaten her life and quite possibly all of mankind.", 
      genres[1], 
      '7.9'),
    movieCreate(4, 
      'Gladiator',
      directors[2], 
      [actors[7], actors[0], actors[1]], 
      155, 
      "Set in Roman times, the story of a once-powerful general forced to become a common gladiator. The emperor's son is enraged when he is passed over as heir in favour of his father's favourite general. He kills his father and arranges the murder of the general's family, and the general is sold into slavery to be trained as a gladiator - but his subsequent popularity in the arena threatens the throne.",
       genres[4], 
       8.5),
    movieCreate(5, 
      'Oppenheimer', 
      directors[0], 
      [actors[5], actors[8], actors[9]], 
      180, 
      "During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world's first nuclear explosion, forever changing the course of history.", 
      genres[2], 
      8.4),
    movieCreate(6, 'Black Widow', 
      directors[2], 
      [actors[8], actors[4], actors[9]], 
      134, 
      "Natasha Romanoff, aka Black Widow, confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Pursued by a force that will stop at nothing to bring her down, Natasha must deal with her history as a spy, and the broken relationships left in her wake long before she became an Avenger.", 
      genres[4], 
      7.0),
    movieCreate(7, 
      'A Quiet Place', 
      directors[3], [actors[9], actors[6], actors[4]], 
      '90',
      "If they hear you, they hunt you. A family must live in silence to avoid mysterious creatures that hunt by sound. Knowing that even the slightest whisper or footstep can bring death, Evelyn and Lee are determined to find a way to protect their children while desperately searching for a way to fight back.", 
      genres[2], 
      7.5),
    movieCreate(8, 
      'Batman Begins', 
      directors[1], 
      [actors[0], actors[1], actors[3]], 
      140, 
      "A young Bruce Wayne (Christian Bale) travels to the Far East, where he's trained in the martial arts by Henri Ducard (Liam Neeson), a member of the mysterious League of Shadows. When Ducard reveals the League's true purpose -- the complete destruction of Gotham City -- Wayne returns to Gotham intent on cleaning up the city without resorting to murder. With the help of Alfred (Michael Caine), his loyal butler, and Lucius Fox (Morgan Freeman), a tech expert at Wayne Enterprises, Batman is born.", 
      genres[4], 
      8.2),
  ]);
}

async function createMovieInstances(){
  console.log("Adding movie instances");
  await Promise.all([
    // Inception instances
    movieInstanceCreate(0, movies[0], 'in-stock', 12.99),
    movieInstanceCreate(1, movies[0], 'in-cart', 14.99),
    movieInstanceCreate(2, movies[0], 'sold', 18.99),

    // The Dark Knight instances
    movieInstanceCreate(3, movies[1], 'in-stock', 14.99),
    movieInstanceCreate(4, movies[1], 'unavailable', 0), // Set an actual value for 'unavailable'
    movieInstanceCreate(5, movies[1], 'in-cart', 16.99),

    // The Dark Knight Rises instances
    movieInstanceCreate(6, movies[2], 'in-stock', 16.99),
    movieInstanceCreate(7, movies[2], 'in-stock', 17.99),

    // Arrival instances
    movieInstanceCreate(8, movies[3], 'in-stock', 11.99),
    movieInstanceCreate(9, movies[3], 'in-stock', 13.99),
    movieInstanceCreate(10, movies[3], 'sold', 15.99),

    // Gladiator instances
    movieInstanceCreate(11, movies[4], 'in-stock', 13.99),
    movieInstanceCreate(12, movies[4], 'sold', 15.99),
    movieInstanceCreate(13, movies[4], 'unavailable', 0), // Set an actual value for 'unavailable'

    // Oppenheimer instances
    movieInstanceCreate(14, movies[5], 'unavailable', 0), // Set an actual value for 'unavailable'
    movieInstanceCreate(15, movies[5], 'in-stock', 19.99),

    // Black Widow instances
    movieInstanceCreate(16, movies[6], 'in-stock', 14.99),
    movieInstanceCreate(17, movies[6], 'sold', 16.99),

    // A Quiet Place instances
    movieInstanceCreate(18, movies[7], 'in-stock', 11.99),
    movieInstanceCreate(19, movies[7], 'in-cart', 13.99),

    // Batman Begins instances
    movieInstanceCreate(20, movies[8], 'in-stock', 17.99),
    movieInstanceCreate(21, movies[8], 'sold', 19.99),
    // Add more instances as needed
  ]);
}
