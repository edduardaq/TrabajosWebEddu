var db = firebase.apps[0].firestore();

const tabla = document.querySelector('#tabla');

db.collection("datosZodiaco").orderBy('posic', 'asc').get().then(function (query) {
    tabla.innerHTML = "";
    var salida = "";
    query.forEach(function (doc) {
        let data = doc.data();

        salida += '<div class="divAnuncio m-3">'
        salida += '<div class="imgBlock"><img src="' + data.url + '" width="100%" /></div>'
        salida += '<div>' + data.signo + '<br/>' + data.rango + '</div>'
        
        // Verificamos que existan las fechas en los registros para evitar errores
        if (data.fechaCreacion) {
            salida += '<div>Fecha de creación: ' + new Date(data.fechaCreacion.seconds * 1000).toLocaleDateString() + '</div>';
        }
        if (data.ultActualizacion) {
            salida += '<div>Última actualización: ' + new Date(data.ultActualizacion.seconds * 1000).toLocaleDateString() + '</div>';
        }

        salida += '</div>'
    });
    tabla.innerHTML = salida;
});
