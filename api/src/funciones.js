function buscadora(arr,palabra){
	if(palabra.length > 0){
		for (var i = 0; i < palabra.length; i++) {
		// 				   PROPIEDAD QUE QUIERA FILTRAR
		//                        |
		// 						  V	
		 arr = arr.filter(e => e.name[i].toUpperCase() == palabra[i].toUpperCase())
	}
	return arr
	}
	
}	

module.exports = {buscadora}