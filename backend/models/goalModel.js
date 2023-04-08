const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    text: String,
    completed: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
