let questions = [];
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    document.querySelector('h1').style.display = 'none';
    document.querySelector('button').style.display = 'none';
    document.querySelector('h2').style.display = 'none';
    document.getElementById('resultsChart').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    fetchQuestions();
}

async function fetchQuestions() {
    let response = await fetch('https://opentdb.com/api.php?amount=10&category=27&difficulty=hard');
    let data = await response.json();
    questions = data.results.map(q => ({
        question: q.question,
        options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
        correct: q.correct_answer
    }));
    loadQuestion();
}

function loadQuestion() {
    let question = questions[currentQuestionIndex];
    document.getElementById('question').innerText = question.question;
    let options = document.getElementById('options');
    options.innerHTML = '';
    question.options.forEach((option, index) => {
        let button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => selectOption(index);
        options.appendChild(button);
    });
}

function selectOption(index) {
    if (questions[currentQuestionIndex].options[index] === questions[currentQuestionIndex].correct) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    let results = JSON.parse(localStorage.getItem('quizResults')) || [];
    results.push({ date: new Date().toLocaleDateString(), score: score });
    localStorage.setItem('quizResults', JSON.stringify(results));
    showResults();
}

function showResults() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('results').style.display = 'block';
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
    document.getElementById('results').style.display = 'none';
    document.querySelector('h1').style.display = 'block';
    document.querySelector('button').style.display = 'block';
    document.querySelector('h2').style.display = 'block';
    document.getElementById('resultsChart').style.display = 'block';
    loadResults();
}

function loadResults() {
    let results = JSON.parse(localStorage.getItem('quizResults')) || [];
    let ctx = document.getElementById('resultsChart').getContext('2d');
    let labels = results.map(result => result.date);
    let data = results.map(result => result.score);

    new Chart(ctx, {
        type: 'line',
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
