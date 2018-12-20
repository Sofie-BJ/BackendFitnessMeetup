"use strict";
const userrepository = require("../scr/UserRepository");

/**
 * Add a new user to the database
 *
 * user User The user to be added
 * returns User
 **/
exports.addUser = function(user) {
  return userrepository.addUser(user);
};

/**
 * Get the user by ID
 *
 * uid String The unique id of the user to retrieve
 * returns User
 **/
exports.getUser = function(uid) {
  return userrepository.getUser(uid);
};
