var startBtn = $("#startBtn");
var timerEl = $("#timer");
var content = $(".content");
var questionNumber = $(".questionNumber");
var questions = $(".questions");

//JQUERY VARIABLE DECLARATIONS
var displayQuestion = $("#displayQuestion");
var answerList = $("#answerList");

var counter = 0;

var questionArray = [
  {
    question:
      "Which programming language is not a fundamental of web development?",
    answers: ["HTML", "C++", "CSS", "JAVASCRIPT"],
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
  //UPDATE TO JQUERY LINGO
  //questionNumber.textContent = "Question # " + (counter + 1);
  questionNumber.text("Question #" + counter);
  var currentQuestion = questionArray[counter];
  displayQuestion.text(currentQuestion.question);
  for (var i = 0; i < currentQuestion.answers.length; i++) {
    var answerLi = $(
      `<li> <button> ${currentQuestion.answers[i]} </button> </li>`
    );
    answerList.append(answerLi);
  }
}

answerList.on("click", "button", checkIfCorrect);

function checkIfCorrect() {
  //console.log("THIS IS WORKING!!!");

  var selectedAnswer = $(this);
  var correctAnswer =
    questionArray[counter].answers[questionArray[counter].correctAnswer];
  console.log(selectedAnswer.text());
  console.log(correctAnswer);
}

function timeIsOut() {
  //console.log("timeIsOut working");
}
