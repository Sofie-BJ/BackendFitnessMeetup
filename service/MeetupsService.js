"use strict";
const meetuprepository = require("../scr/MeetupRepository");

/**
 * Add a new meetup to the database
 *
 * meetup Meetup
 * no response value expected for this operation
 **/
exports.addMeetup = function(meetup) {
  return meetuprepository.addMeetup(meetup);
};

/**
 * Adds a participant to a specific meetup
 *
 * id Integer The unique identifier for the specific meetup
 * user User the user to add
 * no response value expected for this operation
 **/
exports.addParticipant = function(id, user) {
  return meetuprepository.addParticipant(id, user);
};

/**
 * Get information about the meetup with the specified id
 *
 * id Integer The unique identifier of the meetup to retrieve
 * returns List
 **/
exports.getMeetup = function(id) {
  return meetuprepository.getMeetup(id);
};

/**
 * Get a list of upcoming meetups using paging.
 * By default, thuis returns the next 25 upcoming meetups, and does not skip any.
 *
 * offset Integer How many meetups to skip from the first upcoming meetup (optional)
 * count Integer How many meetups to retrieve (optional)
 * sport String The type of sport to filter meetups by. This filter is not used if not specified. (optional)
 * returns List
 **/
exports.getUpcomingMeetUps = function(offset, count, sport) {
  return meetuprepository.getUpcomingMeetups(offset, count, sport);
};
