const db = require("./database");
const User = require("./Users");
const Workout = require("./Workouts");

User.belongsToMany(Workout, { through: "workout_plan" });
Workout.belongsTo(User, { through: "workout_plan" });
module.exports = {
  db,
  User,
  Workout,
};
