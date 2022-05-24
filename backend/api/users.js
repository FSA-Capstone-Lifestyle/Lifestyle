const router = require("express").Router();
const { Workout, User, Workout_Plan, Meal } = require("../db");

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

router.get("/:id", async (req, res, next) => {
  try {
    // console.log(req.user.id);  see if you can get id from req.user
    const singleUser = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Meal }],
    });
    res.json(singleUser);
  } catch (error) {
    next(error);
  }
});

//Update User
router.put("/:id", async (req, res, next) => {
  try {
    console.log(req);
    if (req.body.id == req.params.id) {
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

//Fetch All User Workouts "/api/users/:id/workouts"
router.get("/:id/workouts", async (req, res, next) => {
  try {
    let userWorkouts = await User.findAll({
      where: {
        id: req.params.id,
      },
      include: {
        model: Workout,
      },
    });
    res.json(userWorkouts);
  } catch (error) {
    next(error);
  }
});

//Get User Workout
router.get("/:id/:workoutId", async (req, res, next) => {
  try {
    let userWorkout = await Workout_Plan.findOne({
      where: {
        userId: req.params.id,
        workoutId: req.params.workoutId,
      },
      // include: {
      //   model: Workout,
      // },
    });
    res.json(userWorkout);
  } catch (error) {
    next(error);
  }
});

//Completed User Workout
router.put("/:id/:workoutId/completed", async (req, res, next) => {
  try {
    const completions = req.body.completions + 1;
    await Workout_Plan.update(
      {
        completions: completions,
        currentDay: req.body.currentDay,
        progress: "To do",
      },
      {
        where: {
          userId: req.params.id,
          workoutId: req.params.workoutId,
        },
      }
    );
  } catch (error) {
    next(error);
  }
});

//Skipped User Workout
router.put("/:id/:workoutId/skipped", async (req, res, next) => {
  try {
    const skips = req.body.skips + 1;
    await Workout_Plan.update(
      { skips: skips, currentDay: req.body.currentDay },
      {
        where: {
          userId: req.params.id,
          workoutId: req.params.workoutId,
        },
      }
    );
    // const userWorkout = await Workout_Plan.findOne({
    //   where: {
    //     userId: req.params.id,
    //     workoutId: req.params.workoutId,
    //   },
    // });
    res.sendStatus(200);
    // res.send(userWorkout);
  } catch (error) {
    next(error);
  }
});

// PUT /api/users/:id/plan
router.post("/:id/plan", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.body.id,
      },
    });

    const workout = await Workout.findOne({
      where: {
        id: req.body.id,
      },
    });

    const plan = await WorkoutPlan.create({
      where: {
        userId: user.userId,
        workoutId: workout.workoutId,
      },
    });

    res.status(201).json(plan);
  } catch (err) {
    next(err);
  }
});

// Set meal to user
router.post("/:id/addMeal", async (req, res, next) => {
  try {
    console.log("this is user id", req.params.id);
    console.log("this is meal id", req.body);
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    const meal = await Meal.findOne({
      where: {
        id: req.body.mealId,
      },
    });

    await meal.setUser(user);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Set meal to user
router.post("/:id/removeMeal", async (req, res, next) => {
  try {
    console.log("this is user id", req.params.id);
    console.log("this is meal id", req.body);
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    const meal = await Meal.findOne({
      where: {
        id: req.body.mealId,
      },
    });

    await meal.removeUser(user);
    res.json(user);
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
