const db = require("./database");
const User = require("./Users");
const Workout_Plan = require("./WorkoutPlan");
const Workout = require("./Workouts");
const Exercise = require("./Exercises");
const Diet = require("./Diets");
const Meal = require("./Meals");

User.belongsToMany(Workout, { through: Workout_Plan });
//this should give workout method .setAthlete
Workout.belongsToMany(User, { through: Workout_Plan, as: "athlete" });

Workout.hasMany(Exercise);
Exercise.belongsTo(Workout);

User.belongsToMany(Meal, { through: "Diet_Plan" });
Meal.belongsToMany(User, { through: "Diet_Plan", as: "user" });

//Diet.hasMany(Meal);
//Meal.belongsTo(Diet);

module.exports = {
  db,
  User,
  Workout,
  Exercise,
  Diet,
  Meal,
  Workout_Plan,
};
