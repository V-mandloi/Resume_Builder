const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Resume = require("../models/resumeSchema");
const User = require("../models/userSchema");

mongoose
  .connect("mongodb+srv://vikram:vikram@cluster0.1ynh0iq.mongodb.net/User")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("MongoDB connection error");
  });

const createResume = async (req, res, next) => {
  console.log("enter");
  const { id } = req.params;
  console.log(id);
  try {
    // Extract data from the request body
    const {
      name,
      email,
      number,
      DOB,
      gender,
      religion,
      nationality,
      maritalStatus,
      hobbies,
      language,
      address,
      experiences,
      education,
      skills,
    } = req.body;

    // Check for missing required fields
    if (
      !name ||
      !email ||
      !number ||
      !DOB ||
      !gender ||
      !nationality ||
      !maritalStatus ||
      !hobbies ||
      !language ||
      !address ||
      !experiences ||
      !education ||
      !skills
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    // Ensure experiences, education, and skills are arrays
    if (
      !Array.isArray(experiences) ||
      !Array.isArray(education) ||
      !Array.isArray(skills)
    ) {
      return res.status(400).json({
        message: "Experiences, education, and skills must be arrays.",
      });
    }

    // Create a new resume instance
    const createdResume = new Resume({
      name,
      email,
      number,
      DOB,
      gender,
      religion, // This is optional, no need to check for its presence
      nationality,
      maritalStatus,
      hobbies,
      language,
      address,
      experiences, // Array of objects
      education, // Array of objects
      skills, // Array of objects
    });
    console.log("enter2");
    // Save the resume to the database
    let user = await User.findById(id);
    console.log(user);

    user.resumeSchema.push(createdResume);

    const savedResume = await createdResume.save();
    const savedInUser = await user.save();

    // Log the saved data and send a response
    res.status(201).send({ success: true, message: "Resume created" });
    console.log(savedResume);
    console.log(savedInUser);
    // res.json(savedResume);
  } catch (err) {
    // Improved error handling for validation errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({ message: messages });
    }

    // Log the error and send a generic server error message
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createResume = createResume;
// exports.getUser = getUser;
// exports.getName = getName;
