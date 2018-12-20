const sql = require("mssql");
const timestamp = require("time-stamp");

const config = {
  user: "FitnessMeetupAdmin",
  password: "W4s6K9B&x@U6Dhq",
  server: "fitnessmeetup.database.windows.net",
  database: "FitnessMeetupDB",
  options: {
    encrypt: true // Use this if you're on Windows Azure
  }
};

let pool;

async function connect() {
  try {
    pool = await sql.connect(config);
    console.log("connection is done");
  } catch (err) {
    console.log("something went wrong");
  }
}

connect();

//Meetups
exports.addMeetup = function(meetup) {
  var title = meetup.title;
  var description = meetup.description;
  var location = meetup.location;
  var date = timestamp("YYYY-MM-DD HH:mm:ss");
  var owner = meetup.owner;
  var ownerid = owner.id;
  var sport = meetup.sport;

  return pool
    .request()
    .input("title", sql.NVarChar, title)
    .input("description", sql.NVarChar, description)
    .input("location", sql.Char, location)
    .input("date", sql.NVarChar, date)
    .input("ownerid", sql.Int, ownerid)
    .input("sport", sql.NVarChar, sport)
    .query(
      "INSERT INTO Meetup VALUES (@title, @description, @location, @date, @ownerid, @sport)"
    )
    .then(res => {
      return res;
    });
};

exports.getMeetup = function(id) {
  return pool
    .request()
    .input("id", sql.NVarChar, id)
    .query("SELECT * FROM Meetup WHERE meetupId = @id")
    .then(res => {
      return res;
    });
};

exports.getOwner = function(id) {
  return pool
    .request()
    .input("id", sql.NVarChar, id)
    .query(
      "SELECT userId, name, email FROM [User] join Meetup on [User].userId = Meetup.owner where meetupId = @id"
    )
    .then(res => {
      return res;
    });
};

exports.getParticipantsForMeetup = function(id) {
  return pool
    .request()
    .input("id", sql.NVarChar, id)
    .query(
      "SELECT [User].userId, name, email, meetupId FROM [User] join Participant on [User].userId = Participant.userId where meetupId = @id"
    )
    .then(res => {
      return res;
    });
};

exports.getUpcomingMeetups = function(offset, count, sport) {
  var timesta = timestamp("YYYY-MM-DD HH:mm:ss");
  var query =
    "SELECT * FROM Meetup WHERE date > CONVERT(datetime, @time) ORDER BY date, meetupId offset @offset rows fetch next @count rows only";

  if (sport) {
    query =
      "SELECT * FROM Meetup WHERE sport = @sport AND date > CONVERT(datetime, @time) ORDER BY date, meetupId offset @offset rows fetch next @count rows only";
  }
  return pool
    .request()
    .input("offset", sql.Int, offset)
    .input("count", sql.Int, count)
    .input("sport", sql.NVarChar, sport)
    .input("time", sql.NVarChar, timesta)
    .query(query)
    .then(res => {
      return res;
    });
};

exports.getPartipants = function(offset, count, sport) {
  var timesta = timestamp("YYYY-MM-DD HH:mm:ss");
  return pool
    .request()
    .input("offset", sql.Int, offset)
    .input("count", sql.Int, count)
    .input("date", sql.NVarChar, timesta)
    .input("sport", sql.NVarChar, sport)
    .query(
      "SELECT [USER].userId, name, email, meetupId from [User] join Participant on [User].userId = Participant.userId where Participant.userId IS NOT NULL AND Participant.meetupId IN (SELECT Meetup.meetupId FROM Meetup WHERE sport = @sport and date > CONVERT(datetime, @date) ORDER BY meetupId offset @offset rows fetch next @count rows only)"
    )
    .then(res => {
      return res;
    });
};

exports.getOwners = function(offset, count, sport) {
  var timesta = timestamp("YYYY-MM-DD HH:mm:ss");
  return pool
    .request()
    .input("offset", sql.Int, offset)
    .input("count", sql.Int, count)
    .input("date", sql.NVarChar, timesta)
    .input("sport", sql.NVarChar, sport)
    .query(
      "SELECT userId, name, email, meetupId from [User] join Meetup on [User].userId = Meetup.owner where owner IN (SELECT owner FROM Meetup WHERE sport = @sport and date > CONVERT(datetime, @date) ORDER BY meetupId offset @offset rows fetch next @count rows only) and date > CONVERT(datetime, @date) and sport = @sport"
    )
    .then(res => {
      return res;
    });
};

//User
exports.getUser = function(uid) {
  return pool
    .request()
    .input("userid", sql.VarChar, uid)
    .query("SELECT * FROM [User] WHERE userId = @userid")
    .then(res => {
      return res;
    });
};

exports.addUser = function(user) {
  var id = user.id;
  var name = user.name;
  var email = user.email;

  return pool
    .request()
    .input("id", sql.VarChar, id)
    .input("name", sql.NVarChar, name)
    .input("email", sql.NVarChar, email)
    .query("INSERT INTO [User] VALUES (@id, @name, @email)")
    .then(res => {
      return res;
    });
};

exports.addParticipant = function(id, user) {
  var uid = user.id;

  return pool
    .request()
    .input("meetupId", sql.Int, id)
    .input("userId", sql.Int, uid)
    .query("INSERT INTO Participant VALUES (@meetupId, userId)")
    .then(res => {
      return res;
    });
};

//Sports
exports.getAllSports = function() {
  return pool
    .request()
    .query("SELECT name FROM Sport")
    .then(res => {
      return res;
    });
};
