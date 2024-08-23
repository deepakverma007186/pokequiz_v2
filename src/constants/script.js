const fs = require("fs");
const pokemons = require("./pokemon.json");

pokemons.forEach((item, index) => {
  item.id = `${item.name.slice(0, 2)}${index}`;
});

fs.writeFileSync("./pokemon.json", JSON.stringify(pokemons, null, 2), "utf-8");

console.log(pokemons[8]);
