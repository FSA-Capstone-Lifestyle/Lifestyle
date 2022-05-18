const db = require("./database");
const User = require("./Users");
const Workout = require("./Workouts");
const Exercise = require("./Exercises");
const Diet = require("./Diets");
const Meal = require("./Meals");
const Sequelize = require("sequelize");

const Workout_Plan = db.define("Workout_Plan", {
  progress: {
    type: Sequelize.ENUM,
    values: ["To do", "In progress", "Completed"],
    defaultValue: "To do",
  },
  completions: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  skips: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

User.belongsToMany(Workout, { through: "Workout_Plan" });
Workout.belongsToMany(User, { through: "Workout_Plan" });

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
  Workout_Plan,
};
