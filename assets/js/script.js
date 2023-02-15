//Variables representing DOM elements

let landingScreen = document.querySelector("start-screen");
let quizScreen = document.querySelector("#quiz-section");
let questionsEl = document.querySelector("#questions");
let timerEl = document.querySelector("#timer");
let choicesEl = document.querySelector("#choices");
let submitBtn = document.querySelector("#submit-score");
let startBtn = document.querySelector("#start");
let initialsEl = document.querySelector("#initials");
let feedbackEl = document.querySelector("#feedback");
let reStartBtn = document.querySelector("#restart");


// Variables for the beginning part of the quiz.

let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;



// Start of quiz

function quizStart() {
    let landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    timerId = setInterval(tick, 1000);
    timerEl.textContent = time;

    getQuestion();
}

// Getting the current question from the array.

function getQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let titleEl = document.getElementById("question-title")
    titleEl.textContent = currentQuestion.title;
    choicesEl.innerHTML = "";
    currentQuestion.choices.forEach(function(choice, i) {
        let choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}

// Checking if the answer is correct or not.

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
      time -= 10;
      if (time < 0) {
        time = 0;
      }
      timerEl.textContent = time;
      feedbackEl.textContent = `Wrong! The correct answer was ${questions[currentQuestionIndex].answer}.`;
    } else {
      feedbackEl.textContent = "Correct!";
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 2000);
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      endQuiz();
    } else {
      getQuestion();
    }
}

// End of the quiz.

function endQuiz() {
    clearInterval(timerId);
    let endScreenEl = document.getElementById("end-quiz");
    endScreenEl.removeAttribute("class");
    let finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}


// Quiz ends when timer reaches 0.

function tick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      quizEnd();
    }
}

// Save the scores in the local storage.

function saveHighscore() {
    let initials = initialsEl.value.trim();
    if (initials !== "") {
      let highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
      let newScore = {
        score: time,
        initials: initials
      };
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
    }
}


function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}
initialsEl.onkeyup = checkForEnter;

// Save user's score with submit button.

submitBtn.onclick = saveHighscore;

// Start the quiz.

startBtn.onclick = quizStart;

