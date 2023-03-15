const { Router } = require("express");
const dishes = Router();
const { CreateDishes } = require("../controllers/dishes/PostDishes");
const { GetDishes } = require("../controllers/dishes/GetDishes")

dishes.get("/getDishes", async (req, res) => {
  try {
    const data = await GetDishes();
    res.status(200).send(data);
  } catch (error) {
    res.status("400").send(error.message);
  }
});

dishes.post("/postDishes", async (req, res) => {
  try {
    const { name, description, price, availability, nationality } = req.body;
    const dishes = await CreateDishes(name, description, price, availability, nationality);
    res.status(200).send(dishes);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = { dishes };