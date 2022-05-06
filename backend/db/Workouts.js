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
  exercises: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    defaultValue: [],
  },
});

module.exports = Workout;
