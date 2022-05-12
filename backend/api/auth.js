const router = require("express").Router();
const User = require("../db/Users");

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

router.post("/signin", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (error) {
    next(error);
  }
});

// if a guest signs up while having items in their cart, update that here
router.post("/signup", async (req, res, next) => {
  try {
    const { firstName, lastName, password, email } = req.body;
    // const user = await User.create(req.body);
    // role is default customer ;)
    // query database, findall where role guest
    const user = await User.create({ firstName, lastName, password, email });
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

module.exports = router;
