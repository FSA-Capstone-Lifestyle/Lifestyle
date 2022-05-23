const Sequelize = require("sequelize");
const db = require("./database");

const Exercise = db.define("exercise", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  reps: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  sets: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  isCompleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Exercise;
