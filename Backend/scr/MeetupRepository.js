const db = require("../scr/databaseHandler");

exports.getUpcomingMeetups = function(offset, count, sport) {
  return Promise.all([
    db.getUpcomingMeetups(offset, count, sport),
    db.getPartipants(offset, count, sport),
    db.getOwners(offset, count, sport)
  ]).then(data => {
    let meetups = data[0].recordset;
    let participants = data[1].recordset;
    let owners = data[2].recordset;

    let mets = new Map();

    meetups.forEach(m => {
      var loc = m.location.split(":");
      let location = { lat: loc[0], lng: loc[1] };
      m.participants = [];
      mets.set(m.meetupId, m);
      mets.get(m.meetupId).location = location;
    });

    participants.forEach(p => {
      let part = { id: p.userId, name: p.name, email: p.email };
      mets.get(p.meetupId).participants.push(part);
    });

    owners.forEach(o => {
      let owner = { id: o.userId, name: o.name, email: o.email };
      mets.get(o.meetupId).owner = owner;
    });

    return Array.from(mets.values());
  });
};

exports.getMeetup = function(id) {
  return Promise.all([
    db.getMeetup(id),
    db.getOwner(id),
    db.getParticipantsForMeetup(id)
  ]).then(data => {
    let meetup = data[0].recordset[0];
    let owner = data[1].recordset[0];
    let participants = data[2].recordset;

    var loc = meetup.location.split(":");
    var location = { lat: loc[0], lng: loc[1] };

    var meets = new Map();
    meets.set(meetup.id, meetup);
    meets.location = location;
    meets.participants = [];
    var ownerorg = { id: owner.id, name: owner.name, email: owner.email };

    participants.forEach(element => {
      parts.push(element);
    });

    meets.owner = ownerorg;
    meets.participants = parts;
    console.log(meets);

    return meets;
  });
};

exports.addMeetup = function(meetup) {
  return db.addMeetup(meetup).then(result => {
    return result.recordset;
  });
};

exports.addParticipant = function(id, user) {
  return db.addParticipant(id, user).then(result => {
    return result.recordset;
  });
};
