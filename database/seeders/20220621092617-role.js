"use strict";
const models = require("../../models");

const User = models.User;
const Role = models.Role;
const UserRole = models.UserRole;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Roles", [
      {
        title: "Admin",
      },
      {
        title: "Member",
      },
    ]);
    await queryInterface.bulkInsert("UserRoles", [
      {
        userId: 1,
        roleId: 1,
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Roles", null, {});
    await queryInterface.bulkDelete("UserRole", null, {});
  },
};
