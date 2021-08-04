//JQUERY VARIABLE DECLARATIONS
var startBtn = $("#startBtn");
var timerEl = $("#timer");
var content = $(".content");
var questionNumber = $(".questionNumber");
var questions = $(".questions");
var displayQuestion = $(".displayQuestion");
var answerList = $("#answerList");
var highScoreEl = $(".highScore");
var highScoreStorage = $(".highScoreStorage");
var highScoreList = $(".highScoreList");

var highScoreArray = [];

//GLOBAL - VARIABLE DECLARATIONS
var timeInitial = 60;
var timeLeft = timeInitial;
var counter = 0;
var userScoreCorrect = 0;
var userScoreIncorrect = 0;
var resultsDisplayed = false;

//DECLARE ARRAY OF OBJECTS FOR QUESTIONS, ANSWERS, CORRECT ANSWER
var questionArray = [
  {
    question:
      "Which of the following is not a fundamental programming language of web development?",
    answers: ["A. HTML", "B. Python", "C. CSS", "D. JAVASCRIPT"],
    correctAnswer: 1,
  },
  {
    question:
      "Which of the following can be used to execute a set of commands over and over again, for a specified number of iterations?",
    answers: ["A. For Loop", "B. If Statement", "C. Array", "D. jQuery"],
    correctAnswer: 0,
  },
  {
    question:
      "Which of the following can be used to execute a set of commands over and over again, until a specified criteria is met?",
    answers: [
      "A. Bootstrap",
      "B. If Statement",
      "C. For Loop",
      "D. Do-While Loop",
    ],
    correctAnswer: 3,
  },
  {
    question: "Hayden's favorite animal is the...",
    answers: ["A. Tiger", "B. Panda", "C. Sloth", "D. Dinosaur"],
    correctAnswer: 2,
  },
];

//DECLARE VARIABLE TO TRACK THE NUMBER OF QUESTIONS
var numberOfQuestions = questionArray.length;

//EVENT LISTENER FOR START BUTTON. CALLS STARTTIMER FUNCTION
startBtn.on("click", startTimer);

//THIS FUNCTION STARTS TIMER, REMOVES START BUTTON, AND CALLS SHOWNEXT FUNCTION
//IF TIME RUNS OUT, CALLS TIMEISOUTFUNCTION
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

//THIS FUNCTION DISPLAYS THE NEXT QUESTION & MULTIPLE CHOICE ANSWERS
function showNext() {
  if (counter < numberOfQuestions) {
    var displayNumber = counter + 1;

    questionNumber.text("Question #" + displayNumber);

    var currentQuestion = questionArray[counter];

    displayQuestion.text(currentQuestion.question);

    for (var i = 0; i < currentQuestion.answers.length; i++) {
      var answerLi = $(
        `<li class="listItemQuestion"> <button>${currentQuestion.answers[i]}</button> </li>`
      );
      answerList.append(answerLi);
    }
    //counter++;
  } else {
    displayScore();
  }
}

//EVENT LISTENER TO CALL NEXT FUNCTION WHEN USER SELECTS ANSWER
answerList.on("click", "button", checkIfCorrect);

function checkIfCorrect() {
  var selectedAnswer = $(this).text();
  var correctAnswer =
    questionArray[counter].answers[questionArray[counter].correctAnswer];

  var positionSelected = questionArray[counter].answers.indexOf(selectedAnswer);
  var positionCorrect = questionArray[counter].correctAnswer;

  //COMMENTS FOR DEBUGGING
  //console.log("selectedanswer =" + selectedAnswer);
  //console.log("correctAnswer = " + correctAnswer);
  //console.log("positionSelected = " + positionSelected);
  //console.log("positionCorrect =  " + positionCorrect);
  //console.log(questionArray[counter].answers.indexOf(selectedAnswer));

  //console.log(selectedAnswer.indexOf($(this)));

  if (selectedAnswer == correctAnswer) {
    userScoreCorrect++;
  } else {
    userScoreIncorrect++;
    timeLeft = timeLeft - 15;
  }
  counter++;
  removePrevious();
  showNext();
}

//THIS FUNCTION REMOVES THE INFORMATION FROM THE PREVIOUS QUESTION
function removePrevious() {
  var listItemQuestion = $(".listItemQuestion");
  listItemQuestion.remove();
}

//THIS FUNCTION DISPLAYS THE RESULTS OF THE USER'S GAME. ADDS A BUTTON TO VIEW HIGHSCORES
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
    `<li class="listItemQuestion">QUIZ COMPLETED WITH: ${timeLeft} SECONDS REMAINING </li>`
  );

  answerList.append(resultsQuestionsUnansweredLi);
  answerList.append(resultsQuestionsAnsweredLi);
  answerList.append(resultsCorrectLi);
  answerList.append(resultsIncorrectLi);
  answerList.append(resultsTimeLeftLi);

  var highScorePage = $(
    `<button class="highScoreBtn"> Click Here to save your score and see other high scores!</button>`
  );

  highScoreEl.append(highScorePage);
}

//FUNCTION ENDS GAME IF TIME RUNS OUT. THE CODE WILL ONLY EXECUTE IF THE USER HAS NOT ALREADY FINISHED THE GAME.
function timeIsOut() {
  if (!resultsDisplayed) {
    removePrevious();
    displayScore();
  }
}

//EVENT LISTENER FOR CLICK ON HIGH SCORE BUTTON
highScoreEl.on("click", "button", highScores);

//FUNCTION TO DISPLAY HIGH SCORE STORAGE PAGE
function highScores() {
  removePrevious();

  var highScoreBtn = $(".highScoreBtn");
  highScoreBtn.remove();

  questionNumber.text("RECORD YOUR SCORE HERE:");
  displayQuestion.text("Your score: " + userScoreCorrect);

  var initialInput =
    $(`<input type="text" placeholder="Enter your initials here" name="initialInput"
    id="initialInput"
  />`);

  var submitScore = $(`<button class="submitScore"> SUBMIT</button>`);

  highScoreStorage.append(initialInput);
  highScoreStorage.append(submitScore);

  //EVENT LISTENER TO STORE INITIALS AND SCORE TO LOCAL STORAGE
  var submitScoreBtn = $(`.submitScore`);
  submitScoreBtn.on("click", "button", highScoreList);
}

function highScoreList() {
  // var highScoreInput1 =
  console.log("THIS IS WORKING");
  // var storedScores = JSON.parse(
  //   localStorage.setItem("highScoreArray", JSON.stringify(highScoreArray))
  // );
}
