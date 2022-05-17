const Sequelize = require("sequelize");
const db = require("./database");

const Workout = db.define("workout", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  progress: {
    type: Sequelize.ENUM,
    values: ["To do", "In progress", "Completed"],
    defaultValue: "To do",
  },
  daysOfWeek: {
    type: Sequelize.ENUM,
    values: ["Mon, Wed, Fri", "All", "Tue, Thur"],
    defaultValue: "All",
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

module.exports = Workout;
