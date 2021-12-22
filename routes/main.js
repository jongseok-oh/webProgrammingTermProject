var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");

const db_config = require("../config/database.js");
const { reset } = require("nodemon");
const db = db_config.init();
db_config.connect(db);

router.get("/", (req, res, next) => {
  if (req.session.user) {
    console.log("로그아웃 처리");
    req.session.destroy(function (err) {
      if (err) {
        res.write("<script>alert('logout error')</script>");
        res.write('<script>window.location="/home"</script>');
      }
      console.log("세션 삭제 성공");
    });
  }
  res.render("main", {
    data: ["로그인/회원가입", "/img/piece-of-cake.png", "./login"],
  });
});

router.get("/join", (req, res) => {
  res.render("join");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", function (req, res, next) {
  password = req.body.Password;
  db.query(
    "select Passwd from user where userId = ?", // injection : 'jongking 어쩌구 저쩌구'
    // 이미 ''로 묶여서 안됨
    req.body.ID,
    (err, data) => {
      if (err) console.error(err);
      if (data.length == 0) {
        res.send(
          "<script>alert('아이디가 존재하지 않거나 비밀번호가 다릅니다.');location.href='/login';</script>"
        );
      } else if (req.session.user) {
        res.send(
          "<script>alert('이미 로그인 되어있습니다..');location.href='/home';</script>"
        );
      } else {
        console.log(data[0].Passwd);
        const same = bcrypt.compareSync(password, data[0].Passwd);
        console.log(same);
        if (same) {
          console.log("로그인 성공");
          console.log(
            "ㅋㅋ해킹 개꿀 " +
              "ID : " +
              req.body.ID +
              " PW : " +
              req.body.Password
          );
          req.session.user = {
            id: req.body.ID,
            authorized: true,
          };
          res.redirect("/home");
        } else {
          res.send(
            "<script>alert('아이디가 존재하지 않거나 비밀번호가 다릅니다.');location.href='/login';</script>"
          );
        }
      }
    }
  );
});

router.post("/join", function (req, res, next) {
  console.log("join POST");
  console.log(req.body.Password);
  const password = bcrypt.hashSync(req.body.Password, 10);
  const user_info = [
    req.body.ID,
    req.body.NickName,
    req.body.PhoneNum,
    password,
  ];
  console.log(user_info);
  db.query("select * from user where userId = ?", req.body.ID, (err, data) => {
    if (err) console.error(err);
    if (data.length == 0) {
      console.log("회원가입 성공");
      var sqlForInsertuser =
        "Insert into user(userId,userNickName,userPhoneNum,Passwd) values(?,?,?,?)";
      db.query(sqlForInsertuser, user_info, function (err) {
        if (err) console.error(err);
        res.send("<script>alert('회원가입 성공!');location.href='/';</script>");
      });
    } else {
      console.log("회원가입 실패");
      res.send(
        "<script>alert('이미 존재하는 아이디 입니다.');location.href='/join';</script>"
      );
    }
  });
  console.log("good");
});

module.exports = router;
