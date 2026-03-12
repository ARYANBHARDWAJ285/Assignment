const API_KEY = "YOUR_API_KEY";

const container = document.getElementById("newsContainer");
const loader = document.getElementById("loader");
const buttons = document.querySelectorAll("button");

function fetchNews(topic){

loader.style.display = "block";
container.innerHTML = "";

const url = `https://newsapi.org/v2/top-headlines?country=in&category=${topic}&apiKey=${API_KEY}`;

fetch(url)
.then(response => response.json())
.then(data => {

loader.style.display = "none";

if(!data.articles || data.articles.length === 0){
container.innerHTML = "<p>No news available.</p>";
return;
}

data.articles.forEach(article => {

const card = document.createElement("div");
card.className = "card";

card.innerHTML = `
<img src="${article.urlToImage || ''}" alt="">
<div class="title">${article.title}</div>
<div class="description">${article.description || "No description available."}</div>
<a href="${article.url}" target="_blank">Read more</a>
`;

container.appendChild(card);

});

})

.catch(error => {

loader.style.display = "none";
container.innerHTML = "<p>Failed to load news.</p>";
console.log(error);

});

}

buttons.forEach(btn => {

btn.addEventListener("click", () => {
const topic = btn.getAttribute("data-topic");
fetchNews(topic);
});

});

window.addEventListener("load", () => {

fetchNews("technology");

});