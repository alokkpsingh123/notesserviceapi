const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) => {
  //existing User check
  //hashed password
  //user creation
  //token generate

  const { username, password, email } = req.body;
  try {
    //Checking existing User
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    //user creation
    const result = await userModel.create({
      email: email,
      password: hashedPassword,
      username: username,
    });

    //token generate
    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);

    res.status(201).json({ user: result, token: token });
    res.send("Sign up Done");
  } catch {
    (error) => {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
      res.send("Sign up Error");
    };
  }
};

const singin = async (req, res) => {
  const { email, password } = req.body;

  try {
    //Checking existing User
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    //credentials matching
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Credentails" });
    }

    //token generate
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY
    );
    res.status(200).json({ user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { signup, singin };
