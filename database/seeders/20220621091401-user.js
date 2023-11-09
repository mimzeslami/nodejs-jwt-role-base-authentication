"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        firstName: "Demo",
        lastName: "Admin",
        dateOfBirth: "1997/01/01",
        password: await bcrypt.hash("123456", 10),
        phone: "09121234567",
        email: "admin@gmail.com",
        isVerified: 1,
        verificationCode: "123456",
        verificationCodeExpireTime: "2022-01-01",
        gender:'male',
        nationalCode:"4271107687"

      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
