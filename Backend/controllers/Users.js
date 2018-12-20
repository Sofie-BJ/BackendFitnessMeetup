'use strict';

var utils = require('../utils/writer.js');
var Users = require('../service/UsersService');

module.exports.addUser = function addUser (req, res, next) {
  var user = req.swagger.params['user'].value;
  Users.addUser(user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUser = function getUser (req, res, next) {
  var uid = req.swagger.params['uid'].value;
  Users.getUser(uid)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
