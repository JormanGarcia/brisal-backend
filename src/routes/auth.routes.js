const express = require("express");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const hash = require("../utils/hash");
const ENV = require("../config/env");

const usersService = require("../service/users.service");

router.post("/login", async (req, res) => {
  const Schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error, value } = Schema.validate(req.body);

  if (error) {
    return res.status(400).json(error);
  }

  try {
    const user = await usersService.findByUsername(value.username);

    if (!user) {
      return res.status(404).json("Username does not exist");
    }

    const isPasswordTrue = await hash.compare(value.password, user.password);

    if (!isPasswordTrue) {
      return res.status(400).json("Incorrect Password");
    }

    const token = jwt.sign({ user: user._id }, ENV.tokenKey, {
      expiresIn: "10h",
    });

    return res.json({
      user,
      token,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
});

router.post("/signup", async (req, res) => {
  const Schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(8).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  });

  const { error, value } = Schema.validate(req.body);

  console.log(error);

  if (error) {
    return res.status(400).json(error);
  }

  const userExist = await usersService.findByUsername(value.username);

  console.log(userExist);

  if (userExist.length !== 0) {
    return res.status(500).send("Username is not available");
  }

  try {
    const { firstName, lastName, ...rest } = value;
    await usersService.createUser({
      name: {
        first: firstName,
        last: lastName,
      },
      ...rest,
      role: "USER",
    });
    return res.send("User Created");
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});

module.exports = router;
