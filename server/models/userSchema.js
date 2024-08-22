const mongoose = require("mongoose");
const resumeSchema = require("./resumeSchema");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resumeSchema: [
    {
      type: Schema.Types.ObjectId,
      ref: "Resume",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
