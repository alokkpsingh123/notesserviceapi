const express = require("express");
const noteRouter = express.Router();
const auth = require("../middlewares/auth");

const {
  createNote,
  updateNode,
  deleteNode,
  getNotes,
} = require("../controllers/noteController");

noteRouter.get("/", auth, getNotes);

noteRouter.post("/", auth, createNote);

noteRouter.delete("/:id", auth, deleteNode);

noteRouter.put("/:id", auth, updateNode);

module.exports = noteRouter;
