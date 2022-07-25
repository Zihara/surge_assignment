const Note = require("../models/Note.model");

//Create a note
const createNote = async (req, res) => {

    const note = await Note.findOne({email:req.body.email});
    if(note) {
        return res.json(`Email already found`)
    }

    let id = Math.floor( (Math.random() * 900000 )+100000);

    while(true){
        const db_id = await Note.findOne({ id: id });
        if (!db_id) break;
        id = Math.floor( (Math.random() * 900000 )+100000);
    }

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