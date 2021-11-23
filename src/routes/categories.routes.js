const express = require("express");
const router = express.Router();
const Joi = require("joi");
const verifyToken = require("../middlewares/auth.middleware");
const categoriesService = require("../service/categories.service");

router.get("/", async (req, res) => {
  try {
    const category = await categoriesService.findAll();
    return res.json(category);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await categoriesService.findById(req.params.id);
    return res.json(category);
  } catch (e) {
    return res.status(404).send(e);
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await categoriesService.delete(req.params.id);
    return res.send("Category Deleted");
  } catch (e) {
    return res.status(404).send(e);
  }
});

router.put("/:id", [verifyToken], async (req, res) => {
  const Schema = Joi.object({
    name: Joi.string().required(),
  });

  const { error, value } = Schema.validate(req.body);

  if (error) {
    return res.status(400).json(error);
  }

  try {
    await categoriesService.update(req.params.id, value);

    return res.send("Category Updated");
  } catch (e) {
    return res.status(404).send(e);
  }
});

router.post("/", [verifyToken], async (req, res) => {
  const Schema = Joi.object({
    name: Joi.string().required(),
  });

  const { error, value } = Schema.validate(req.body);

  if (error) {
    return res.status(400).json(error);
  }

  try {

    await categoriesService.create(value );
    return res.send("Category Created");
  } catch (e) {
    console.log(e);
    return res.status(500).send("Something went wrong");
  }
});

module.exports = router;
