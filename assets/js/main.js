const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const infoButton = document.getElementById('info')

const maxRecords = 151
const limit = 10
let offset = 0;



function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
               
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <button  class="btninfo" title="Information"  type="button" onclick='getInformation(${JSON.stringify(pokemon)})'>i</button>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)



loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


function getInformation(pokemon) {
    const modal = document.getElementById("pokemonModal");
    const infoContainer = document.getElementById("pokemonInfo");
    let type = pokemon.type

    const backgroundPokemon = document.querySelector('.pokemon .' + type)
    const estiloPokemon = window.getComputedStyle(backgroundPokemon)
    console.log(estiloPokemon.backgroundColor)
    const backgroundColorPoke = estiloPokemon.backgroundColor

    const content = `
    <h3>${pokemon.name}</h3>
    <p>Experience: ${pokemon.experience}</p>
    <p>Height: ${pokemon.height}</p>
    <p>Weight: ${pokemon.weight}</p>

    <img class="imageinfo" src="${pokemon.photo}" alt="${pokemon.name}" />
  `;

    infoContainer.innerHTML = content;

    document.querySelector('.modal-content').style.backgroundColor = backgroundColorPoke
    modal.style.display = "block";

    const closeButton = document.querySelector(".close");
    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
    });
}