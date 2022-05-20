const Sequelize = require("sequelize");
const db = require("./database");

const Diet = db.define("diet", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
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

module.exports = Diet;
