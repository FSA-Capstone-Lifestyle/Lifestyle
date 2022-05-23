const router = require("express").Router();
const { Workout, Exercise, User } = require("../db");

// GET /api/workouts
router.get("/", async (req, res, next) => {
  try {
    const workouts = await Workout.findAll({ include: Exercise });
    res.json(workouts);
  } catch (err) {
    next(err);
  }
});

// GET /api/workouts/:id
router.get("/:id", async (req, res, next) => {
  try {
    const workout = await Workout.findOne({
      where: {
        id: req.params.id,
      },
      include: Exercise,
    });
    res.json(workout);
  } catch (err) {
    next(err);
  }
});

// POST /api/workouts/:userId
router.post("/:userId", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId,
      },
    });
    const workout = await Workout.create(req.body);
    await workout.setAthlete(user);
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
      include: Exercise,
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
