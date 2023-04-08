const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    text: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
