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

      let newObj = {
        id: m.meetupId,
        title: m.title,
        description: m.description,
        location: location,
        date: m.date,
        owner: m.owner,
        sport: m.sport,
        participants: []
      };

      mets.set(m.meetupId, newObj);
    });
    if (participants) {
      participants.forEach(p => {
        let part = { id: p.userId, name: p.name, email: p.email };
        mets.get(p.meetupId).participants.push(part);
      });
    }
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
    var ownerorg = {
      id: owner.userId,
      name: owner.name,
      email: owner.email
    };

    let newObj = {
      id: meetup.meetupId,
      title: meetup.title,
      description: meetup.description,
      location: location,
      date: meetup.date,
      owner: ownerorg,
      sport: meetup.sport,
      participants: []
    };

    if (participants) {
      participants.forEach(p => {
        let part = { id: p.userId, name: p.name, email: p.email };
        newObj.participants.push(part);
      });
    }

    return newObj;
  });
};

exports.addMeetup = function(meetup) {
  return db.addMeetup(meetup).then(result => {
    return result.recordset[0];
  });
};

exports.addParticipant = function(id, user) {
  return db.addParticipant(id, user).then(result => {
    return result.recordset;
  });
};
