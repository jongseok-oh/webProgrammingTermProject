function enterkey() {
  if (window.event.keyCode == 13) {
    const searchC = document.getElementById("search");
    searchC.style.marginTop = "5pt";
    searchC.style.transition = "all ease 0.5s 0s";

    const resultBox = document.getElementById("result");
    resultBox.style.marginLeft = "5%";
    resultBox.style.marginRight = "5%";
    resultBox.style.backgroundColor = "white";
    resultBox.style.height = "fit-content";
    resultBox.style.boxShadow = "0px 0px 5px 5px rgba(110, 110, 110, 0.32)";
    resultBox.style.transition = "all ease 0.5s 0s";
    resultBox.style.alignItems = "center";

    const input = document.getElementById("value");
    searchKeyword = input.value;

    $("#result").empty();
    sendApiRequest(searchKeyword);
  }
}

async function sendApiRequest(searchKeyword) {
  let API_ID = "**";
  let API_KEY = "***";

  let res = await fetch(
    `https://api.edamam.com/api/recipes/v2?type=public&app_id=${API_ID}&app_key=${API_KEY}&q=${searchKeyword}&random=true&health=vegan`
  );

  let data = await res.json();
  console.log(data);

  // JSON정보 카드에 담아 모두 출력
  if (res.ok) {
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
