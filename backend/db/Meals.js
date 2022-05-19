const Sequelize = require("sequelize");
const db = require("./database");

const Meal = db.define("meal", {
  mealType: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  ingredients: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  instructions: {
    type: Sequelize.STRING,
  },
  prepTime: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.kzI1EUFN1_qi7eISbXDekgHaHK%26pid%3DApi&f=1",
  },
  calories: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Meal;
