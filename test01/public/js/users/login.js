// JavaScript Document

// Crear variable local para la base de datos Firestore
var db = firebase.apps[0].firestore();
var auth = firebase.apps[0].auth();

// Crear variables locales para los campos de entrada de la página web
const txtEmail = document.querySelector('#txtEmail');
const txtContra = document.querySelector('#txtContra');

// Crear variable local para el botón de inicio de sesión
const btnLogin = document.querySelector('#btnLogin');

// Asignar evento de escucha al botón de inicio de sesión
btnLogin.addEventListener('click', function() {
    // Verificar si el correo electrónico termina en "@empresa.com"
    if (txtEmail.value.endsWith("@empresa.com")) {
        auth.signInWithEmailAndPassword(txtEmail.value, txtContra.value)
            .then((userCredential) => {
                const user = userCredential.user;
                const dt = new Date();
                db.collection("datosUsuarios").where('idemp', '==', user.uid).get()
                    .then(function(docRef) {
                        docRef.forEach(function(doc) {
                            doc.ref.update({ ultAcceso: dt }).then(function() {
                                document.location.href = 'index.html';
                            });
                        });
                    })
                    .catch(function(FirebaseError) {
                        var mensaje = "Error al añadir el documento: " + FirebaseError;
                        alert(mensaje);
                    });
            })
            .catch((error) => {
                var mensaje = "Error al acceder como usuario: " + error.message;
                alert(mensaje);
            });
    } else {
        alert("Por favor, utiliza un correo electrónico que termine en '@empresa.com' para iniciar sesión.");
    }
});
