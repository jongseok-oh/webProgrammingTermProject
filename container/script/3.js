const resultBox = document.getElementById("result");

// 클릭한 카테고리 저장
var clickedCateg;

// Health의 키워드 저장
var resultHealth = [];

// Diet의 키워드 저장
var resultDiets = [];

// Nutrients의 키워드 저장
var resultNutrients = [];

/*
Calories 입력내용 저장
0 : 입력내용
1 : min(입력내용 - 입력내용 * 10%)
2 : max(입력내용 + 입력내용 * 10%)
*/
var resultCal = [];

//키워드, 필터 저장 배열
// 0 : 키워드
// 1 : 칼로리
// 나머지 : 버튼 선택으로 추가/삭제
var resultKeyword = [];

/*
버튼 클릭시 필터 내용 바꿔줌.
Health Diets, Nutrients의 선택 결과 -> resultButton 함수를 통해 resultKeyword[2] 이후의 배열에 추가
Callories의 입력 후 + 버튼 선택 결과 -> 위와 동일, resultKeyword[1]자리에 고정.
*/
function Health(event) {
  clickedCateg = event.target.textContent;
  //기존의 내용 지움
  var oFilter = document.getElementById("filters");
  oFilter = oFilter.remove();

  //health 필터 조건들로 삽입
  var newDiv = document.createElement("div");
  newDiv.id = "filters";
  newDiv.className = "col-md-6";
  input = healthElement();
  newDiv.innerHTML = input;
  document.getElementById("filterBox").appendChild(newDiv);
  return clickedCateg;
}

function Diets(event) {
  clickedCateg = event.target.textContent;
  //기존의 내용 지움
  var oFilter = document.getElementById("filters");
  oFilter = oFilter.remove();

  //diets 필터 조건들로 삽입
  var newDiv = document.createElement("div");
  newDiv.id = "filters";
  newDiv.className = "col-md-6";
  input = dietElement();
  newDiv.innerHTML = input;
  document.getElementById("filterBox").appendChild(newDiv);
  return clickedCateg;
}

function Calories(event) {
  clickedCateg = event.target.textContent;
  //기존에 있던 내용 다 지우고
  var oFilter = document.getElementById("filters");
  oFilter = oFilter.remove();

  //칼로리 입력칸 삽입
  var newDiv = document.createElement("div");
  newDiv.id = "filters";
  newDiv.className = "col-md-6";
  input =
    '<input id="caloriesBox" type="text" placeholder="The calculation range is ± 10% of the input value." style="width:70%;"> <button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultCalories()"> + </button>';
  newDiv.innerHTML = input;
  document.getElementById("filterBox").appendChild(newDiv);
  return clickedCateg;
}

function Nutrients(event) {
  clickedCateg = event.target.textContent;
  //기존에 있던 내용 다 지우고
  var oFilter = document.getElementById("filters");
  oFilter = oFilter.remove();

  //영양분 조건 삽입
  var newDiv = document.createElement("div");
  newDiv.id = "filters";
  newDiv.className = "col-md-6";

  //Macronutrients(대량영양소) : 탄수화물, 단백질, 지방
  input = "<h3>Macronutrients</h3>";
  input = nutrientsElement1(input);

  //Micronutrients(미량영양소) : 비타민, 무기질 등
  //https://ko.wikipedia.org/wiki/%EB%AF%B8%EB%9F%89%EC%98%81%EC%96%91%EC%86%8C
  input2 = '<h3 style="margin-top:10px">Micronutrients</h3>';
  input2 = nutrientsElement2(input2);

  input += input2;
  newDiv.innerHTML = input;
  document.getElementById("filterBox").appendChild(newDiv);
  return clickedCateg;
}

