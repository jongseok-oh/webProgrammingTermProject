var mysql = require("mysql");

var db_info = {
  connectionLimit: 5,
  host: "******",
  user: "******",
  password: "*****", //***비밀번호 입력(필수)***
  database: "******",
  multipleStatements: true,
};

module.exports = {
  init: function () {
    return mysql.createConnection(db_info);
  },
  connect: function (conn) {
    conn.connect(function (err) {
      if (err) console.error("mysql connection error : " + err);
    });
  },
};
