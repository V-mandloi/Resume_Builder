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
      objective,
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
      !objective ||
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
      religion,
      nationality,
      maritalStatus,
      hobbies,
      language,
      address,
      objective,
      experiences,
      education,
      skills,
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

const getResume = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await User.findById(id);
    if (result) {
      res.json(result);
      // console.log(result);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const findResumeWithId = async (req, res) => {
  console.log("enter findResumeWithId");
  const resumeId = req.params.resumeId;
  console.log(resumeId);
  try {
    const resume = await Resume.findById(resumeId);
    console.log(resume);

    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    res.json(resume);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteResume = async (req, res) => {
  const id = req.params.id;
  const resumeId = req.params.resumeId;
  await Resume.deleteOne({ _id: resumeId });
  res.json({ message: "Resume deleted successfully" });
};

exports.createResume = createResume;
exports.getResume = getResume;
exports.findResumeWithId = findResumeWithId;
exports.deleteResume = deleteResume;
