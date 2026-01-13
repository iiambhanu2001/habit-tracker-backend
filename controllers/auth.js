const User = require("../models/user");

const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fileds require" });
    }
    const userexist = await User.findOne({ email });
    if (userexist) {
      return res.status(401).json({ message: "User already exist" });
    }
    const hashedpass = await bycrypt.hash(password, 10);
    const usercreate = await User.create({
      name,
      email,
      password: hashedpass,
    });
    res.status(201).json({
      _id: usercreate._id,
      name: usercreate.name,
      email: usercreate.email,
    });
  } catch (error) {
    console.log(error.getmessage);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    const ismatch = await bycrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(401).json({ message: "Try again, something is wrong" });
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,

      { expiresIn: "7d" }
    );
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};


module.exports={signup,login}