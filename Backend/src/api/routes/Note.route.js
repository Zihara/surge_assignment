const router = require("express").Router();
const Note = require("../controllers/Note.ctrl");

//Create a note
router.post("/", Note.createNote);

//Update a note
router.put("/:id", Note.updateNote);

//Delete a note
router.delete("/:id", Note.deleteNote);

//Get all notes
router.get("/", Note.getAllNotes);

//Get a note
router.get("/:id", Note.getANote);

module.exports = router