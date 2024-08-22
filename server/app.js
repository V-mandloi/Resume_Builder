const express = require("express");
// const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const resumeApi = require("./routes/resumeApi");
const userApi = require("./routes/userApi");
const app = express();

// Database connection
// mongoose
//   .connect("mongodb+srv://vikram:vikram@cluster0.1ynh0iq.mongodb.net/Main")
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error", err);
//   });

// const express = require("express");
// const mongoose = require("mongoose");
// const http = require("http").Server(app);
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

// // const DB =
// //   "mongodb+srv://vikram:vikram@123@cluster0.1ynh0iq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // app.get("/", (req, res) => {
// //   res.send("Msg is render");
// // });

app.get("/", (req, res) => {
  res.send("Msg is render");
});

// // server.js (continued)
// app.get("/api/data", (req, res) => {
//   const data = { message: "Hello from Node!" };
//   res.json(data);
// });

// app.post("/login", userApi.userLogin);

app.post("/register", userApi.userRegister);

app.get("/login", userApi.getUser);

app.get("/resumelisting/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.send(id);
});

app.post("/resumelisting/:id/resume", resumeApi.createResume);

app.get("/resumelisting/:id/createresume", (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.render("createresume", { id });
});

app.get("/resumelisting/:id/profile", userApi.getUserById);

// app.post("/product", (req, res) => {
//   if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
//     res.status(400).send({ message: "Bad Request" });
//     return;
//   }
//   mongoPractice.createProduct(req, res).catch((err) => {
//     console.error(err);
//     res.status(500).send({ message: "Internal Server Error" });
//   });
// });

// app.get("/resume", mongoPractice.getUser);

app.listen(8080, (req, res) => {
  console.log("server is running at 8080");
});
