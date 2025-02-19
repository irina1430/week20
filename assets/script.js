const result = document.getElementById("result");
const errorText = document.getElementById("error");
const btn = document.getElementById("btn");

async function searchData() {
  const category = document.getElementById("category").value;
  const number = document.getElementById("number").value;
  result.innerHTML = "";
  errorText.innerHTML = "";
  result.innerHTML = `<p>Загрузка...</p>`;

  try {
    await fetch(`https://swapi.dev/api/${category}/${number}/`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.name && !data.title) {
          throw new Error("Данные не найдены!");
        }
        result.innerHTML = `<h3>${data.name || data.title}</h3>`;
        if (category === "people") {
          result.innerHTML += `
            <p>Рост: ${data.height} см</p>
            <p>Масса: ${data.mass} кг</p>
            <p>Пол: ${data.gender}</p>
        `;
        } else if (category === "planets") {
          result.innerHTML += `
                <p>Климат: ${data.climate}</p>
                <p>Гравитация: ${data.gravity}</p>
                <p>Население: ${data.population}</p>
            `;
        } else if (category === "starships") {
          result.innerHTML += `
                <p>Модель: ${data.model}</p>
                <p>Производитель: ${data.manufacturer}</p>
                <p>Стоимость: ${data.cost_in_credits} кредитов</p>
            `;
        } else if (category === "vehicles") {
          result.innerHTML += `
                  <p>Модель: ${data.model}</p>
                  <p>Производитель: ${data.manufacturer}</p>
                  <p>Стоимость: ${data.cost_in_credits} кредитов</p>
              `;
        } else if (category === "species") {
          result.innerHTML += `
                  <p>Язык: ${data.language}</p>
                  <p>Цвет глаз: ${data.eye_colors}</p>
                  <p>Цвет волос: ${data.hair_colors} </p>
              `;
        }
      });
  } catch (error) {
    errorText.innerHTML = "Ошибка!";
  } finally {
    console.log("Загрузка выполнена");
  }
}
btn.addEventListener("click", searchData);
