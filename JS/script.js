const inputs = document.querySelectorAll("form input"),
  data = document.querySelectorAll(".container .showQs p"),
  btnAdd = document.querySelector(".add"),
  btnReset = document.querySelector(".reset");

let choices = [],
  questions = [],
  answer,
  questionText,
  timeDelay = null;

// push data to questions db when click add button
async function postQuestions() {
  let i = 0;
  let generateRandomId = Math.floor(Math.random() * 20);
  try {
    await fetch("http://localhost:3000/questions/", {
      method: "POST",
      headers: { "content-type": "application/json; charset= UTF-8" },
      body: JSON.stringify({
        id: generateRandomId,
        question: questionText,
        choices: choices,
        answer: answer,
        timeDelay: timeDelay,
      }),
    }).then((data) => {
      data.json();
    });
  } catch (error) {
    alert(error);
    return questions;
  }
}

// async function getQuestions() {
//   await fetch("http://localhost:3000/questions/", {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       questions = data;
//     });
// }
// getQuestions();

function AddQuestion() {
  let i = 1;
  // let getRandomId = Math.floor(Math.random() * 100);
  inputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      e.preventDefault();
      let id = e.target.id;
      data.forEach((dis) => {
        if (id === "question" && id === dis.id) {
          questionText = e.target.value;
          dis.innerHTML = questionText;
        } else if (id === "choice" && id === dis.id) {
          choices.push({ value: e.target.value });
          dis.innerHTML += ` ${i++}. ${e.target.value} `;
        } else if (id === "answer" && id === dis.id) {
          answer = e.target.value;
          dis.innerHTML = answer;
        } else if (id === "TimeDelay" && id === dis.id) {
          console.log(e.target.value);
          timeDelay = e.target.value;
          dis.innerHTML = timeDelay;
        }
      });
      
    });
  });
}
AddQuestion();

btnAdd.addEventListener("click", (e) => {
  postQuestions();
  e.preventDefault();
});

btnReset.addEventListener("click", (e) => {
  inputs.forEach((input) => {
    if (input.value !== "") {
      input.value = "";
    }
  });
  data.forEach((d) => {
    d.innerHTML = "";
  });
});
