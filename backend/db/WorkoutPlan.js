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
    defaultValue: 0,
  },
  skips: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Workout_Plan;
