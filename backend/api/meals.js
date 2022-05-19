const router = require("express").Router();
const Meal = require("../db/Meals");

// GET /api/meals
router.get("/", async (req, res, next) => {
  try {
    const meals = await Meal.findAll();
    res.json(meals);
  } catch (err) {
    next(err);
  }
});

// GET /api/meals/:id
router.get("/:id", async (req, res, next) => {
  try {
    const meal = await Meal.findByPk(req.params.id);
    res.json(meal);
  } catch (err) {
    next(err);
  }
});

// POST /api/meals
router.post("/", async (req, res, next) => {
  try {
    const meal = await Meal.create(req.body);
    res.status(201).json(meal);
  } catch (err) {
    next(err);
  }
});

// PUT /api/meals/:id
router.put("/:id", async (req, res, next) => {
  try {
    const mealUpdated = await Meal.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.send(await mealUpdated.update(req.body));
  } catch (err) {
    next(err);
  }
});

// DELETE /api/meals/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const mealDeleted = await Meal.findOne({
      where: {
        id: req.params.id,
      },
    });
    await mealDeleted.destroy();
    res.send(mealDeleted);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
