const cities = [
{
name: "Delhi",
lat: 28.61,
lon: 77.20
},
{
name: "Bulandshahr",
lat: 28.40,
lon: 77.85
},
{
name: "Greater Noida",
lat: 28.47,
lon: 77.50
}
];

const container = document.getElementById("weatherContainer");
const loading = document.getElementById("loading");

function weatherEmoji(code){

if(code === 0){
return "☀️";
}

else if(code <= 3){
return "⛅";
}

else if(code <= 48){
return "🌫️";
}

else if(code <= 67){
return "🌧️";
}

else if(code <= 77){
return "❄️";
}

else{
return "⛈️";
}

}

function getWeather(city){

const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`;

return fetch(url)
.then(response => response.json())
.then(data => {

return{
cityName: city.name,
temperature: data.current_weather.temperature,
code: data.current_weather.weathercode
};

});

}

const weatherPromises = cities.map(city => getWeather(city));

Promise.all(weatherPromises)

.then(results => {

loading.style.display = "none";

results.forEach(item => {

const card = document.createElement("div");

card.className = "card";

card.innerHTML = `
<div class="city">${item.cityName}</div>
<div class="emoji">${weatherEmoji(item.code)}</div>
<div class="temp">${item.temperature} °C</div>
`;

container.appendChild(card);

});

})

.catch(error => {

loading.style.display = "none";

container.innerHTML = "Error loading weather data";

console.log(error);

});