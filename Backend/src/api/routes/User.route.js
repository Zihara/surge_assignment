const router = require("express").Router();
const User = require("../controllers/User.ctrl");

//Create a user
router.post("/", User.createUser);

//Update a user
router.put("/:id", User.updateUser);

//Get all users
router.get("/", User.getAllUsers);

//Get a user
router.get("/:id", User.getAUser);

module.exports = router