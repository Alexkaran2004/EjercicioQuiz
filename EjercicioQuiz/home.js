function startQuiz() {
    window.location.href = 'questions.html';
}

function loadResults() {
    let results = JSON.parse(localStorage.getItem('quizResults')) || [];
    let resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';
    results.forEach(result => {
        let div = document.createElement('div');
        div.innerText = `Fecha: ${result.date} - Puntuación: ${result.score}`;
        resultsList.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', loadResults);
