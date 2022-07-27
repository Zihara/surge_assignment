const Note = require("../models/Note.model");

//Create a note
const createNote = async (req, res) => {

    const newNote = new Note({
        title:req.body.title,
        desc: req.body.desc
    });

    try {
        await newNote.save();
        res.status(200).json(`Note successfully added`);
    } catch (err) {
        res.status(500).json(`${err.message}`);
    }
};

//Update a note
const updateNote = async (req,res) =>{

    try {
        await Note.findByIdAndUpdate(
            {_id:req.params.id},
            { $set: {
                    title:req.body.title,
                    desc: req.body.desc
                }},
            { new: true }
        );
        res.status(200).json(`Note successfully updated`);
    } catch (err) {
        res.status(500).json(`${err.message}`);
    }
}
//Delete a note
const deleteNote = async (req,res) =>{

    try {
        await Note.findByIdAndDelete(req.params.id);
        res.status(200).json(`Note successfully deleted`);
    } catch (err) {
        res.status(500).json(`${err.message}`);
    }
}

//Get all notes
const getAllNotes = async (req, res) => {

    try{
        const note = await Note.find();
        res.status(200).json(note);
    }
    catch (err){
        res.status(500).json(`${err.message}`);
    }

}

//Get a note
const getANote = async (req, res) => {

    try{
        const note = await Note.findById(req.params.id);
        res.status(200).json(note);
    }
    catch (err){
        res.status(500).json(`${err.message}`);
    }

}

module.exports = {createNote,updateNote,deleteNote,getAllNotes,getANote};