//엔터 입력시 결과 반영하는 함수.
function resultEnter() {
  if (event.keyCode == 13) {
    // //엔터 입력시
    // const input = document.getElementById("searchBox"); //입력창에 있던 내용을 받아와 배열에 추가함.
    // resultKeyword[0] = input.value;
    // console.log(resultKeyword);
    search();
  }

  // document.getElementById("kResult").remove(); //기존에 있던 내용을 지우고

  // const selected = document.createElement("div");
  // const oDiv = document.getElementById("selectedKeywords");
  // selected.className = "col-md-5";
  // selected.id = "kResult";

  // //col-5 size의 div에 resultKeyword 배열 추가
  // if (resultKeyword) {
  //   inputKeyword = "<p>";
  //   for (j = 0; j < resultKeyword.length; j++) {
  //     if (j == 0 && !resultKeyword[j]) {
  //       inputKeyword += "undefined keywords" + " | ";
  //     } //keyword가 비었을 경우
  //     else if (j == 1 && !resultKeyword[j]) {
  //       inputKeyword += "undefined Calories" + " | ";
  //     } //calories가 비었을 경우 text를 다르게 지정함.
  //     else {
  //       inputKeyword += resultKeyword[j] + " | ";
  //     }
  //   }

  //   inputKeyword += "</p>";
  //   selected.innerHTML = inputKeyword;
  //   oDiv.appendChild(selected); // 화면에 표시
  // }
}

//Calories에서 + 버튼 클릭시 입력창에 있는 내용 받아오는 함수
function resultCalories() {
  const input = document.getElementById("caloriesBox");
  resultKeyword[1] = input.value;
  result[0] = input.value;
  console.log(resultKeyword);

  document.getElementById("kResult").remove(); //기존에 있던 내용을 지우고

  var rate = resultKeyword[1] * 0.1;
  resultCal[0] = parseInt(resultKeyword[1]) - rate;
  resultCal[1] = parseInt(resultKeyword[1]) + rate;

  const selected = document.createElement("div");
  const oDiv = document.getElementById("selectedKeywords");
  selected.className = "col-md-5";
  selected.id = "kResult";

  //col-5 size의 div에 resultKeyword 배열 추가
  if (resultKeyword) {
    inputKeyword = "<p>";
    for (j = 0; j < resultKeyword.length; j++) {
      if (j == 0 && !resultKeyword[j]) {
        inputKeyword += "undefined keywords" + " | ";
      } //keyword가 비었을 경우
      else if (j == 1 && !resultKeyword[j]) {
        inputKeyword += "undefined Calories" + " | ";
      } //calories가 비었을 경우 text를 다르게 지정함.
      else {
        inputKeyword += resultKeyword[j] + " | ";
      }
    }

    inputKeyword += "</p>";
    selected.innerHTML = inputKeyword;
    oDiv.appendChild(selected); // 화면에 표시
  }
}

//조건 버튼 클릭시 버튼의 내용 받아오는 함수
function resultButton() {
  document.getElementById("kResult").remove(); //기존의 내용 지우고
  const selected = document.createElement("div"); //새로 DIV 생성
  const oDiv = document.getElementById("selectedKeywords");
  selected.className = "col-md-5";
  selected.id = "kResult";
  var valueArr;

  var i = 2;
  while (true) {
    var content = event.target.textContent; //클릭된 버튼의 내용
    content = content.toLowerCase();
    if (!doubleChecked(resultKeyword, content)) {
      //중복클릭일 경우에 arr에서 내용 제거
      pos = resultKeyword.indexOf(content);
      pos2 = resultHealth.indexOf(content);
      if (clickedCateg == "Health") {
        resultHealth.splice(pos2, 1);
      } else if (clickedCateg == "Diets") {
        resultDiets.splice(pos2, 1);
      } else if (clickedCateg == "Nutrients") {
        resultDiets.splice(pos2, 1);
      }
      resultKeyword.splice(pos, 1);

      console.log(resultKeyword);
      break;
    }
    if (!resultKeyword[i] && doubleChecked(resultKeyword, content)) {
      //해당 arr가 비어있고, 중복클릭이 아닐 경우
      valueArr = content;
      resultKeyword[i] = content; //선택된 버튼 내용을 배열에 추가함.
      console.log(resultKeyword);
      i += 1;
      break;
    } else i += 1;
  }

  if (clickedCateg == "Health") {
    resultHealth.push(valueArr);
  } else if (clickedCateg == "Diets") {
    resultDiets.push(valueArr);
  } else if (clickedCateg == "Nutrients") {
    resultNutrients.push(valueArr);
  }

  //col-5 size의 div에 resultKeyword 배열 추가
  if (resultKeyword) {
    inputKeyword = "<p>";
    for (j = 0; j < resultKeyword.length; j++) {
      if (j == 0 && !resultKeyword[j]) {
        inputKeyword += "undefined keywords" + " | ";
      } //keyword가 비었을 경우
      else if (j == 1 && !resultKeyword[j]) {
        inputKeyword += "undefined Calories" + " | ";
      } //calories가 비었을 경우 text를 다르게 지정함.
      else {
        inputKeyword += resultKeyword[j] + " | ";
      }
    }

    inputKeyword += "</p>";
    selected.innerHTML = inputKeyword;
    oDiv.appendChild(selected); // 화면에 표시
  }
}

