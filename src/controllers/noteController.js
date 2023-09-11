const noteModel = require("../models/note");

const createNote = async (req, res) => {
  const { title, description } = req.body;
  const newNote = new noteModel({
    title: title,
    description: description,
    userId: req.userId,
  });

  try {
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateNode = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  const newNote = {
    title: title,
    description: description,
    userId: req.userId,
  };

  try {
    await noteModel.findByIdAndUpdate(id, newNote, { new: true }); //new -> will update first and then return the updated object.
    res.status(200).json(newNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteNode = async (req, res) => {
  const id = req.params.id;
  try {
    const note = await noteModel.findByIdAndRemove(id);
    res.status(202).json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await noteModel.find({ userId: req.userId });
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { createNote, updateNode, deleteNode, getNotes };
