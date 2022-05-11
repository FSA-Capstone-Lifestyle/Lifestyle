const Sequelize = require("sequelize");
const db = require("./database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = db.define("user", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  image: {
    type: Sequelize.STRING,
    defaultValue:
      "https://i1.wp.com/suiteplugins.com/wp-content/uploads/2019/10/blank-avatar.jpg?ssl=1",
  },

  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

User.beforeCreate((user, option) => {
  const hash = bcrypt.hashSync(user.getDataValue("password"), 5);
  user.setDataValue("password", hash);
});

User.findByToken = async (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(payload.userId);
    if (user) {
      return user;
    }
    const error = Error("bad credentials");
    error.status = 401;
    throw error;
  } catch (ex) {
    const error = Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

User.authenticate = async ({ email, password }) => {
  const hash = await User.findOne({
    where: {
      email,
    },
  });

  const user = await User.findOne({
    where: {
      email,
      password: bcrypt.compare(password, hash.password) ? hash.password : null,
    },
  });
  if (user) {
    return jwt.sign({ userId: user.id }, process.env.JWT);
  }
  const error = Error("bad credentials");
  error.status = 401;
  throw error;
};

module.exports = User;
