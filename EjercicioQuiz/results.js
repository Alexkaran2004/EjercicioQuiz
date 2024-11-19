// function loadResults() {
//     let results = JSON.parse(localStorage.getItem('quizResults')) || [];
//     let resultsContent = document.getElementById('resultsContent');
//     resultsContent.innerHTML = '';
//     results.forEach(result => {
//         let div = document.createElement('div');
//         div.innerText = `Puntuación: ${result.score}`;
//         resultsContent.appendChild(div);
//     });
// }

// function goHome() {
//     window.location.href = 'home.html';
// }

// document.addEventListener('DOMContentLoaded', loadResults);

function loadResults() {
    let results = JSON.parse(localStorage.getItem('quizResults')) || [];
    let resultsContent = document.getElementById('resultsContent');
    resultsContent.innerHTML = '';
    results.forEach(result => {
        let div = document.createElement('div');
        div.innerText = `Fecha: ${result.date} - Puntuación: ${result.score}`;
        resultsContent.appendChild(div);
    });
}

function goHome() {
    window.location.href = 'home.html';
}

document.addEventListener('DOMContentLoaded', loadResults);
