const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

let page = 1;

async function searchImages(query) {
    const accessKey = "KjEhBGN6nFB1O5mbaYgXRoJ10ARERrMLXp56NuyQDqY";//RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        searchResultsEl.innerHTML = ""; // Clear existing search results

        const results = data.results;

        results.forEach(result => {
            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("search-result");
            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description || query;
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description || query;

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResultsEl.appendChild(imageWrapper);
        });

        page = 1; // Reset page to 1 for new search
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = searchInputEl.value.trim();
    if (query) {
        searchImages(query);
    }
});

showMoreButtonEl.addEventListener("click", () => {
    const query = searchInputEl.value.trim();
    if (query) {
        searchImages(query);
    }
});
