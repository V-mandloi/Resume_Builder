const express = require("express");
const bodyParser = require("body-parser");
const resumeApi = require("./routes/resumeApi");
const userApi = require("./routes/userApi");
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Msg is render");
});

// app.post("/login", userApi.userLogin);

app.post("/register", userApi.userRegister);

app.get("/login", userApi.getUser);

app.get("/resumelisting/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.send(id);
});

app.post("/resumelisting/:id/resume", resumeApi.createResume);

app.get("/resumelisting/:userId/resume/:resumeId", resumeApi.findResumeWithId);

// delete api
app.delete("/resumelisting/:id/resume/:resumeId", resumeApi.deleteResume);

app.get("/resumelisting/:id/createresume", (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.render("createresume", { id });
});

app.get("/resumelisting/:id/getresume", resumeApi.getResume);

app.get("/resumelisting/:id/profile", userApi.getUserById);

app.listen(8080, (req, res) => {
  console.log("server is running at 8080");
});
