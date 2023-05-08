const accessKey = 'Vo5487JbehW5nLMtXv4oPB59_b1W1CtJceaKBz8A5gA';

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreBtn = document.querySelector(".show-more");

let inputData = "";
let page = 1;
async function searchImages(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    if(page=== 1){
        searchResultsEl.innerHTML = "";
    }
    const results = data.results;

    results.map((result)=>{
        const imgWrapper = document.createElement("div");
        imgWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imgWrapper.appendChild(image);
        imgWrapper.appendChild(imageLink);
        searchResultsEl.appendChild(imgWrapper);

        page ++;
    })
    if(page > 1){
        showMoreBtn.style.display = "block";
    }
}

formEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    searchImages();
});

showMoreBtn.addEventListener("click",(event)=>{
    searchImages();
})