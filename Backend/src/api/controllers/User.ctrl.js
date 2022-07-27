const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let salt = bcrypt.genSaltSync(10);
//Create a user
const createUser = async (req, res) => {

    const user = await User.findOne({email:req.body.email});
    if(user) {
        return res.status(406).json(`Email already found`)
    }

    let id = Math.floor( (Math.random() * 900000 )+100000);

    while(true){
        const db_id = await User.findOne({ id: id });
        if (!db_id) break;
        id = Math.floor( (Math.random() * 900000 )+100000);
    }

    let hashPwd = bcrypt.hashSync(String(id), salt);

    const newUser = new User({
        id: id,
        email: req.body.email,
        password: hashPwd
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

    let hashPwd = bcrypt.hashSync(req.body.password, salt);

    try {
        await User.findByIdAndUpdate(
            {_id:req.params.id},
            { $set: {
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    dateOfBirth: new Date(req.body.dateOfBirth),
                    mobile: req.body.mobile,
                    status: false,
                    password: hashPwd
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

//User login
const UserLogin = async (req, res) => {
    try {
        //find the user with email
        const user = await User.findOne({email:req.body.email});

        //check availability of the user
        if(!user) return res.status(401).json("Wrong email! Please type it again");

        //check the password with bcrypt compare
        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);
        if(!isPasswordCorrect) return res.status(401).json("Wrong password! Please type it again");

        //Create a Jsonwebtoken with jwt sign
        const token = jwt.sign({
                id:user._id,
                accountType:user.accountType
            }, process.env.SECRET_KEY
        )

        const {id,password,...userDetails} = user._doc;

        //Create a cookie with the token
        res.cookie("access_token",token,{
                httpOnly:true
            }).status(200).json({...userDetails})

    } catch (err) {
        res.status(500).json(err.message);
    }
}

module.exports = {createUser,updateUser,getAllUsers,getAUser,UserLogin};