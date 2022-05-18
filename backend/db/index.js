const db = require("./database");
const User = require("./Users");
const WorkoutPlan = require("./WorkoutPlan");
const Workout = require("./Workouts");
const Exercise = require("./Exercises");

User.belongsToMany(Workout, { through: WorkoutPlan });
Workout.belongsToMany(User, { through: WorkoutPlan });

Workout.hasMany(Exercise);
Exercise.belongsTo(Workout);

module.exports = {
  db,
  User,
  WorkoutPlan,
  Workout,
  Exercise,
};
