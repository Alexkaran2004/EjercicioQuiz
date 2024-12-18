function startQuiz() {
    window.location.href = 'questions.html';
}

function loadResults() {
    let results = JSON.parse(localStorage.getItem('quizResults')) || [];
    let ctx = document.getElementById('resultsChart').getContext('2d');
    let labels = results.map(result => result.date);
    let data = results.map(result => result.score);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Puntuación',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        }
    });
}

document.addEventListener('DOMContentLoaded', loadResults);
