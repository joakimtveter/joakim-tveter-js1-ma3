const key = 'b61e781d5a3a4477bad0ef9601706c16'
const Url = `https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating&key=${key}`
const gamesContainer = document.querySelector('.games');
const numberOfGames = 8;

async function getData(endPoint) {
    try {
        const response = await fetch(endPoint);
        return await response.json();
    } catch (error) {
        console.log(error);
        const errorMsg = document.createElement('p')
        errorMsg.classList.add('error')
        errorMsg.innerText = error;
        gamesContainer.appendChild(errorMsg)
    }
}

const data = await getData(Url);


for (let i = 0; i < numberOfGames; i++) {
    const name = data[i].name || 'Unknown name';
    const rating = data[i].rating || 'No Rating';
    const numberOfTags = data[i].tags.length || 'Unknown number of tags';
    
    const singleGameContainer = document.createElement('div');
    const gameTitle = document.createElement('h2');
    const gameRating = document.createElement('p');
    const noOfGameTags = document.createElement('p');
    
    gameTitle.innerText = name;
    gameRating.innerText = rating;
    noOfGameTags.innerText = numberOfTags;

    singleGameContainer.appendChild(gameTitle);
    singleGameContainer.appendChild(gameRating);
    singleGameContainer.appendChild(noOfGameTags);
}
