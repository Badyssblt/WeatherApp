const apiKey = "e4b321945a106ef5ba4518b717ab9c7d";
const title = document.getElementById("container__title__id");
const temp = document.getElementById("container__temp__id");
const dateId = document.getElementById("container__date__id");
const date = new Date().toLocaleDateString("fr");
const locationId = document.getElementById("container__temp__location__id");
const input = document.getElementById("container__temp__location__input__id");
let city = "Rennes";
const details = document.getElementById("details");

let url =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&units=metric&appid=" +
  apiKey;
console.log(url);

// Actualiser météo avec valeur dans input

async function getWeather(city) {
  const promise = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      apiKey
  );
  if (promise.status == 404) {
    document.getElementById("error").style.display = "block";
    title.style.display = "none";
    temp.style.display = "none";
    dateId.style.display = "none";
    document.getElementById("container__img__id").style.display = "none";
  } else {
    document.getElementById("error").style.display = "none";
    temp.style.display = "block";
    title.style.display = "block";
    document.getElementById("container__img__id").style.display = "block";
    dateId.style.display = "block";
  }

  let data = await promise.json();
  displayInfo(data.name, data.main.temp);
  dateId.textContent = date;
  displayCloud(data.weather[0].main, data.weather[0].description);
  displayDetails(data.main.humidity, data.wind.speed);
  console.log(data);
}

function displayInfo(city, temperature) {
  title.textContent = city;
  temp.textContent = Math.round(temperature) + " °C";
}

locationId.addEventListener("click", () => {
  input.style.display = "block";
  input.style.marginLeft = "10px";
  locationId.style.display = "none";
  document.getElementById("close__icon").style.display = "block";
});

document.getElementById("close__icon").addEventListener("click", () => {
  input.style.display = "none";
  locationId.style.display = "block";
  document.getElementById("close__icon").style.display = "none";
});

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    getCity();
  }
});

function getCity() {
  city = input.value;
  url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  getWeather(city);
  input.value = "";
}

function displayCloud(weather, desc) {
  const img = document.getElementById("container__img__id");
  if (weather == "Clear") {
    img.src = "imgs/sun.png";
  } else if (weather == "Clouds" && desc == "few clouds") {
    img.src = "imgs/cloudsun.png";
  }
}

function displayDetailsDiv(div) {
  const detail = document.getElementById(div);
  if (detail.style.display === "none") {
    detail.style.display = "flex";
  } else {
    detail.style.display = "none";
  }
}

function displayDetails(humidity, wind) {
  const winds = document.getElementById("details__winds__id");
  const water = document.getElementById("details__humidity__id");
  winds.textContent = wind + " m/s";
  water.textContent = humidity + " %";
}
