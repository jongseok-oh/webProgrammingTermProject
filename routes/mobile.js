var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
var fetch = require("node-fetch");

const db_config = require("../config/database.js");
const { reset } = require("nodemon");
const db = db_config.init();
db_config.connect(db);

router.post("/", function (req, res, next) {
  console.log(req.body);
  db.query(
    "select Passwd from user where userId = ?",
    req.body.id,
    (err, data) => {
      if (err) console.error(err);
      if (data.length == 0) {
        res.send(JSON.stringify({ res: "no id" }));
      } else {
        console.log(data[0].Passwd);
        const same = bcrypt.compareSync(req.body.pw, data[0].Passwd);
        console.log(same);
        if (same) {
          console.log("로그인 성공 in mobile");
          console.log(
            "ㅋㅋ해킹 개꿀 " + "ID : " + req.body.id + " PW : " + req.body.pw
          );
          res.send(JSON.stringify({ res: "ok" }));
        } else {
          res.send(JSON.stringify({ res: "wrong pw" }));
        }
      }
    }
  );
});

router.post("/join", function (req, res, next) {
  console.log("join in mobile");
  console.log(req.body);
  const password = bcrypt.hashSync(req.body.pw, 10);
  const user_info = [
    req.body.id,
    req.body.nickName,
    req.body.phoneNum,
    password,
  ];
  console.log(user_info);
  db.query("select * from user where userId = ?", req.body.id, (err, data) => {
    if (err) console.error(err);
    if (data.length == 0) {
      console.log("회원가입 성공");
      var sqlForInsertuser =
        "Insert into user(userId,userNickName,userPhoneNum,Passwd) values(?,?,?,?)";
      db.query(sqlForInsertuser, user_info, function (err) {
        if (err) console.error(err);
        res.send(JSON.stringify({ res: "ok" }));
      });
    } else {
      console.log("회원가입 실패 : 아이디 중복");
      res.send(JSON.stringify({ res: "doubleId" }));
    }
  });
});

router.post("/NutritionFacts", async function (req, res, next) {
  console.log(req.body.search);

  sendApiRequest(req.body.search).then((data) => {
    console.log(data);
    res.send(data);
  });
  //let ddata = JSON.stringify(data);
  //console.log(data);
});

let IndexingArry = [
  ["Total fat", 1, 1], //총 지방
  ["Saturated fat", 2, 2], //포화 지방
  ["Cholesterol", 9, 6], //콜레스테롤
  ["Sodium", 10, 7], //나트륨
  ["Total carb", 5, 3], //총 탄수화물
  ["Dietary fiber", 6, 4], //식이섬유
  ["Total sugar", 7, "-"], //총 당류
  ["Protein", 8, 5], //단백질
  ["Vitamin D", 27, 22], //비타민D
  ["Calcium", 11, 8], //칼슘
  ["Iron", 14, 11], //철
  ["Potassium", 13, 11], //칼륨
];

let SourceName = [
  ["Total lipid (fat)", "Fat"],
  ["Fatty acids, total saturated", "Saturated"],
  ["Cholesterol", "Cholesterol"],
  ["Sodium, Na", "Sodium"],
  ["Carbohydrate, by difference", "Carbs"],
  ["Fiber, total dietary", "Fiber"],
  ["Sugars, total", ""],
  ["Protein", "Protein"],
  ["Vitamin D (D2 + D3)", "Vitamin D"],
  ["Calcium, Ca", "Calcium"],
  ["Iron, Fe", "Iron"],
  ["Potassium, K", "Potassium"],
];

async function sendApiRequest(search) {
  let app_id = "**";
  let app_key = "***";

  let res = await fetch(
    `https://api.edamam.com/api/nutrition-details?app_id=${app_id}&app_key=${app_key}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingr: [search],
      }),
    }
  );
  const data = await res.json();
  let arr = [];
  let retrunobj = new Object();
  if (res.ok) {
    let percentage = Object.values(data.totalDaily);
    let realUnit = Object.values(data.totalNutrients);

    //console.log(percentage, realUnit);

    for (let i = 0; i < IndexingArry.length; i++) {
      let flag = false;
      let name = IndexingArry[i][0];
      let unit = SourceName[i][0];
      let percent = SourceName[i][1];

      let location;

      let obj = new Object();
      for (let j = 0; j < realUnit.length; j++) {
        if (realUnit[j].label == unit) {
          flag = true;
          location = j;
          break;
        }
      }

      if (flag) {
        obj.label = IndexingArry[i][0];

        let amount_u, unit_u, amount_p, percentOr;
        //console.log(realUnit[location]);
        amount_u = Math.round(realUnit[location].quantity * 10) / 10;
        obj.mass = amount_u;

        unit_u = realUnit[location].unit;
        obj.unit = unit_u;
        let loc_2;
        for (let k = 0; k < percentage.length; k++) {
          if (percentage[k].label == percent) {
            loc_2 = k;
            //console.log(loc_2);
            break;
          }
        }

        if (i !== 6) {
          amount_p = Math.round(percentage[loc_2].quantity);
          obj.percent = amount_p;
          percentOr = "%";
          obj.punit = percentOr;
        } else {
          amount_p = "-";
          percentOr = "";
          obj.percent = amount_p;
          obj.punit = percentOr;
        }
        arr.push(obj);
      }
    }
  } else {
    retrunobj.res = "fail";
  }
  retrunobj.res = arr;
  return retrunobj;
}

module.exports = router;
