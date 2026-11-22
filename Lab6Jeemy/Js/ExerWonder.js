//Stores questions, options, and correct answer index
const questions = [
    {
        question: "Which HTML tag is used to include JavaScript code inside an HTML document?",
        options: ["<js>", "<scripting>", "<script>", "<javascript>"],
        answer: 2
    },
    {
        question: "Which JavaScript method selects an HTML element by its id attribute?",
        options: ["getElementById()", "getElementsByClass()", "querySelectorAll()", "getElementByName()"],
        answer: 0
    },
    {
        question: "Which method prevents a browser's default action, such as opening the right-click menu?",
        options: ["stopAction()", "event.preventDefault()", "cancelDefault()", "disableEvent()"],
        answer: 1
    },
    {
        question: "What does Math.floor(Math.random() * 10) + 1 generate?",
        options: ["A decimal between 0 and 1", "An integer between 0 and 9", "An integer between 1 and 10", "An integer between 1 and 11"],
        answer: 2
    },
    {
        question: "Where does client-side form validation take place?",
        options: ["On the web server", "In the database", "In the user's web browser", "On the DNS server"],
        answer: 2
    }
];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedOptionIndex = null;
let timerInterval = null;
const TIME_LIMIT = 15; // seconds per question

//DOM Elements
const questionProgressEl = document.getElementById("question-progress");
const timeLeftEl = document.getElementById("time-left");
const questionTextEl = document.getElementById("question-text");
const optionsContainerEl = document.getElementById("options-container");
const feedbackSectionEl = document.getElementById("feedback-section");
const feedbackTextEl = document.getElementById("feedback-text");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreDisplayEl = document.getElementById("score-display");

//Randomly shuffles the questions array
function shuffleQuestions() {
    shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
}

//Sets a countdown timer for answering each question
function startTimer() {
    clearInterval(timerInterval);
    let timeLeft = TIME_LIMIT;
    timeLeftEl.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timeLeftEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeOut();
        }
    }, 1000);
}

//Automatically handles when the timer runs out
function handleTimeOut() {
    const currentQ = shuffledQuestions[currentQuestionIndex];
    const buttons = optionsContainerEl.querySelectorAll(".option-btn");

    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === currentQ.answer) {
            btn.classList.add("correct");
        }
    });

    feedbackSectionEl.className = "feedback-incorrect";
    feedbackTextEl.textContent = `Time's up! The correct answer was: ${currentQ.options[currentQ.answer]}`;

    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
}

//Displays the current question and answer options
function displayQuestion() {
    selectedOptionIndex = null;
    submitBtn.disabled = true;
    submitBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
    feedbackSectionEl.className = "hidden";

    const currentQ = shuffledQuestions[currentQuestionIndex];
    questionProgressEl.textContent = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
    questionTextEl.textContent = currentQ.question;

    optionsContainerEl.innerHTML = "";
    currentQ.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.className = "option-btn";
        button.textContent = option;
        button.onclick = () => selectOption(index, button);
        optionsContainerEl.appendChild(button);
    });

    startTimer();
}

//Highlights the user's selected answer before submitting
function selectOption(index, selectedButton) {
    selectedOptionIndex = index;
    submitBtn.disabled = false;

    const buttons = optionsContainerEl.querySelectorAll(".option-btn");
    buttons.forEach(btn => btn.classList.remove("selected"));
    selectedButton.classList.add("selected");
}

//Checks whether the selected answer is correct and updates the score
function checkAnswer() {
    if (selectedOptionIndex === null) return;

    clearInterval(timerInterval);
    const currentQ = shuffledQuestions[currentQuestionIndex];
    const buttons = optionsContainerEl.querySelectorAll(".option-btn");

    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === currentQ.answer) {
            btn.classList.add("correct");
        } else if (idx === selectedOptionIndex) {
            btn.classList.add("incorrect");
        }
    });

    if (selectedOptionIndex === currentQ.answer) {
        score++;
        feedbackSectionEl.className = "feedback-correct";
        feedbackTextEl.textContent = "Correct! Well done.";
    } else {
        feedbackSectionEl.className = "feedback-incorrect";
        feedbackTextEl.textContent = `Incorrect. The correct answer is: ${currentQ.options[currentQ.answer]}`;
    }

    scoreDisplayEl.textContent = `Current Score: ${score} / ${shuffledQuestions.length}`;
    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
}

//Moves to the next question or finishes the quiz
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < shuffledQuestions.length) {
        displayQuestion();
    } else {
        finishQuiz();
    }
}

//Displays final results when all questions are answered
function finishQuiz() {
    clearInterval(timerInterval);
    questionProgressEl.textContent = "Quiz Completed";
    questionTextEl.textContent = "Thank you for completing the quiz!";
    optionsContainerEl.innerHTML = "";
    feedbackSectionEl.className = "feedback-correct";
    feedbackTextEl.textContent = `Final Score: ${score} out of ${shuffledQuestions.length} (${Math.round((score / shuffledQuestions.length) * 100)}%)`;

    submitBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");
    scoreDisplayEl.textContent = `Final Score: ${score} / ${shuffledQuestions.length}`;
}

//Starts or restarts the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    restartBtn.classList.add("hidden");
    shuffleQuestions();
    scoreDisplayEl.textContent = `Current Score: 0 / ${shuffledQuestions.length}`;
    displayQuestion();
}

//Initialize quiz on page load
startQuiz();
