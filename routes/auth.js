const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const { registerValidation, loginValidation } = require("../config/validation");

function result(succ, msg, details) {
  if (details) {
    return {
      success: succ,
      message: msg,
      data: details,
    };
  } else {
    return {
      success: succ,
      message: msg,
    };
  }
}

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(200).json(result(0, error.details[0].message));

  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist)
    return res.status(200).json(result(0, "Username already exists!"));

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    password: hashPassword
  });

  try {
    const saveUser = await user.save();
    res.status(200).json(result(1, "Register User Success!", saveUser));
  } catch (error) {
    res.status(200).json(result(0, "Register User Failed"));
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(200).json(result(0, error.details[0].message));

  const user = await User.findOne({ username: req.body.username });
  if (!user)
    return res.status(200).json(result(0, "Your username is not registered!"));

  const validPwd = await bcrypt.compare(req.body.password, user.password);
  if (!validPwd)
    return res.status(200).json(result(0, "Your password is wrong!"));

  return res.status(200).json(result(1, "Login user success!", user));
});

module.exports = router;
