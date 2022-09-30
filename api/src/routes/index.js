
const axios = require('axios');
const { Router } = require('express');
const { Pokemon, Type } = require('../db.js');

const router = Router();

const getApiPokemonUrlData = async () => {
    let infoAPI = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40&offset=0');
    let infoAPIData = await infoAPI.data.results.map( e => e.url);
    let allPokemonsApiData = []
    for (let i = 0; i < infoAPIData.length; i++) {
        let pokemonApiURL = await axios.get(infoAPIData[i])
        let pokemonApiURLinfo = await pokemonApiURL.data
        allPokemonsApiData.push({
            id: pokemonApiURLinfo.id,
            name: pokemonApiURLinfo.name,
            image: pokemonApiURLinfo.sprites.front_default,
            life: pokemonApiURLinfo.stats.find(e => e.stat.name == "hp").base_stat,
            attack: pokemonApiURLinfo.stats.find(e => e.stat.name == "attack").base_stat,
            defense: pokemonApiURLinfo.stats.find(e => e.stat.name == "defense").base_stat,
            speed: pokemonApiURLinfo.stats.find(e => e.stat.name == "speed").base_stat,
            height: pokemonApiURLinfo.height,
            weight: pokemonApiURLinfo.weight,
            type: pokemonApiURLinfo.types.map(t => t.type.name)
        });
    }
    return allPokemonsApiData
}

var getDbPokemonData = async () => {
    return await Pokemon.findAll({
        include: {
            model: Type, 
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

var getAllCharacters = async () => {
    let infoAPI = await getApiPokemonUrlData();
    let infoDB = await getDbPokemonData();
    let infoTotal = infoAPI.concat(infoDB);

    // console.log(infoTotal)

    // infoTotal.forEach( async pokeApiDB => {
    //     await Pokemon.findOrCreate({
    //         where: {
    //             id: pokeApiDB.id,
    //             name: pokeApiDB.name,
    //             image: pokeApiDB.image,
    //             life: pokeApiDB.life,
    //             attack: pokeApiDB.attack,
    //             defense: pokeApiDB.defense,
    //             speed: pokeApiDB.speed,
    //             height: pokeApiDB.height,
    //             weight: pokeApiDB.weight,
    //             type: pokeApiDB.type
    //         }
    //     })    
    // });

    return infoTotal;
}

router.get("/pokemons", async (req, res) => {
    const name = req.query.name;
    let charactersTotal = await getAllCharacters();
    if (name) {
        let characterName = await charactersTotal.filter( element => element.name.toLowerCase().includes(name.toLowerCase()));

        characterName.length ?
        res.status(200).send(characterName) :
        res.status(404).send("Lo sentimos, no se encuentra el pokemon o el mismo no existe!");
    } else {
        res.status(200).send(charactersTotal)
    }
});

router.get("/types", async (req, res) => {
    let typesAPI = await axios.get('https://pokeapi.co/api/v2/type');
    let typesAPIData = await typesAPI.data.results.map( t => t.name );

    typesAPIData.forEach( async type => {
        await Type.findOrCreate({
            where: {name: type}
        })    
    });

    let allTypes = await Type.findAll();
    res.send(allTypes)
});

router.get("/pokemons/:id", async (req, res) => {
    let id = req.params.id;
    // Tambien: let {id} = req.params;
    let allPokemons = await getAllCharacters();
    if(id) {
        let pokemonID = allPokemons.filter(pokemon => pokemon.id == id);
        
        pokemonID.length ?
        res.status(200).json(pokemonID) :
        res.status(400).send("No se encuentra un pokemon con ese ID!")
    }
});

router.post("/pokemons", async (req, res) => {

    let {name, image, life, attack, defense, speed, height, weight, type, selfMade} = req.body;
    let pokemonAdded = await Pokemon.create({
        name,
        image,
        life,
        attack,
        defense,
        speed,
        height,
        weight,
        selfMade
    });

    let pokemonTypeToDB = await Type.findAll({
        where: {name: type}
    });
    
    pokemonAdded.addType(pokemonTypeToDB)
    res.send("Pokemon cargado con éxito!")
});

module.exports = router;