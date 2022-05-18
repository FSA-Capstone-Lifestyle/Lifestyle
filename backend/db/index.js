const db = require("./database");
const User = require("./Users");
const WorkoutPlan = require("./WorkoutPlan");
const Workout = require("./Workouts");
const Exercise = require("./Exercises");
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
//this should give workout method .setAthlete
Workout.belongsToMany(User, { through: "Workout_Plan", as: "athlete" });

Workout.hasMany(Exercise);
Exercise.belongsTo(Workout);

module.exports = {
  db,
  User,
  WorkoutPlan,
  Workout,
  Exercise,
  Workout_Plan,
};
