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
});

module.exports = Workout;
