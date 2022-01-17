const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
require("./config/config");
const User = require("./model/user");
// const crud = require('./routes/index')
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

app.post("/sign-up", async (req, res, next) => {
  try {
    const { username, password, qualification, city, phone, email } = req.body;
    if (!(username && password && qualification && city && phone && email)) {
      res.status(400).send("All input is required");
    }

    encryptedPassword = bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password,
      qualification,
      city,
      phone,
      email,
    });

    const token = jwt.sign({ user_id: user._id, email }, "my_secret_key", {
      expiresIn: "2h",
    });
    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({ username });
    console.log(user);

    if (user && password == user.password) {
      const token = jwt.sign({ user_id: user._id, username }, "my_secret_key", {
        expiresIn: "2h",
      });

      user.token = token;
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

app.get("/home", auth, async (req, res) => {
  const users = new User(req.body);
  User.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put("/logout", auth, function (req, res) {
  const authHeader = req.headers["x-access-token"];
  jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      res.send({ msg: "You have been Logged Out" });
    } else {
      res.send({ msg: "Error" });
    }
  });
});

app.listen(3000, () => {
  console.log("App listen on port 3000");
});

