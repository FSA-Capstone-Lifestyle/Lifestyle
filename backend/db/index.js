const db = require("./database");
const User = require("./Users");
const Workout = require("./Workouts");
const Exercise = require("./Exercises");

User.belongsToMany(Workout, { through: "workout_plan" });
Workout.belongsToMany(User, { through: "workout_plan" });

Workout.hasMany(Exercise);
Exercise.belongsTo(Workout);

module.exports = {
  db,
  User,
  Workout,
  Exercise,
};
