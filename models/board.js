const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 1000 },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true},
  price: { type: Schema.Types.Decimal128, required: true },
  numInStock: { type: Number, required: true, min: 0, required: true},
});

BoardSchema.virtual("url").get(function() {
  return `/inventory/board/${this._id}`;
});

module.exports = mongoose.model("Board", BoardSchema);