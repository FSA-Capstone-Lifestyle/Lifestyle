const Sequelize = require("sequelize");
const db = require("./database");

const Workout_Plan = db.define("Workout_Plan", {
  progress: {
    type: Sequelize.ENUM,
    values: ["To do", "In progress", "Completed"],
    defaultValue: "To do",
  },
  completions: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  skips: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  currentDay: {
    type: Sequelize.TEXT,
  },
});

module.exports = Workout_Plan;
