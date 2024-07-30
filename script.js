const API_KEY = "ab36023acf9342798a3435ad1f8f73d9";
const url = "https://newsapi.org/v2/everything?q=";


window.addEventListener('load', () => fetchNews("India"));

async function fetchNews (query) {
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await response.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newscardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newscardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML=`${article.source.name} - ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}