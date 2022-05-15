const db = require("./database");
const User = require("./Users");
const Workout = require("./Workouts");
const Exercise = require("./Exercises");
const Diet = require("./Diets");
const Meal = require("./Meals");

User.belongsToMany(Workout, { through: "workout_plan" });
Workout.belongsToMany(User, { through: "workout_plan" });

Workout.hasMany(Exercise);
Exercise.belongsTo(Workout);

User.belongsToMany(Diet, { through: "diet_plan" });
Diet.belongsToMany(User, { through: "diet_plan" });

Diet.hasMany(Meal);
Meal.belongsTo(Diet);

module.exports = {
  db,
  User,
  Workout,
  Exercise,
  Diet,
  Meal,
};
