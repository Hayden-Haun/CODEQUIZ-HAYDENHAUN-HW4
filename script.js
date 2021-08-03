var startBtn = $("#startBtn");
var timerEl = $("#timer");
var content = $(".content");
var questionNumber = $(".questionNumber");
var questions = $(".questions");

//JQUERY VARIABLE DECLARATIONS
var displayQuestion = $(".displayQuestion");
var answerList = $("#answerList");

var counter = 0;
var userScoreCorrect = 0;
var userScoreIncorrect = 0;

var questionArray = [
  {
    question:
      "Which programming language is not a fundamental of web development?",
    answers: ["A. HTML", "B. Python", "C. CSS", "D. JAVASCRIPT"],
    correctAnswer: 1,
  },
  {
    question: "question2?",
    answers: ["A", "B", "C", "D"],
    correctAnswer: 2,
  },
  {
    question: "question3?",
    answers: ["A", "B", "C", "D"],
    correctAnswer: 3,
  },
];

//UPDATE EVENT LISTENER FOR JQUERY
startBtn.on("click", startTimer);

function startTimer() {
  startBtn.remove();
  console.log("THIS IS WORKING!!!");

  showNext();
  var timeLeft = 10;
  var timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.text(timeLeft);
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.text(timeLeft);
      timeLeft--;
    } else {
      timerEl.text(0);
      clearInterval(timeInterval);
      timeIsOut();
    }
  }, 1000);
}

function showNext() {
  var displayNumber = counter + 1;

  questionNumber.text("Question #" + displayNumber);

  var currentQuestion = questionArray[counter];

  displayQuestion.text(currentQuestion.question);

  for (var i = 0; i < currentQuestion.answers.length; i++) {
    var answerLi = $(
      `<li class="listItemQuestion"> <button> ${currentQuestion.answers[i]} </button> </li>`
    );
    answerList.append(answerLi);
  }
  //counter++;
}

answerList.on("click", "button", checkIfCorrect);

function checkIfCorrect() {
  var selectedAnswer = $(this);
  var correctAnswer =
    questionArray[counter].answers[questionArray[counter].correctAnswer];
  console.log(selectedAnswer.text());
  console.log(correctAnswer);

  if (selectedAnswer === correctAnswer) {
    userScoreCorrect++;
  } else {
    userScoreIncorrect++;
  }
  counter++;
  removePrevious();
  showNext();
}

function removePrevious() {
  var listItemQuestion = $(".listItemQuestion");
  listItemQuestion.remove();
}

function timeIsOut() {}
