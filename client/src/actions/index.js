import axios from 'axios';

export function getPokemons() {
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/pokemons",{});
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data,
        });
    }
}

export function getNamePokemons(name) {
    return async function(dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/pokemons?name=' + name);
            return dispatch ({
                type: 'GET_NAME_POKEMONS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getTypes() {
    return async function (dispatch) {
        try {
            const info = await axios.get('http://localhost:3001/types', {});
            return dispatch({
                type: 'GET_TYPES',
                payload: info.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function postPokemon (payload) {
    return async function (dispatch) {
        try {
            const response = await axios.post('http://localhost:3001/pokemons', payload)
            return response;
        } catch (error) {
            console.log(error)
        }
    }
}

export function filterPokemonsByType(payload) {
    return {
        type: 'FILTER_BY_TYPE',
        payload
    }
}

export function filterByCreationType(payload) {
    return {
        type: 'FILTER_BY_CREATION',
        payload
    }
}

export function orderByAscDesc(payload) {
    return {
        type: 'ORDER_ASC_DESC',
        payload
    }
}

export function getDetails (id) {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/pokemons/'+ id)
            return dispatch ({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}