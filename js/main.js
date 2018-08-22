// Questions array
const questions = [
  { question: "Enter Your First Name" },
  { question: "Enter Your Last Name" },
  { question: "Enter Your Email", pattern: /\S+@\S+\.\S+/ },
  { question: "Create Your Password", type: "password" }
];

//Transition times
const shakeTime = 100; //shake transition time
const switchTime = 200; //transition between questions

//init position on first question
let position = 0;

//init DOM elements
const formBox = document.querySelector("#form-box");
const nextBtn = document.querySelector("#next-btn");
const prevBtn = document.querySelector("#prev-btn");
const inputGroup = document.querySelector("#input-group");
const inputField = document.querySelector("#input-field");
const inputLabel = document.querySelector("#input-label");
const inputProgress = document.querySelector("#input-progress");
const progress = document.querySelector("#progress-bar");

//events
//get question on dom load
document.addEventListener("DOMContentLoaded", getQuestion);

//next boton click
nextBtn.addEventListener("click", validate);

//ingresando valor
inputField.addEventListener("input", changeColor);

//input field enter click
inputField.addEventListener("keyup", e => {
  if (e.keyCode == 13) {
    validate();
  }
});

//functions

//get question to array and add to markup
function getQuestion() {
  //get current question
  inputLabel.innerHTML = questions[position].question;
  //get current type
  inputField.type = questions[position].type || "text";
  //get current answer
  inputField.value = questions[position].answer || "";
  //focus current element
  inputField.focus();

  //set progress bar width- variable to the question arrray leght
  progress.style.width = (position * 100) / questions.length + "%";

  //add user icon or arrow
  prevBtn.className = position ? "fas fa-arrow-left" : "fas fa-user";

  showQuestion();
}

//display question
function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = "";
  inputProgress.style.width = "100%";
}

// hide question
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = "none";
  inputGroup.style.border = null;
}

//transform to create shake motion
function transform(x, y) {
  formBox.style.transform = `translate(${x}px,${y}px)`;
}

//validate file
function validate() {
  //make sure pattern matches if there is one
  if (!inputField.value.match(questions[position].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
}

//  fiel input fail
function inputFail() {
  formBox.className = "";
  formBox.className = "error";
  //repeat sahek motion - set number of chakes
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0);
    inputField.focus();
  }
}

//  fiel input pass
function inputPass() {
  formBox.className = "";
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  //store answer in array
  questions[position].answer = inputField.value;

  //increment position
  position++;
  //if new question, hide current and get next
  if (questions[position]) {
    hideQuestion();
    getQuestion();
  } else {
    //remove if no more questions
    hideQuestion();
    formBox.className = "close";
    progress.style.width = "100%";

    //form compleate
    formComplete();
  }
}

//ingresando valores correctos
function changeColor() {
  if (inputField.value != "") {
    formBox.className = "correct";
  } else {
    formBox.className = "";
  }
}

//all fields compleate- show h1 end
function formComplete() {
  //   console.log(questions);
  const h1 = document.createElement("h1");
  h1.classList.add("end");
  h1.appendChild(
    document.createTextNode(
      `Thanks ${
        questions[0].answer
      } You are registered and will get an email shortly`
    )
  );
  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => (h1.style.opacity = 1), 50);
  }, 500);

  formBox.style.display = "none";
}
