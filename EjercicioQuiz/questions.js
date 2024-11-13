let questions = [];
let currentQuestionIndex = 0;
let score = 0;

async function fetchQuestions() {
    let response = await fetch('https://opentdb.com/api.php?amount=10&category=15&difficulty=hard');
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
    window.location.href = 'results.html';
}

document.addEventListener('DOMContentLoaded', fetchQuestions);
