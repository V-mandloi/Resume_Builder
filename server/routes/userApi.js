const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("../models/userSchema");

mongoose
  .connect("mongodb+srv://vikram:vikram@cluster0.1ynh0iq.mongodb.net/user")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("MongoDB connection error");
  });

const userRegister = async (req, res, next) => {
  console.log("entter server");
  try {
    const { username, email, password } = req.body;

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User document
    const user = new User({
      username,
      email,
      password,
      //   password: hashedPassword,
    });

    // Save the User document
    await user.save();

    res
      .status(201)
      .send({ success: true, message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error creating user" });
  }
};

const getUserById = async (req, res, next) => {
  const id = req.params.id; // or req.query.id, depending on how you're sending the ID

  try {
    const result = await User.findById(id);
    if (result) {
      res.json(result);
      console.log(result);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUser = async (req, res, next) => {
  console.log("enter get User");
  const { id, email, password } = req.query;
  console.log(id);

  if (email && password) {
    const userFound = await User.findOne({ email });
    if (userFound) {
      if (userFound.password === password) {
        console.log(userFound._id);
        res.status(201).send({
          success: true,
          message: "User are in system",
          id: userFound._id,
        });
        // res.send(userFound._id);
      } else {
        res.send("Incorrect Password!");
      }
    } else {
      res.send("Username not found!");
    }
  } else {
    res.send("Please enter Username and Password!");
  }
};

exports.getUser = getUser;
exports.userRegister = userRegister;
exports.getUserById = getUserById;
