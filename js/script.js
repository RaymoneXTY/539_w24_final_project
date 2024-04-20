
// add event listener to each type icon
document.addEventListener('DOMContentLoaded', function() {
  var types = ["electric", "fire", "water", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dark", "dragon", "steel", "fairy", "normal"];

// scroll to the corresponding type pokemon when clicking on the type icon
  types.forEach(function(type) {
    var elements = document.querySelectorAll('.' + type + '_icon');
    elements.forEach(function(element) {
      element.addEventListener('click', function() {
        var targetElement = document.getElementById('type_' + type);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  });
});


// add event listener to each pokemon
function addPokemonClickListener(pokemonId) {
  // open the official pokemon page when clicking on the pokemon
  var baseUrl = "https://www.pokemon.com/us/pokedex/";
  document.getElementById(pokemonId).addEventListener("click", function() {
    window.open(baseUrl + pokemonId);
  });
}

function addPokemonPressEnter(pokemonId) {
  // open the official pokemon page when pressing enter on the pokemon
  var baseUrl = "https://www.pokemon.com/us/pokedex/";
  document.getElementById(pokemonId).addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      window.open(baseUrl + pokemonId);
    }
  });
}

var pokemons = ["pikachu", "sceptile", "infernape", "greninja", "snorlax", "staraptor", "lycanroc", "gliscor", "gengar", "toxtricity", "heracross",
"lucario", "weavile", "jirachi", "zoroark", "salamence", "gardevoir", "mimikyu"];

pokemons.forEach(addPokemonClickListener);
pokemons.forEach(addPokemonPressEnter);






