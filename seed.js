const { db } = require("./backend/db");
const User = require("./backend/db/Users");
const Workout = require("./backend/db/Workouts");

const users = require("./backend/data/users");
const workouts = require("./backend/data/workouts");

const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(
      users.map((user) => {
        return User.create(user);
      })
    );

    await Promise.all(
      workouts.map((workout) => {
        return Workout.create(workout);
      })
    );
    console.log("Seeding Successful!");
  } catch (err) {
    console.log(err);
  }
};

module.exports = seed;

// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log("Seeding success!");
      db.close();
    })
    .catch((err) => {
      console.error("Oh noes! Something went wrong!");
      console.error(err);
      db.close();
    });
}
