
// add event listener to each type icon
document.addEventListener('DOMContentLoaded', function() {
  var types = ["electric", "fire", "water", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dark", "dragon", "steel", "fairy", "normal"];

  // This assumes that all the elements that you want to add listeners to have a class related to the type, such as 'type-electric', 'type-fire', etc.
  types.forEach(function(type) {
    // Using `querySelectorAll` to select all elements with the class 'type-xyz'
    var elements = document.querySelectorAll('.' + type + '_icon');
    elements.forEach(function(element) {
      element.addEventListener('click', function() {
        // Scroll to the element with the corresponding ID like 'type_electric', 'type_fire', etc.
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
  var baseUrl = "https://www.pokemon.com/us/pokedex/";
  document.getElementById(pokemonId).addEventListener("click", function() {
    window.open(baseUrl + pokemonId);
  });
}

var pokemons = ["pikachu", "sceptile", "infernape", "greninja", "snorlax", "staraptor", "lycanroc", "gliscor", "gengar", "toxtricity", "heracross",
"lucario", "weavile", "jirachi", "zoroark", "salamence", "gardevoir", "mimikyu"];
pokemons.forEach(addPokemonClickListener);






