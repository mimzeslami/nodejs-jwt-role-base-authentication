'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role , {through:'UserRole' , foreignKey:'userId'})
      this.hasMany(models.UserRole , {foreignKey:'userId'})
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    gender: DataTypes.STRING,
    nationalCode: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    isVerified:DataTypes.INTEGER,
    verificationCode:DataTypes.STRING,
    verificationCodeExpireTime:DataTypes.DATE,
    password: DataTypes.STRING,

  }, {
    sequelize,
    paranoid:true,
    modelName: 'User',
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
    }

  });
  return User;
};
const hashPassword = async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);

  }
  return user;
}
