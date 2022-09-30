const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    detail: []
}

function rootReducer (state = initialState, action) {
    switch(action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }

        case 'GET_NAME_POKEMONS':
            return {
                ...state,
                pokemons: action.payload
            }

        case 'ORDER_ASC_DESC':
            const sortedArr = action.payload === 'asc'
            ? state.pokemons.sort(function(a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            })
            : state.pokemons.sort(function(a, b) {
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                pokemons: sortedArr
            }

        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
            }

        case 'FILTER_BY_TYPE':
            const allPokemons = state.allPokemons
            const typeFilter = action.payload === 'all' 
            ? allPokemons 
            : allPokemons.filter( p => {
                if(p.type) return p.type.includes(action.payload)
                else return p.Types.includes(action.payload)
            })

            return {
                ...state,
                pokemons: typeFilter
            }

        case 'POST_CHARACTER':
            return {
                ...state,
            }

        case 'FILTER_BY_CREATION':
            const creationFilter = action.payload === 'selfmade' 
            ? state.allPokemons.filter( p => p.selfMade) 
            : state.allPokemons.filter( p => !p.selfMade)
            return {
                ...state,
                pokemons: action.payload === 'all' 
                ? allPokemons 
                : creationFilter
            } 
        
        case 'GET_DETAILS':
            return{
                ...state,
                detail: action.payload
            }

        default: 
            return state;
    }
}

export default rootReducer;