const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: {type: String, required: true},
  director: {type: Schema.Types.ObjectId, ref: "Director", required: true},
  actor: {type: Schema.Types.ObjectId, ref: "Actor", required: true},
  length: {type: Number, min: 0, required: true},
  synopsis: {type: String, required: true},
  genre: [{type: Schema.Types.ObjectId, ref: "Genre"}],
  rating: {type: Schema.Types.Decimal128, min: 0}
});

MovieSchema.virtual("url").get(function(){
  return `/catalog/movie/${this._id}`;
})

module.exports = mongoose.model("Movie", MovieSchema);