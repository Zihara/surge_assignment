const User = require("../models/User.model");

//Create a user
const createUser = async (req, res) => {

    const user = await User.findOne({email:req.body.email});
    if(user) {
        return res.json(`Email already found`)
    }

    let id = Math.floor( (Math.random() * 900000 )+100000);

    while(true){
        const db_id = await User.findOne({ id: id });
        if (!db_id) break;
        id = Math.floor( (Math.random() * 900000 )+100000);
    }

    const newUser = new User({
        id: id,
        email: req.body.email,
        password: String(id)
    });

    try {
        await newUser.save();
        res.status(200).json(`User successfully added`);
    } catch (err) {
        res.status(500).json(`${err.message}`);
    }
};

//Update a user
const updateUser = async (req,res) =>{

    try {
        await User.findByIdAndUpdate(
            {_id:req.params.id},
            { $set: {
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    dateOfBirth: new Date(req.body.dateOfBirth),
                    mobile: req.body.mobile,
                    status: false,
                    password: req.body.password
                }},
            { new: true }
        );
        res.status(200).json(`User successfully updated`);
    } catch (err) {
        res.status(500).json(`${err.message}`);
    }
}

//Get all users
const getAllUsers = async (req, res) => {

    try{
        const user = await User.find();
        res.status(200).json(user);
    }
    catch (err){
        res.status(500).json(`${err.message}`);
    }

}

//Get a user
const getAUser = async (req, res) => {

    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch (err){
        res.status(500).json(`${err.message}`);
    }

}

module.exports = {createUser,updateUser,getAllUsers,getAUser};