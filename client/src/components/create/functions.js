import { Create } from "../../redux/actions"

export function change(e,setState,setError){
    if(e.target.name == "genres" || e.target.name == "plataforms"){
        setState(prev => {return {
            ...prev,
            [e.target.name]: [...prev[e.target.name],e.target.value]
        }})
    }else{
        setState(prev => {return{
            ...prev,
            [e.target.name]: e.target.value
        }})
    }
    err(e,setError)
}

 function err(e,setError){
    if(e.target.name !== "genres" && e.target.name !== "plataforms"){
        if(!e.target.value){   
            setError(errores => {return {
                ...errores,
                [e.target.name]: `Se require ${e.target.id}`
            }})
        }else{
            if(e.target.name == "rating" && (e.target.value > 5 || e.target.value < 0)){
                return setError(errores => {return {...errores,[e.target.name]: "Debe ser entre 5 y 0"}})
            } 
            if(e.target.name == "description" && e.target.value.length < 20){
                return setError(errores => {return {...errores,[e.target.name]: "Debe tener al menos 20 caracteres"}})
            }
            if(e.target.name == "name" && e.target.value.length < 3){
                return setError(errores => {return {...errores,[e.target.name]: "Debe tener al menos 3 caracteres"}})
            }
            if(e.target.name == "image" && ( !(/\S+:+\S+\.+\S/.test(e.target.value)) )){
                return setError(errores => {return {...errores,[e.target.name]: "Debe ser un link"}})
            }
            setError(errores => {return {...errores,[e.target.name]:""}})
        }
    }
}

export function sub(e,state,errores,setState,setError,dispatch){
    e.preventDefault()
    
    if(!errores.name && !errores.description && !errores.released && !errores.rating && !errores.plataforms && !errores.genres && !errores.image){
        dispatch(Create(state))
        setState({name:"", description:"", released:"", rating:"", plataforms:[], genres:[], image:""})
        setError({
            name:"Se require nombre",
            description:"Se require descripción",
            released:"Se require fecha en la que se realizo",
            rating:"Se require rating/puntaje",
            plataforms:"",
            genres:"",
            image:"Se require imagen"
        })
    }else{
        alert("NO SE PUEDE CREAR SI HAY ERRORES")
    }
   
}