const mongoose = require("mongoose");

const Todo = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  todos: [Object],
});

module.exports = mongoose.model("todo", Todo);
