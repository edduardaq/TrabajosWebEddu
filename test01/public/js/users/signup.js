// JavaScript Document
var db = firebase.apps[0].firestore();
var container = firebase.apps[0].storage().ref();

const txtPosic = document.querySelector('#txtPosic');
const txtSigno = document.querySelector('#txtSigno');
const txtRango = document.querySelector('#txtRango');
const txtArchi = document.querySelector('#txtArchi');
const btnLoad = document.querySelector('#btnLoad');

btnLoad.addEventListener('click', function () {
    const archivo = txtArchi.files[0];
    if (!archivo) {
        alert('Debe seleccionar una imagen');
        return;
    }
    
    const nomarch = archivo.name;
    const metadata = {
        contentType: archivo.type
    }

    const subir = container.child('zodiaco/' + nomarch).put(archivo, metadata);
    subir
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            const dt = new Date();
            db.collection("datosZodiaco").add({
                posic: parseInt(txtPosic.value),
                signo: txtSigno.value,
                rango: txtRango.value,
                url: url,
                fechaCreacion: dt,
                ultActualizacion: dt
            }).then(docRef => {
                alert("ID del registro: " + docRef.id);
                limpiar();
            }).catch(error => {
                alert("Error al subir la imagen: " + error);
            });
        });
});

function limpiar() {
    txtPosic.value = '';
    txtSigno.value = '';
    txtRango.value = '';
    txtArchi.value = '';
    txtPosic.focus();
}
