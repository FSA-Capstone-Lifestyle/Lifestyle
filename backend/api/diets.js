const router = require("express").Router();
const Diet = require("../db/Diets");
const Meal = require("../db/Meals");

// const requireToken = async (req, res, next) => {
//     try {
//       const userData = await User.findByToken(req.headers.authorization);
//       req.user = userData;
//       next();
//     } catch (error) {
//       next(error);
//     }
// };

// GET /api/diets
router.get("/", async (req, res, next) => {
  try {
    const diets = await Diet.findAll();
    res.json(diets);
  } catch (err) {
    next(err);
  }
});

// GET /api/diets/:id
router.get("/:id", async (req, res, next) => {
  try {
    const diet = await Diet.findByPk(req.params.id, {
      include: Meal,
    });
    res.json(diet);
  } catch (err) {
    next(err);
  }
});

// POST /api/diets
router.post("/", async (req, res, next) => {
  try {
    const diet = await Diet.create(req.body);
    res.status(201).json(diet);
  } catch (err) {
    next(err);
  }
});

// PUT /api/diets/:id
router.put("/:id", async (req, res, next) => {
  try {
    const dietUpdated = await Diet.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.send(await dietUpdated.update(req.body));
  } catch (err) {
    next(err);
  }
});

// DELETE /api/diets/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const dietDeleted = await Diet.findOne({
      where: {
        id: req.params.id,
      },
    });
    await dietDeleted.destroy();
    res.send(dietDeleted);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
