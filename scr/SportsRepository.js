const db = require("../scr/databaseHandler");

exports.getAllSports = function() {
  return db.getAllSports().then(result => {
    let ret = result.recordset.map(e => {
      return e.name;
    });
    return ret;
  });
};
