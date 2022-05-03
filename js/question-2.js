const key = 'b61e781d5a3a4477bad0ef9601706c16';
const Url = `https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating&key=${key}`;
const gamesContainer = document.querySelector('.games');
const numberOfGames = 8;

async function getGames(endPoint) {
  try {
    const response = await fetch(endPoint);
    const data = await response.json();
    showGames(data);
  } catch (error) {
    showError(error);
  }
}

function showGames(games) {
  for (let i = 0; i < numberOfGames; i++) {
    const name = games.results[i].name || 'Unknown name';
    const rating = games.results[i].rating || 'No Rating';
    const numberOfTags =
      games.results[i].tags.length || 'Unknown number of tags';

    const singleGameContainer = document.createElement('div');
    const gameTitle = document.createElement('h2');
    const gameRating = document.createElement('p');
    const noOfGameTags = document.createElement('p');

    gameTitle.innerText = name;
    gameRating.innerText = `Rating: ${rating}/5`;
    noOfGameTags.innerText = `${numberOfTags} tags`;

    singleGameContainer.appendChild(gameTitle);
    singleGameContainer.appendChild(gameRating);
    singleGameContainer.appendChild(noOfGameTags);

    gamesContainer.appendChild(singleGameContainer);
    gamesContainer.classList.remove('loading');
  }
}

function showError(msg) {
  const errorMsg = document.createElement('p');
  errorMsg.classList.add('error');
  errorMsg.innerText = msg;

  gamesContainer.appendChild(errorMsg);
  gamesContainer.classList.remove('loading');
}

const data = getGames(Url);
