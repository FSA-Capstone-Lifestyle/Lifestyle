const router = require("express").Router();
const { Workout, User, WorkoutPlan } = require("../db");

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

router.put(":/id", requireToken, async (req, res, next) => {
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

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
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
