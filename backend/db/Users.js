require("dotenv").config();
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

User.prototype.generateToken = function () {
  return jwt.sign({ userId: this.id }, process.env.JWT);
};

User.findByToken = async (token) => {
  try {
    console.log(token);
    const { userId } = await jwt.verify(token, process.env.JWT);

    const user = await User.findByPk(userId);
    if (user) {
      return user;
    }
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

  if (!hash) {
    const error = Error("bad credentials email");
    error.status = 401;
    throw error;
  } else {
    const user = await User.findOne({
      where: {
        password: (await bcrypt.compare(password, hash.password))
          ? hash.password
          : null,
      },
    });
    if (user) {
      return jwt.sign(
        { userId: user.id, userEmail: user.email },
        process.env.JWT
      );
    } else {
      const error = Error("bad credentials password");
      error.status = 401;

      throw error;
    }
  }
};

module.exports = User;
