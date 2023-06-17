/*
//Format for accessing sprite by pokedex number
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/{pokedex number}.png

//Format for accessing raw JSON for pokemon
https://pokeapi.co/api/v2/pokemon/{id or name}/

//Format for basic pokemon info
https://pokeapi.co/api/v2/pokemon-form/{id}/
*/

/*fetch(url, {
    method: "GET" // giving the option to fetch;
})
*/

let id = 001;
let PKMNname ="";

let fetchResponse;

function pokeFetch(id){
    fetch("https://pokeapi.co/api/v2/pokemon-form/"+id)
        .then((response) => response.json())
        .then(data => {
            fetchResponse = data;
            PKMNname=fetchResponse.name;//Grabbing the pokemon's name!
           })
        .then(() => console.log(fetchResponse));
}

document.addEventListener('DOMContentLoaded',()=>{
    pokeFetch(001);
});