var initialState = {
    games: [],
    game: {},
    searchValue: "",
    actualPage: 1,
    genres: [],
    platforms: [],
    filtros: {create:"",genre:""},
    order: ""
}

export default function Reducer(state = initialState, action){
    switch (action.type){
        case "PAGE":
            return ({
                ...state,
                actualPage: action.payload
            })
        case "GAMES": {
            if(state.filtros.create){
                var tipo = Number(state.filtros.create)
                if(tipo){
                    action.payload = action.payload.filter(e => typeof e.id == "number")
                }else{
                    action.payload = action.payload.filter(e => typeof e.id == "string")
                }
            }
            if(state.filtros.genre){
                action.payload = action.payload.filter(e => e.genres.includes(state.filtros.genre))
            }

            if(state.order){
                if(state.order == "az"){
                    action.payload = action.payload.sort((a,b) => {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                        if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
                        return 0;
                    })
                }
                if(state.order == "za"){
                    action.payload = action.payload.sort((a,b) => {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                        if (b.name.toLowerCase() < a.name.toLowerCase()) return -1;
                        return 0;
                    })
                }
                if(state.order === "M-m"){
                    action.payload = action.payload.sort((a,b) => b.rating - a.rating)
                }
                if(state.order === "m-M"){
                    action.payload = action.payload.sort((a,b) => a.rating - b.rating)
                }
                
            }
            return ({
                ...state,
                games: action.payload
            })
        }
        case "SEARCH":
            return ({
                ...state,
                games: action.payload,
            })
        case "SEARCH_VALUE":
            return ({
                ...state,
                searchValue: action.payload
            })
        case "DETAILS":
            return ({
                ...state,
                game: action.payload
            })
        case "GENRES":
            return ({
                ...state,
                genres: action.payload
            })
        case "PLATFORMS":
            return ({
                ...state,
                platforms: action.payload
            })
        case "LIMPIAR":
            return ({
                ...state,
                games: []
            })
        case "FILTROS": 
            return ({
                ...state,
                actualPage: 1,
                filtros: action.payload
            })
        case "ORDER":
            return({
                ...state,
                order: action.payload
            })
        default: return ({
            ...state
        })
    }
}