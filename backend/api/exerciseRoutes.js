const router = require("express").Router();
const { Workout, Exercise } = require("../db");

// GET /api/exercises
router.get("/", async (req, res, next) => {
  try {
    const exercises = await Exercise.findAll();
    res.json(exercises);
  } catch (err) {
    next(err);
  }
});

// GET /api/exercises/:id
router.get("/:id", async (req, res, next) => {
  try {
    const exercise = await Exercise.findByPk(req.params.id);
    res.json(exercise);
  } catch (err) {
    next(err);
  }
});

// POST /api/exercises
router.post("/:id", async (req, res, next) => {
  try {
    const exercise = await Exercise.create(req.body);
    res.status(201).json(exercise);
  } catch (err) {
    next(err);
  }
});

// PUT /api/exercises/:id
router.put("/:id", async (req, res, next) => {
  try {
    const exercise = await Exercise.findOne({
      where: {
        id: req.params.id,
      },
      include: Workout,
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
