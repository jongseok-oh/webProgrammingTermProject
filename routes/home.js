var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");

const db_config = require("../config/database.js");
const { reset } = require("nodemon");
const db = db_config.init();
db_config.connect(db);

router.get("/", (req, res) => {
  if (!req.session.user) {
    return res.send(
      "<script>alert('로그인을 해주세요.');location.href='/login';</script>"
    );
  }
  res.render("main", { data: ["로그아웃", "../img/piece-of-cake.png", "../"] });
});

router.get("/1", (req, res) => {
  if (!req.session.user) {
    return res.send(
      "<script>alert('로그인을 해주세요.');location.href='/login';</script>"
    );
  }
  res.render("1");
});

router.get("/2", (req, res) => {
  if (!req.session.user) {
    return res.send(
      "<script>alert('로그인을 해주세요.');location.href='/login';</script>"
    );
  }
  res.render("2");
});

router.get("/3", (req, res) => {
  if (!req.session.user) {
    return res.send(
      "<script>alert('로그인을 해주세요.');location.href='/login';</script>"
    );
  }
  res.render("3");
});

router.get("/FAQ", (req, res) => {
  if (!req.session.user) {
    return res.send(
      "<script>alert('로그인을 해주세요.');location.href='/login';</script>"
    );
  }
  res.render("FAQ");
});

router.post("/FAQ", (req, res) => {
  if (!req.session.user) {
    return res.send(
      "<script>alert('로그인을 해주세요.');location.href='/login';</script>"
    );
  }
  const FAQ_info = [
    req.body.firstname,
    req.body.lastname,
    req.body.country,
    req.body.subject,
    req.session.user.id,
  ];
  var sqlForInsertFAQ =
    "Insert into faq(first_name,last_name,country,subject,user) values(?,?,?,?,?)";
  db.query(sqlForInsertFAQ, FAQ_info, function (err) {
    if (err) console.error(err);
    res.send(
      "<script>alert('좋은 의견 감사합니다!');location.href='/home';</script>"
    );
  });
});

module.exports = router;
