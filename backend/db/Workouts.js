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
  daysOfWeek: {
    type: Sequelize.ENUM,
    values: ["Mon, Wed, Fri", "All", "Tue, Thur"],
    defaultValue: "All",
  },
});

module.exports = Workout;
