const db = require("./database");
const User = require("./Users");
const Workout = require("./Workouts");
const Exercise = require("./Exercises");

Workout.belongsToMany(User, { through: "workout_plan" });
User.belongsToMany(Workout, { through: "workout_plan" });

Workout.hasMany(Exercise);
Exercise.belongsTo(Workout);

module.exports = {
  db,
  User,
  Workout,
  Exercise,
};
