const router = require("express").Router();
const { Workout, Exercise } = require("../db");

// GET /api/exercises
router.get("/:workoutId", async (req, res, next) => {
  try {
    const exercises = await Exercise.findAll({
      where: {
        workoutId: req.params.workoutId,
      },
    });
    res.json(exercises);
  } catch (err) {
    next(err);
  }
});

// GET /api/exercises/:id
router.get("/single/:id", async (req, res, next) => {
  try {
    const exercise = await Exercise.findByPk(req.params.id);
    res.json(exercise);
  } catch (err) {
    next(err);
  }
});

// POST /api/exercises
router.post("/", async (req, res, next) => {
  try {
    const exercise = await Exercise.create(req.body);
    res.status(201).json(exercise);
  } catch (err) {
    next(err);
  }
});

// PUT /api/exercises/:id
router.put("/single/:id", async (req, res, next) => {
  try {
    const exercise = await Exercise.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.send(await exercise.update(req.body));
  } catch (err) {
    next(err);
  }
});

// DELETE /api/exercises/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const exercise = await Exercise.findOne({
      where: {
        id: req.params.id,
      },
    });
    await exercise.destroy();
    res.send(exercise);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
