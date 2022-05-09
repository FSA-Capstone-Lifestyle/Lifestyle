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
  },
  sets: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Exercise;
