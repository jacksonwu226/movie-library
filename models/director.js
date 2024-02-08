const mongoose = require("mongoose");
const {DateTime} = require('luxon');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
  first_name: {type: String, required: true, maxLength: 100},
  family_name: {type: String, required: true, maxLength: 100},
  date_of_birth: {type: Date},
  date_of_death: {type: Date}
});

DirectorSchema.virtual("name").get(function(){
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }
  return fullname;
});

DirectorSchema.virtual("date_of_birth_formatted").get(function () {
  return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
});

DirectorSchema.virtual("date_of_death_formatted").get(function () {
  return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
});

DirectorSchema.virtual("lifespan").get(function() {
  return `${this.date_of_birth_formatted} - ${this.date_of_death_formatted}`;
});

DirectorSchema.virtual("url").get(function(){
  return `/catalog/director/${this._id}`
});



module.exports = mongoose.model("Director", DirectorSchema);