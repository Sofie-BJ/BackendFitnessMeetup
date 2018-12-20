"use strict";

const sportsrepository = require("../scr/SportsRepository");

/**
 * Get the sports categories that are supported by the server
 *
 * returns List
 **/
exports.getAllSports = function() {
  return sportsrepository.getAllSports();
};
