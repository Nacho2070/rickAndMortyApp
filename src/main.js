import './style.css';

document.querySelector('#app').innerHTML = `
  <header>
    <h1>Rick and Morty Characters</h1>
    <input type="text" id="search-input" placeholder="Search characters...">
  </header>
  <main>
    <div id="character-list"></div>
  </main>
`;

const API_URL = 'https://rickandmortyapi.com/api/character/';
const characterList = document.getElementById('character-list');
const searchInput = document.getElementById('search-input');

if (!characterList || !searchInput) {
  console.error('Required DOM elements are missing.');
}

async function fetchCharacters() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    if (data.results.length === 0) {
      characterList.innerHTML = '<p>No characters found.</p>';
      return;
    }
    displayCharacters(data.results);
  } catch (error) {
    characterList.innerHTML = `<p class="error">Error fetching characters: ${error.message}</p>`;
  }
}

function displayCharacters(characters) {
  characterList.innerHTML = characters.map(character => `
    <div class="character-card">
      <img src="${character.image}" alt="${character.name}">
      <h2>${character.name}</h2>
      <p>${character.species}</p>
    </div>
  `).join('');
}

function filterCharacters(event) {
  const searchTerm = event.target.value.toLowerCase();
  const characterCards = document.querySelectorAll('.character-card');
  characterCards.forEach(card => {
    const name = card.querySelector('h2').textContent.toLowerCase();
    card.style.display = name.includes(searchTerm) ? '' : 'none';
  });
}

if (searchInput) {
  searchInput.addEventListener('input', filterCharacters);
}

fetchCharacters();
