var startBtn = document.querySelector("#startBtn");
var timerEl = document.getElementById("timer");
var content = document.querySelector(".content");
var questionNumber = document.querySelector(".questionNumber");
var questions = document.querySelector(".questions");
var answerList = document.querySelector(".answerList");

var counter = 0;

var questionArray = [
  "What is the best method to iterate through something with a fixed number of iterations?",
  "What is my name?",
  "what is your name?",
];

startBtn.addEventListener("click", function () {
  startTimer();
  firstQuestion();
});

function startTimer() {
  var timeLeft = 10;
  var timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = timeLeft;
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = timeLeft;
      timeLeft--;
    } else {
      timerEl.textcontent = "0";
      clearInterval(timeInterval);
      timeIsOut();
    }
  }, 1000);
}

function firstQuestion() {
  questionNumber.textContent = "Question #1";
  questions.textContent = "What is your name?";
}

function timeIsOut() {
  console.log("timeIsOut working");
}
