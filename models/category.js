const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true, maxLength: 30 },
  description: { type: String, required: true, maxLength: 70 },
});

CategorySchema.virtual("url").get(function() {
  return `/inventory/category/${this._id}`;
});

CategorySchema.virtual("url_del").get(function() {
  return `/inventory/category/${this._id}/delete`;
})

CategorySchema.virtual("url_update").get(function() {
  return `/inventory/category/${this._id}/update`;
})

module.exports = mongoose.model("Category", CategorySchema);