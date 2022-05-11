const gamesContainer = document.querySelector('.games');
const pagination = document.querySelector('.pagination');
const prevPage = document.querySelector('#prev');
const nextPage = document.querySelector('#next');

const key = 'b61e781d5a3a4477bad0ef9601706c16';
const url = `https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating&key=${key}`;
let page = 1;
let gamesPerPage = 8;
let gamesCount;
let totalPages;

const getGames = async (endPoint, page, pageSize) => {
    page && pageSize ? (endPoint += `&page=${page}&page_size=${pageSize}`) : null;
    try {
        const response = await fetch(endPoint);
        const data = await response.json();
        renderGames(data);
    } catch (error) {
        console.error(error);
        showError('Error: Failed to fetch data');
        pagination.style.display = 'none';
    }
};

const renderGames = (games) => {
    gamesCount = games.count;
    totalPages = Math.ceil(gamesCount / gamesPerPage);
    games.results.forEach((game) => {
        const name = game.name || 'Unknown name';
        const rating = game.rating || 'No Rating';
        const numberOfTags = game.tags.length || 'Unknown number of tags';

        const singleGameContainer = document.createElement('div');
        const gameTitle = document.createElement('h2');
        const gameRating = document.createElement('p');
        const noOfGameTags = document.createElement('p');

        gameTitle.innerText = name;
        gameRating.innerText = `Rating: ${rating} / 5`;
        noOfGameTags.innerText = `${numberOfTags} tags`;

        singleGameContainer.appendChild(gameTitle);
        singleGameContainer.appendChild(gameRating);
        singleGameContainer.appendChild(noOfGameTags);

        gamesContainer.appendChild(singleGameContainer);
    });
    gamesContainer.classList.remove('loading');
    pagination.style.display = 'flex';
    document.querySelector('#current-page').innerText = page;
    document.querySelector('#total-pages').innerText = totalPages;
};

const showError = (msg) => {
    const errorMsg = document.createElement('p');
    errorMsg.classList.add('error');
    errorMsg.innerText = msg;

    gamesContainer.appendChild(errorMsg);
    gamesContainer.classList.remove('loading');
};

const handleNextPage = () => {
    if (page === totalPages) {
        return;
    }
    page++;
    gamesContainer.innerHTML = '';
    gamesContainer.classList.add('loading');
    getGames(url, page, gamesPerPage);
};

const handlePrevPage = () => {
    if (page === 1) {
        return;
    }
    page--;
    gamesContainer.innerHTML = '';
    gamesContainer.classList.add('loading');
    getGames(url, page, gamesPerPage);
};

prevPage.addEventListener('click', handlePrevPage);
nextPage.addEventListener('click', handleNextPage);

getGames(url, page, gamesPerPage);
