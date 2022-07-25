const mongoose = require("mongoose");
const NoteSchema = new mongoose.Schema({
    
    title:{
        type:String,
        required:true
    },
    desc: {
        type:String,
        required:true
    }
})

const notes = mongoose.model("Note", NoteSchema);

module.exports = notes;