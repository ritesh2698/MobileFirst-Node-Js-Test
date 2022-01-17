const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
require("./config/config");
const User = require("./model/user");
const crud = require('./routes/index')
const cors = require('cors')

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }))

var corsOptions = {
  origin: '*',
}

app.use(cors(corsOptions))

app.get("/", (req, res) => {
  res.status(200).send("Hello world!!");
});

app.use('/api', crud)

app.listen(3000, () => {
  console.log("App listen on port 3000");
});

module.exports = app
