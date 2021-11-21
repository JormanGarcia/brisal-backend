const express = require("express");
const router = express.Router();
const Joi = require("joi");
const verifyToken = require("../middlewares/auth.middleware");
const usersService = require("../service/users.service");


router.get("/", async (req, res) => {
  try {
    const users = await usersService.findAll();
    return res.json(users);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await usersService.findById(req.params.id);
    return res.json(user);
  } catch (e) {
    return res.status(404).send(e);
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await usersService.deleteUser(req.params.id);
    return res.send("User Deleted");
  } catch (e) {
    return res.status(404).send(e);
  }
});

router.post("/", verifyToken, async (req, res) => {
  const Schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid("ADMIN", "USER"),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  });

  const { error, value } = Schema.validate(req.body);

  console.log(error);

  if (error) {
    return res.status(400).json(error);
  }

  const userExist = await usersService.findByUsername(value.username);


  if (userExist) {
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
    });
    return res.send("User Created");
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});

router.put("/update-password", verifyToken, async (req, res) => {
  const Schema = Joi.object({
    newPassword: Joi.string().min(8).required(),
    _id: Joi.string().required(),
  });

  const { error, value } = Schema.validate(req.body);

  if (error) {
    return res.status(400).json(error);
  }

  try {
    await usersService.updatePassword(value);
    return res.send("Password Updated");
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});

router.put("/:_id", verifyToken, async (req, res) => {
  const Schema = Joi.object({
    username: Joi.string(),
    name: Joi.object({
      first: Joi.string(),
      last: Joi.string(),
    }),
  });

  const { error, value } = Schema.validate(req.body);

  if (error) {
    return res.status(400).json(error);
  }

  try {
    await usersService.update(req.params._id, value);
    return res.send("User Updated");
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});

module.exports = router;
