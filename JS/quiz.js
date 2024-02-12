const displayContainer = document.querySelector(".displayQuestions form .questions"),
  URL_QUESTIONS_API = "http://localhost:3000/questions",
  nextButton = document.querySelector(".next-button"),
  answersButtons = document.querySelector(".answers"),
  time = document.querySelector(".card .timer"),
  questionText = document.querySelector(".questionTxt"),
  card = document.querySelector(".card");

let questions = [],
  Answers = [],
  QuestionId,
  questionTxt,
  answer,
  currentIndex = 0,
  score = 0,
  counter;


function startQuiz() {
  currentIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestions();
}

// delete all previous answers
function resetState() {
  while (answersButtons.firstChild) {
    answersButtons.removeChild(answersButtons.firstChild);
  }
}
// get questions and write HTML by using DOM Node
async function showQuestions() {
  resetState();

  await fetch(URL_QUESTIONS_API, {
    method: "GET",
    headers: { "content-type": "application/json ; charset: UTF-8" },
  })
    .then((response) => response.json())
    .then((data) => {
      questions = data;
    });
  
  let currentQuestion = questions[currentIndex],
    questionNumber = currentIndex + 1;

  card.id = currentQuestion.id;
  let timer = currentQuestion.timeDelay;
  startTimer(timer)
  
  questionText.innerHTML = ` ${questionNumber} . ${currentQuestion.question}`;

  currentQuestion.choices.forEach((element) => {
    const button = document.createElement("button");
    button.innerHTML = element.value;
    button.className = "btn my-1";
    button.type = "button";
    answersButtons.appendChild(button);

    // get the true answer ,then mark it with dataset value true
    if (element.value === currentQuestion.answer) {
      button.dataset.correct = "true";
    } else {
      button.dataset.correct = "false";
    }

    button.addEventListener("click", selectAnswer);
  });
}

function selectAnswer(event) {
  QuestionId = event.target.closest(".card").getAttribute("id");
  questionTxt = event.target.closest(".card").children[1].innerHTML;
  answer = event.target.innerHTML;
  let selectedBtn = event.target,
    isCorrect = selectedBtn.dataset.correct === "true",
    timer = questions[currentIndex].timeDelay;

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
    clearInterval(counter)
    setTimeout(handleNextButton, 1000)

  } else {
    selectedBtn.classList.add("inCorrect");
    clearInterval(counter)
    setTimeout(handleNextButton, 1000);
  }

  // get the right answer when clicked on wrong answer and then disable all buttons
  Array.from(answersButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

// function createAnswer() {
//   console.log("-> createAnswer");
//   Answers.push({
//     questionId: QuestionId,
//     questionTxt: questionTxt,
//     answer: answer,
//   });

//   let redundantans = Answers.some(
//     (e) => e.questionId === userAnswer[currentIndex].questionId && e.answer !== userAnswer[currentIndex].answer
//   );

//   // delete a redundant object answer
//   if (Answers !== null && redundantans) {
//     Answers = [...Answers];
//     const objIndex = Answers.findIndex((obj) => obj.questionId == QuestionId);
//     Answers.splice(objIndex, 1);
//   }
//   console.log(Answers);
//   localStorage.setItem("Answers", JSON.stringify(Answers));
// }

// btnSubmit.addEventListener("click", onSubmit);

function showScore() {
  resetState();
  nextButton.style.display = "none";
  questionText.innerHTML = `you have scored ${score} / ${questions.length}`;

  time.parentElement.remove();
}

function handleNextButton() {
  currentIndex++;
  if (currentIndex < questions.length) {
    clearInterval(counter)
    showQuestions();
  } else {
    showScore();
  }
}



nextButton.addEventListener("click", () => {
  let timer = questions[currentIndex].timeDelay
  if (currentIndex < questions.length ) {
    handleNextButton();
    clearInterval(counter)
  }
});

function startTimer(timeCount) {
  counter = setInterval( timer, 1000);
  function timer() {
    time.innerHTML = timeCount;
    timeCount--;
    if (timeCount <= 0) { 
      clearInterval(counter);
      time.innerHTML = questions[currentIndex].timeDelay
      handleNextButton()
    }
  }
}

startQuiz();
