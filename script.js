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
let fetchResponse;

function pokeFetch(id){
    fetch("https://pokeapi.co/api/v2/pokemon-form/"+id)
        .then((response) => response.json())
        .then(data => {
            fetchResponse = data;
            let PKMNname = document.getElementById("name-screen");
            let NameByID = fetchResponse.name;//Grabbing the pokemon's name!
            let PKMNimg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/"+id+".png";
            PKMNname.innerHTML="#"+id.toString().padStart(3,0)+"<br/>"+NameByID;

            const sprite=document.getElementById("front-sprite");
            sprite.src = PKMNimg;

            let audioLocation = "soundcries\\"+id.toString().padStart(3,0)+".wav"
            const PKMNcry = new Audio(audioLocation);
            PKMNcry.play();

           })
        fetch("https://pokeapi.co/api/v2/pokemon-species/"+id)
        .then((response) => response.json())
        .then(data => {
            fetchResponse = data;
            let PKMNflavortext=document.getElementById("right-screen");
            let languageID=0;
            let Language = fetchResponse.flavor_text_entries[0].language.name;
            if(Language!="en"){
                languageID=2;
            }
            let FlavorByID = fetchResponse.flavor_text_entries[languageID].flavor_text;
            FlavorByID = FlavorByID.toString().replace("","\n");
            PKMNflavortext.innerText=FlavorByID;
           })
        .then(() => console.log(fetchResponse));
}

document.addEventListener('DOMContentLoaded',()=>{
    //Preparing the Buttons
    const d_right=document.getElementById("cp-right");
    const d_left=document.getElementById("cp-left");
    const d_up=document.getElementById("cp-up");
    const d_down=document.getElementById("cp-down");
    //Preparing the sprite screen
    //Preloading the first pokemon
    pokeFetch(id);
    //Event Handlers
        //directional pad
        d_right.addEventListener("click",()=>{
            id=(id+1);
            if(id==152){
                id=1;
            }
            pokeFetch(id);
        });
        d_left.addEventListener("click",()=>{
            id=(id-1);
            if(id==0){
                id=151;
            }
            pokeFetch(id);
        });
        d_up.addEventListener("click",()=>{
            id=(id+10);
            if(id>=152){
                id=id%152+1;
            }
            pokeFetch(id);
        });
        d_down.addEventListener("click",()=>{
            id=(id-10);
            if(id<=0){
                id=152+id-1;
            }
            pokeFetch(id);
        });
});