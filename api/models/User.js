const { Sequelize, DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes){
  var User = sequelize.define("User", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING,
      
      validate: {
        notEmpty: {msg: "First Name is required."}
      }
      
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Surname is required."}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg: "There is already an account with that email address."},
      validate: {
        notEmpty: {msg: "Email is required."},
        isEmail: {msg: "Incorrect email."}
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg: "That username is taken."},
      validate: {
        notEmpty: {msg: "Username is required."}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {args: [6, 20], msg: "Password must be between 6 and 20 characters."},
      }
    }
  }, 
  {
    hooks: {
      beforeCreate: async (user) =>
        (user.password = await bcrypt.hash(user.password, 10)),
    },
    sequelize,
    modelName: 'User'
  });

  User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  }
  return User;
}