const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieInstanceSchema = new Schema({
  movie: {type: Schema.Types.ObjectId, ref: "Movie", required: true},
  status: {
    type: String,
    required: true,
    enum: ["in-stock", "in-cart", "sold", "unavailable"],
    default: "unavailable"
  },
  price: {type: Schema.Types.Decimal128, required: true},
})

MovieInstanceSchema.virtual('url').get(function(){
  return `/catalog/movieinstance/${this._id}`;
})

module.exports = mongoose.model("MovieInstance", MovieInstanceSchema);