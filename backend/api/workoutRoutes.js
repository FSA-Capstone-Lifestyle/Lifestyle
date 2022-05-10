const router = require("express").Router();
const Workout = require("../db/Workouts");

// GET /api/workouts
router.get("/", async (req, res, next) => {
  try {
    const workouts = await Workout.findAll();
    res.json(workouts);
  } catch (err) {
    next(err);
  }
});

// GET /api/workouts/:id
router.get("/:id", async (req, res, next) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
    res.json(workout);
  } catch (err) {
    next(err);
  }
});

// POST /api/workouts
router.post("/:id", async (req, res, next) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (err) {
    next(err);
  }
});

// PUT /api/workouts/:id
router.put("/:id", async (req, res, next) => {
  try {
    const workout = await Workout.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.send(await workout.update(req.body));
  } catch (err) {
    next(err);
  }
});

// DELETE /api/workouts/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const workout = await Workout.findOne({
      where: {
        id: req.params.id,
      },
    });
    await workout.destroy();
    res.send(workout);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
