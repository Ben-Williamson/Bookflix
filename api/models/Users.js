const { Sequelize, DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');


const sequelize = new Sequelize('HamsterTracker', 'root', 'Gjba1976', {
  host: 'hamster_db',
  dialect: "mysql"
});

class User extends Model {}

User.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  surname: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  username: {
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    set(value) {
      this.setDataValue('password', bcrypt.hashSync(value, 10));
    }
  }
}, {
  sequelize,
  modelName: 'User'
});

User.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}