const express = require("express");
const router = express.Router();
const Joi = require("joi");
const verifyToken = require("../middlewares/auth.middleware");
const dishesService = require("../service/dishes.service ");
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,path.join(__dirname,'../../Uploads'))
  },
  filename: (req, file, cb)  => {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
  } 
})

const upload = multer({storage})


router.get("/", async (req, res) => {
  try {
    const dishes = await dishesService.findAll();
    return res.json(dishes);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const dish = await dishesService.findById(req.params.id);
    return res.json(dish);
  } catch (e) {
    return res.status(404).send(e);
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await dishesService.deleteDish(req.params.id);
    return res.send("Dish Deleted");
  } catch (e) {
    return res.status(404).send(e);
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  const Schema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    category: Joi.string(),
    price: Joi.number(),
  });

  const { error, value } = Schema.validate(req.body);

  if (error) {
    return res.status(400).json(error);
  }

  try {
    await dishesService.updateDish(req.params.id, value);
    return res.send("Dish Updated");
  } catch (e) {
    return res.status(404).send(e);
  }
});

router.post("/", [verifyToken,upload.single("image")], async (req, res) => {
  const Schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().required(),
  });

  const { error, value } = Schema.validate(req.body);


  if (error) {
    return res.status(400).json(error);
  }

  try {
    await dishesService.createDish({...value, photos: [req.file.filename]});
    return res.send("Dish Created");
  } catch (e) {
    console.log(e);
    return res.status(500).send("Something went wrong");
  }
});

module.exports = router;
