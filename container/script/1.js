let cancelBtn = document.getElementById("cancel");
let searchBtn = document.getElementById("submit");
let input_unit = document.getElementById("input_unit");

//버튼이 눌리면 서치 내용 초기화
cancelBtn.addEventListener("click", () => {
  input_unit.value = null;
});

//버튼이 눌리면 서치
function analysis() {
  console.log("button pressed");
  sendApiRequest();
}

function enterkey() {
  if (window.event.keyCode == 13) {
    analysis();
  }
}

//서치 배열
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

// async function papagoTranslation() {
//   let ClientID = "XbaLoVrD0WigKaAS7ERW";
//   let ClientSecret = "gcp7ax99fl";

//   let res = await fetch("https://openapi.naver.com/v1/papago/n2mt", {
//     method: "POST",
//     form: { source: "ko", target: "en", text: "닭 한마리" },
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
//       "X-Naver-Client-Id": ClientID,
//       "X-Naver-Client-Secret": ClientSecret,
//     },
//   });
//   let data = await res.json();
//   console.log(data);
// }
// papagoTranslation();
// $("#errorResult").append(
//   "<div>일부 재료의 영양을 계산할 수 없습니다. 성분 철자를 확인하거나 성분의 수량을 입력했는지 확인하십시오.</div>"
// );

//JSON request
async function sendApiRequest() {
  let API_ID = "**";
  let API_KEY = "****";

  let searchString = input_unit.value;

  let res = await fetch(
    `https://api.edamam.com/api/nutrition-details?app_id=${API_ID}&app_key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // title: "우하하",
        ingr: [searchString],
      }),
    }
  );
  //일부 재료의 영양을 계산할 수 없습니다. 성분 철자를 확인하거나 성분의 수량을 입력했는지 확인하십시오.

  let data = await res.json();
  console.log(data);
  if (res.ok) {
    //에러 창 초기화
    $("#errorResult").empty();
    let percentage = Object.values(data.totalDaily);
    let realUnit = Object.values(data.totalNutrients);

    console.log(percentage, realUnit);

    $("#target").empty(); //영양성분 표 초기화
    for (let i = 0; i < IndexingArry.length; i++) {
      let flag = false;
      let name = IndexingArry[i][0];
      let unit = SourceName[i][0];
      let percent = SourceName[i][1];

      let location;
      for (let j = 0; j < realUnit.length; j++) {
        if (realUnit[j].label == unit) {
          flag = true;
          location = j;
          break;
        }
      }

      if (flag) {
        let amount_u, unit_u, amount_p, percentOr;
        console.log(realUnit[location]);
        amount_u = Math.round(realUnit[location].quantity * 10) / 10;
        unit_u = realUnit[location].unit;
        let loc_2;
        for (let k = 0; k < percentage.length; k++) {
          if (percentage[k].label == percent) {
            loc_2 = k;
            console.log(loc_2);
            break;
          }
        }
        if (i !== 6) {
          amount_p = Math.round(percentage[loc_2].quantity);
          percentOr = "%";
        } else {
          amount_p = "-";
          percentOr = "";
        }

        let htmlcode = `
        <table border="none" width="90%">
        <tr>
          <td colsapn="2" style="text-align: left; width:30%;">
              <b>${name}</b>
          </td>
          <td style="text-align: center; width:30%;">
              ${amount_u}${unit_u}
          </td>
          <td style="text-align: right; width:30%;">
              <b>${amount_p}${percentOr}</b>
          </td>
        </tr>
        </table>
        <hr width="90%" size="1" color="black">`;
        $("#target").append(htmlcode);
      }
    }
  } else {
    $("#errorResult").empty();
    $("#errorResult").append(
      "<div>일부 재료의 영양을 계산할 수 없습니다. 성분 철자를 확인하거나 성분의 수량을 입력했는지 확인하십시오.</div>"
    );
  }
}
