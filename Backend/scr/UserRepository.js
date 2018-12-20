const db = require("../scr/databaseHandler");

exports.getUser = function(uid) {
  return db.getUser(uid).then(result => {
    return result.recordset[0];
  });
};

exports.addUser = function(user) {
  return db.addUser(user).then(result => {
    return result;
  });
};
