"use strict";

var utils = require("../utils/writer.js");
var Meetups = require("../service/MeetupsService");

module.exports.addMeetup = function addMeetup(req, res, next) {
  var meetup = req.swagger.params["meetup"].value;
  Meetups.addMeetup(meetup)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.addParticipant = function addParticipant(req, res, next) {
  var id = req.swagger.params["id"].value;
  var user = req.swagger.params["user"].value;
  Meetups.addParticipant(id, user)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.getMeetup = function getMeetup(req, res, next) {
  var id = req.swagger.params["id"].value;
  Meetups.getMeetup(id)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUpcomingMeetUps = function getUpcomingMeetUps(
  req,
  res,
  next
) {
  var offset = req.swagger.params["offset"].value;
  var count = req.swagger.params["count"].value;
  var sport = req.swagger.params["sport"].value;
  Meetups.getUpcomingMeetUps(offset, count, sport)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};
