let botonDeEncriptar = document.getElementById("botonDeEncriptar");
let botonDeDesencriptar = document.getElementById("botonDeDesencriptar");
let botonDeCopiar = document.getElementById("botonDeCopiar");
var texto = document.getElementById("escribir");
let textoSalida = document.querySelector(".texto-salida");
const abrirModal = document.getElementById('btn-abrir-modal');
const cerrarModal = document.getElementById('btn-cerrar-modal');
const modal = document.getElementById('modal');
let mensajeEncriptado = "";
let textoDesencriptado = "";

const vocales = ["a", "e", "i", "o", "u"];
const clave = [/ai/g, /enter/g, /imes/g, /ober/g, /ufat/g];

function remplazarVocal(letra) {
    let vocalSecreta = "";
    for (let vocal = 0; vocal < vocales.length; vocal++) {
        if (vocales[vocal] == letra) {
            vocalSecreta = vocalSecreta + clave[vocal].source;
            break;
        }
    }
    return vocalSecreta;
}

function encriptar() {
    let mensaje = texto.value.toLowerCase();    

    for (let posicion = 0; posicion < mensaje.length; posicion++) {

        let letra = mensaje[posicion];

        if (vocales.includes(letra)) {
            mensajeEncriptado = mensajeEncriptado + remplazarVocal(letra);
        } else {
            mensajeEncriptado = mensajeEncriptado + letra;
        }
    }

    textoSalida.innerHTML = mensajeEncriptado;
}

function copiarTexto() {
    texto = mensajeEncriptado.valueOf();    
    navigator.clipboard.writeText(texto);
    textoSalida.innerHTML = "";
    texto.value = "";
    pegarTexto();     
}

function pegarTexto() {
    navigator.clipboard.readText().then(texto => {
        document.getElementById("escribir").value = texto;
    })
}

function desencriptar() {
    let textoEncriptado = document.getElementById("escribir").value.toLowerCase();
    
    for (let i = 0; i < clave.length; i++) {
        textoEncriptado = textoEncriptado.replace(clave[i], vocales[i]);
    }   

    textoSalida.innerHTML = textoEncriptado;    
}

abrirModal.addEventListener('click', ()=>{
    modal.showModal();
});

cerrarModal.addEventListener('click', ()=>{
    modal.close();
})

botonDeEncriptar.onclick = encriptar;
botonDeCopiar.onclick = copiarTexto;
botonDeDesencriptar.onclick = desencriptar;