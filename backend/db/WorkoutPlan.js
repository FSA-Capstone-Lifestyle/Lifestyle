const Sequelize = require("sequelize");
const db = require("./database");

const WorkoutPlan = db.define("workoutPlan", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = WorkoutPlan;
