fetch('https://opentdb.com/api.php?amount=10&category=27&difficulty=hard')
.then(res => res.json())
.then(json => console.log(json));

function questions() {
let preguntas = document.createElement('div');
let contenidopreguntas = document.createElement('');
let textopreguntas = document.createTextNode(text);
preguntas.appendChild(textopreguntas);
contenidopreguntas.appendChild(preguntas);
document.body.appendChild(contenidopreguntas);

}

function answers() {
    let respuestas = document.createElement('div');
    let contenidorespuestas = document.createElement('');
    let textorespuestas = document.createTextNode(text); 
    respuestas.appendChild(textorespuestas);
    contenidorespuestas.appendChild(respuestas);
    document.body.appendChild(contenidorespuestas);

}