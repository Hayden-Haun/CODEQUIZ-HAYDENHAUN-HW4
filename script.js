var startBtn = $("#startBtn");
var timerEl = $("#timer");
var content = $(".content");
var questionNumber = $(".questionNumber");
var questions = $(".questions");

//JQUERY VARIABLE DECLARATIONS
var displayQuestion = $(".displayQuestion");
var answerList = $("#answerList");

var timeLeft = 10;
var counter = 0;
var userScoreCorrect = 0;
var userScoreIncorrect = 0;
var resultsDisplayed = false;

var questionArray = [
  {
    question:
      "Which programming language is not a fundamental of web development?",
    answers: ["A. HTML", "B. Python", "C. CSS", "D. JAVASCRIPT"],
    correctAnswer: 1,
  },
  {
    question:
      "What can you use to iterate through something a fixed amount of time?",
    answers: ["A. For Loop", "B. If Statement", "C. Array", "D. jQuery"],
    correctAnswer: 0,
  },
  {
    question:
      "What can you use to iterate through a set of commands until a specificed criteria is met?",
    answers: [
      "A. Bootstrap",
      "B. If Statement",
      "C. For Loop",
      "D. Do-While Loop",
    ],
    correctAnswer: 3,
  },
];

var numberOfQuestions = questionArray.length;

//UPDATE EVENT LISTENER FOR JQUERY
startBtn.on("click", startTimer);

function startTimer() {
  startBtn.remove();

  showNext();
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
  if (counter < numberOfQuestions) {
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
  } else {
    displayScore();
  }
}

answerList.on("click", "button", checkIfCorrect);

function checkIfCorrect() {
  var selectedAnswer = $(this).text();
  var correctAnswer =
    questionArray[counter].answers[questionArray[counter].correctAnswer];
  console.log("selected answer =" + selectedAnswer);
  console.log("correctAnswer = " + correctAnswer);
  //console.log(questionArray[counter].answers.indexOf(selectedAnswer));

  //console.log(selectedAnswer.indexOf($(this)));

  if (selectedAnswer == correctAnswer) {
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

function displayScore() {
  resultsDisplayed = true;
  var unansweredQuestions = numberOfQuestions - counter;
  questionNumber.text("QUIZ OVER.");
  displayQuestion.text("Stats:");

  var resultsQuestionsAnsweredLi = $(
    `<li class="listItemQuestion">ANSWERED QUESTIONS: ${counter} </li>`
  );

  var resultsQuestionsUnansweredLi = $(
    `<li class="listItemQuestion">UNANSWERED QUESTIONS: ${unansweredQuestions} </li>`
  );
  var resultsCorrectLi = $(
    `<li class="listItemQuestion">CORRECT ANSWERS: ${userScoreCorrect} </li>`
  );
  var resultsIncorrectLi = $(
    `<li class="listItemQuestion">WRONG ANSWERS: ${userScoreIncorrect} </li>`
  );
  var resultsTimeLeftLi = $(
    `<li class="listItemQuestion">TIME REMAINING: ${timeLeft} </li>`
  );

  answerList.append(resultsQuestionsUnansweredLi);
  answerList.append(resultsQuestionsAnsweredLi);
  answerList.append(resultsCorrectLi);
  answerList.append(resultsIncorrectLi);
  answerList.append(resultsTimeLeftLi);
}

function timeIsOut() {
  if (!resultsDisplayed) {
    removePrevious();
    displayScore();
  }
}