//키워드 배열 전부 리셋
function resetKeyword() {
  if (resultKeyword.length == 0) {
    //저장된 키워드가 하나도 없을 경우에 알림창
    alert("there is no keyword!");
  } else {
    alert("deleted : " + resultKeyword); //저장된 키워드 모두 삭제한다는 알림창
    resultKeyword = []; //키워드 배열의 크기 0으로 지정
    console.log(resultKeyword);
    resultHealth = [];

    resultDiets = [];
    resultCal = [];
    $("#result").empty();
  }

  //삭제된 내용 update
  document.getElementById("kResult").remove();
  const selected = document.createElement("div");
  const oDiv = document.getElementById("selectedKeywords");
  selected.className = "col-md-5";
  selected.id = "kResult";
  if (resultKeyword) {
    inputKeyword = "<p>";
    for (j = 0; j < resultKeyword.length; j++) {
      if (j == 0 && !resultKeyword[j]) {
        inputKeyword += "undefined keywords" + " | ";
      } else if (j == 1 && !resultKeyword[j]) {
        inputKeyword += "undefined Calories" + " | ";
      } else {
        inputKeyword += resultKeyword[j] + "|";
      }
    }
    inputKeyword += "</p>";
    selected.innerHTML = inputKeyword;
    oDiv.appendChild(selected);
  }
  return resultKeyword;
}

//중복 클릭인지 확인
function doubleChecked(arr, p) {
  for (i = 0; i < arr.length; i++) {
    if (arr[i] == p) {
      //중복인 경우 아이템 삭제
      alert("deleted : " + p);
      return false;
    }
  }
  return true;
}

//각 필터의 조건들
// function nutrientsElement1(i) {
//   i +=
//     '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Fat </button>';
//   i +=
//     '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Saturated </button>';
//   i +=
//     '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Trans </button>';
//   i +=
//     '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Monounsaturated </button>';
//   i +=
//     '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Polyunsaturated </button>';
//   i +=
//     '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Carbs </button>';
//   i +=
//     '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Fiber </button>';
//   i +=
//     '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Sugars </button>';
//   i +=
//     '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Protein </button>';
//   return i;
// }

// function nutrientsElement2(i) {
//   i +=
//     '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Cholesterol </button>';
//   i +=
//     '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Sodium </button>';
//   i +=
//     '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Calcium </button>';
//   i +=
//     '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Magnesium </button>';
//   i +=
//     '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Potassium </button>';
//   i +=
//     '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Iron </button>';
//   i +=
//     '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Phosphorus </button>';
//   i +=
//     '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Vitamin A </button>';
//   i +=
//     '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Vitamin C </button>';
//   i +=
//     '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Thiamin (B1) </button>';
//   i +=
//     '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Riboflavin (B2) </button>';
//   i +=
//     '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Niacin (B3) </button>';
//   i +=
//     '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Folate (Equivalent) </button>';
//   i +=
//     '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Vitamin B12 </button>';
//   i +=
//     '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Vitamin D </button>';
//   i +=
//     '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Vitamin E </button>';
//   i +=
//     '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Vitamin K </button>';

