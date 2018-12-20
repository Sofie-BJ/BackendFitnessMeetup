"use strict";

var utils = require("../utils/writer.js");
var Sports = require("../service/SportsService");

module.exports.getAllSports = function getAllSports(req, res, next) {
  Sports.getAllSports()
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};
