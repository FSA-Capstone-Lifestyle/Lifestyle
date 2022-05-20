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
    defaultValue: "None",
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
      "http://www.fremontgurdwara.org/wp-content/uploads/2020/06/no-image-icon-2.png",
  },
  calories: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Meal;