//   return i;
// }

function dietElement() {
  i =
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Balanced </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> High-Fiber </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> High-Protein </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Low-Carb </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Low-Fat </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Low-Sodium </button>';

  return i;
}

function healthElement() {
  i =
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Celery-free </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Crustacean-free </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Dairy-free </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Egg-free </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Fish-free </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Gluten-free </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Lupine-free </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Mustard-free </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Peanut-free </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Sesame-free </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Shellfish-free </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Soy-free </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Tree-Nut-free </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Wheat-free </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> No oil added </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> low-sugar </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Paleo </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Pescatarian </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Pork-free </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Red-meat-free </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Sugar-conscious </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Vegan </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Vegetarian </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Keto </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Kidney friendly </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Kosher </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Alcohol-cocktail </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> DASH </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> fodmap-free </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> gluten-free </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> immuno-supportive </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> keto-friendly </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> low-fat-abs </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> low-potassium </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> Mediterranean </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> mollusk-free </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> sugar-conscious </button>';
  i +=
    '<button id="filterButtons" type="button" class="btn btn-primary btn-lg outline" onclick="resultButton()"> sulfite-free </button>';
  return i;
}

/* BackEnd */

function search() {
  const resultBox = document.getElementById("result");
  resultBox.style.marginLeft = "5%";
  resultBox.style.marginRight = "5%";
  resultBox.style.backgroundColor = "white";
  resultBox.style.height = "fit-content";
  resultBox.style.boxShadow = "0px 0px 5px 5px rgba(110, 110, 110, 0.32)";
  resultBox.style.transition = "all ease 0.5s 0s";
  resultBox.style.alignItems = "center";
  sendApiRequest();
}

async function sendApiRequest() {
  let API_ID = "**";
  let API_KEY = "***";
  let searchKeyword = document.getElementById("searchBox").value;
  console.log(
    "칼로리배열 : ",
    resultCal,
    "health 배열 : ",
    resultHealth,
    "diet 배열 : ",
    resultDiets
  );
  let url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${API_ID}&app_key=${API_KEY}&q=${searchKeyword}&random=true`;
  if (typeof resultCal[0] != "undefined") {
    url += ("&calories=" + resultCal[0] + "-" + resultCal[1]).replace(/ /g, "");
  }

  for (let i = 0; i < resultHealth.length; i++) {
    if (typeof resultHealth[i] != "undefined") {
      url += ("&health=" + resultHealth[i]).replace(/ /g, "");
    }
  }
  for (let i = 0; i < resultDiets.length; i++) {
    if (typeof resultDiets[i] != "undefined") {
      url += ("&diet=" + resultDiets[i]).replace(/ /g, "");
    }
  }
  for (let i = 0; i < resultNutrients.length; i++) {
    if (typeof resultNutrients[i] != "undefined") {
      url += ("&diet=" + resultNutrients[i]).replace(/ /g, "");
    }
  }
  resultNutrients;
  console.log("url : ", url);
  let res = await fetch(url);

  let data = await res.json();
  console.log(data);

  // JSON정보 카드에 담아 모두 출력
  if (res.ok) {
    $("#result").empty();
    if (data.count > 0) {
      data.hits.forEach((hit) => {
        let ingredients_num = hit.recipe.ingredients.length;
        $("#result")
          .append(`<div class="card" style="width: 18rem; display:inline-block;">
    <img src="${hit.recipe.image}" class="card-img-top" alt="음식 사진">
    <div class="card-body">
      <h5 class="card-title">${hit.recipe.label}</h5>
      <p class="card-text">칼로리 : ${hit.recipe.calories.toFixed(
        1
      )} 재료 수 : ${ingredients_num}</p>
      <a href="${hit.recipe.url}" class="btn btn-primary">recipe link!</a>
    </div>
  </div>`);
      });
    } else {
      $("#result").append("<div>검색 결과 없음..<div>");
    }
  }
}
