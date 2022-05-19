const db = require("./database");
const User = require("./Users");
const Workout_Plan = require("./WorkoutPlan");
const Workout = require("./Workouts");
const Exercise = require("./Exercises");

User.belongsToMany(Workout, { through: Workout_Plan });
//this should give workout method .setAthlete
Workout.belongsToMany(User, { through: Workout_Plan, as: "athlete" });

Workout.hasMany(Exercise);
Exercise.belongsTo(Workout);

module.exports = {
  db,
  User,
  Workout,
  Exercise,
  Workout_Plan,
};
