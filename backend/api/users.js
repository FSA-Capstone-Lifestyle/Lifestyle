const router = require("express").Router();
const { Workout_Plan, Workout } = require("../db");
const User = require("../db/Users");

const requireToken = async (req, res, next) => {
  try {
    const userData = await User.findByToken(req.headers.authorization);
    req.user = userData;
    next();
  } catch (error) {
    next(error);
  }
};

// Only accessible to admins
router.get("/", requireToken, async (req, res, next) => {
  try {
    if (req.user.dataValues.isAdmin) {
      const users = await User.findAll({
        // Only grab these specific attributes
        attributes: ["firstName", "lastName", "email", "image"],
      });
      res.json(users);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", requireToken, async (req, res, next) => {
  try {
    console.log(req.user.id); // see if you can get id from req.user
    if (req.user.id == req.params.id || req.user.dataValues.isAdmin) {
      const singleUser = await User.findOne({
        where: {
          id: req.params.id,
        },
        attributes: ["firstName", "lastName", "email", "image"],
      });
      res.json(singleUser);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
});

//Update User
router.put("/:id", requireToken, async (req, res, next) => {
  try {
    if (req.user.id == req.params.id) {
      await User.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
});

//Fetch All User Workouts "/api/user/:id/workouts"
router.get("/:id/workouts", requireToken, async (req, res, next) => {
  try {
    let workouts = await Workout_Plan.findAll({
      where: {
        userId: req.params.id,
      },
      include: {
        model: workouts,
      },
    });
    res.send(workouts);
  } catch (error) {
    next(error);
  }
});

//Get User Workout
router.get("/:id/:workoutId", async (req, res, next) => {
  try {
    let workout = await Workout_Plan.findOne({
      where: {
        userId: req.params.id,
        workoutId: req.params.workoutId,
      },
    });
    res.send(workout);
  } catch (error) {
    next(error);
  }
});

//Completed User Workout
router.put("/:id/:workoutId/completed", async (req, res, next) => {
  try {
    let workout = await Workout_Plan.findOne({
      where: {
        userId: req.params.id,
        workoutId: req.params.workoutId,
      },
    });
    await workout.update({
      progress: "To Do",
      completions: req.body.completions,
    });
  } catch (error) {
    next(error);
  }
});

//Skipped User Workout
router.put("/:id/:workoutId/skipped", async (req, res, next) => {
  try {
    let workout = await Workout_Plan.findOne({
      where: {
        userId: req.params.id,
        workoutId: req.params.workoutId,
      },
    });
    await workout.update({
      progress: "To Do",
      skips: req.body.skips,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", requireToken, async (req, res, next) => {
  try {
    if (req.user.id == req.params.id || req.user.dataValues.isAdmin) {
      const deleteUser = await User.findByPk(req.parmas.id);
      deleteUser.destroy();
      res.sendStatus(deleteUser);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
