const firstNumber = document.querySelector("#firstNumber")
const secondNumber = document.querySelector("#secondNumber")
const operation = document.querySelector("#operation")
const inputResult = document.querySelector("#inputResult")
const buttonStart = document.querySelector("#buttonStart")
const progressBar = document.querySelector("#progressBar")
const message = document.querySelector("#message")
const body = document.querySelector("body")
const spanTitle = document.querySelector("#spanTitle")
const operations = ["+", "-", "x"]
let score = 0
let timeLeft = 30
let historial = []
let countAnswers = 0
inputResult.disabled = true

randomOperationTitle()

// Eventos
buttonStart.addEventListener("click", playTheGame)

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function randomOperationTitle() {
  setInterval(() => {
    spanTitle.textContent = " " + randomOperation()
    spanTitle.setAttribute("class", "absolute teal-text")
  }, 500);
}
// Time function

let timeInterval;

function timeLeftInterval() {
  if (!timeInterval) {
    timeInterval = setInterval(time, 1000)
  }
}

function time() {
  if (progressBar.value > 0) {
    progressBar.value--
  } else if (progressBar.value == 0) {
    buttonStart.disabled = false;
    inputResult.disabled = true;
    firstNumber.textContent = ""
    operation.textContent = ""
    secondNumber.textContent = ""
    secondNumber.textContent = ""
    inputResult.value = ""
    setTimeout(() => {
      showScores()
      clearInterval(timeInterval);
      setTimeout(() => {
        score = 0
        countAnswers = 0
      }, 1000);
      // release our intervalID from the variable
      timeInterval = null;
    }, 1000);
  }
}

function playTheGame() {
  progressBar.value = timeLeft
  buttonStart.disabled = true;
  inputResult.disabled = false;
  inputResult.value = ""
  inputResult.placeholder = ""
  inputResult.focus()
  timeLeftInterval()
  let randomResult = calculateResult()
  inputResult.addEventListener("keyup", function (e) {
    if (e.key === "Enter" && inputResult.value != "") {
      if (inputResult.value == randomResult) {
        displayMessage(true)
        randomResult = calculateResult()
        inputResult.value = ""
        score++
      } else {
        displayMessage(false)
        randomResult = calculateResult()
        inputResult.value = ""
      }
      countAnswers++
    }
  })
}

function showScores() {
  const div = document.createElement('div')
  const p = document.createElement('p')
  const text = document.createTextNode("Score:" + score +", Answers: "+ countAnswers)
  div.setAttribute('class', 'absolute center-top-position teal white-text fs-1 rounded p-1 animation')
  p.appendChild(text)
  div.appendChild(p)
  body.appendChild(div)
  setTimeout(() => {
    div.remove()
  }, 5000);
}


function calculateResult() {
  let total = 0
  let number1 = getRandomInt(0, 9)
  let number2 = getRandomInt(0, 9)
  firstNumber.textContent = number1
  secondNumber.textContent = number2
  let randomOp = randomOperation()
  operation.textContent = randomOp
  switch (randomOp) {
    case "+":
      total = number1 + number2
      break;
    case "-":
      total = number1 - number2
      break;
    case "x":
      total = number1 * number2
      break;
  }
  return total
}

function displayMessage(checkResult) {
  const div = document.createElement('div')
  const p = document.createElement('p')
  const resultValue = checkResult ? "¡Correct!" : "¡Incorrect!";
  const text = document.createTextNode(resultValue)

  if (resultValue == "¡Correct!") {
    div.setAttribute('class', 'absolute center-top-position teal white-text rounded p-1 animation')
  } else {
    div.setAttribute('class', 'absolute center-top-position red darken-1 white-text rounded p-1 animation')
  }

  p.appendChild(text)
  div.appendChild(p)
  body.appendChild(div)
  setTimeout(() => {
    div.remove()
  }, 2000);
}

function randomOperation() {
  return operations[getRandomInt(0, 3)]
}