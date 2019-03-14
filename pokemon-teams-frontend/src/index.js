const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const mainTag = document.querySelector('main');

const allTrainersAndPokemans = () => {
  return fetch("http://localhost:3000/trainers")
    .then(response => response.json())
    .then(trainerArray =>
      trainerArray.forEach(function(trainer){

        // debugger
        // mainTag.append(newTrainerCard(trainer.id, trainer.name))

        mainTag.innerHTML += `
        <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
          <button data-trainer-id="${trainer.id}">Add Pokemon</button>
          <ul data-id="${trainer.id}"></ul>
          </div>
        `;

        let ulTag = document.querySelector(`ul[data-id="${trainer.id}"]`)

        trainer.pokemons.forEach(function(pokemon) {
          ulTag.innerHTML +=
          `<li>${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
        })
      })
    )
}

// return fetch(`httplocalhost`, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json'
//   },
//   body: JSON.stringify({key:value})
// })

mainTag.addEventListener('click', function(event) {
  if (event.target.dataset.pokemonId) {
    deletePokemonFromTrainer(event.target.dataset.pokemonId)
    .then(pokemon => {event.target.parentElement.remove();
    })
  }
  else if (event.target.dataset.trainerId === event.target.parentElement.dataset.id) {
    let ulTag = document.querySelector(`ul[data-id="${event.target.dataset.trainerId}"]`)
      return fetch("http://localhost:3000/pokemons")
        .then(response => response.json())
        .then(pokemonArray => {
          const randPokemon = pokemonArray[Math.floor(Math.random() * pokemonArray.length)];
          if(ulTag.childElementCount < 6) {
            addPokemonToTrainer(event.target.dataset.trainerId)
            .then(updatedPokemon => {
              ulTag.innerHTML += `<li>${randPokemon.nickname} (${randPokemon.species})<button class="release" data-pokemon-id="${randPokemon.id}">Release</button></li>`
            })
            }
      })
  }
})


document.addEventListener('DOMContentLoaded', function(event) {
  allTrainersAndPokemans();
});

// function newTrainerCard(id, name) {
//   let newCard = document.createElement('div')
//   newCard.classList.add('card')
//   newCard.dataset.id = id
//   newCard.innerHTML = `
//     <p>${trainer.name}</p>
//     <button data-trainer-id="${trainer.id}">Add Pokemon</button>
//     <ul data-id="${trainer.id}"></ul>
//   `
//   return newCard
// }

const addPokemonToTrainer = (trainerId) => {
  return fetch(`http://localhost:3000/pokemons`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({trainer_id: trainerId})
  })
  .then(response => response.json())
}

const deletePokemonFromTrainer = (pokemonId) => {
  return fetch(`http://localhost:3000/pokemons/${pokemonId}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
}
