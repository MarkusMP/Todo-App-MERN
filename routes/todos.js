const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Todo = require("../models/Todo");
const { uuid } = require("uuidv4");
const bcrypt = require("bcrypt");

router.get("/:id", auth, async (req, res) => {
  const filter = {};

  const todos = await Todo.findById(req.params.id, "-_id -date -__v");

  res.json(todos);
});

router.post("/create", auth, async (req, res) => {
  try {
    const todo = {
      ...req.body.todo,
      id: uuid(),
    };

    const userTodos = await Todo.findByIdAndUpdate(req.body.id, {
      $push: { todos: todo },
    });

    await userTodos.save();

    res.json("success");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const userTodos = await Todo.findByIdAndUpdate(req.body.id, {
      $pull: { todos: { id: req.body.todoid } },
    });

    await userTodos.save();

    res.json("success");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.put("/update", auth, async (req, res) => {
  try {
    await Todo.updateOne(
      { "todos.id": req.body.todoid },
      {
        $set: {
          "todos.$.title": req.body.title,
        },
      }
    );
    res.send("success");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
