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
progressBar.value = timeLeft
let historial = []
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

let randomResult = calculateResult()

function playTheGame() {
  buttonStart.disabled = true;
  inputResult.disabled = false;
  inputResult.focus()
  setInterval(() => {
    if (progressBar.value > 0) {
      progressBar.value -= 1
    } else if (progressBar.value == 0) {
      buttonStart.disabled = false;
      inputResult.disabled = true;
      progressBar.value = timeLeft
      clearInterval(this)
    }
  }, 1000);
  randomResult
}

inputResult.addEventListener("keyup", function(e){
  if(e.key === "Enter" && inputResult.value != ""){
    if(inputResult.value == randomResult){
      createMessage(true)
      randomResult = calculateResult()
      inputResult.value = ""
      score++
    }else {
      createMessage(false)
      randomResult = calculateResult()
      inputResult.value = ""
      score--
    }
  }
})


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

function createMessage(checkResult) {
  const div = document.createElement('div')
  const p = document.createElement('p')
  const resultValue = checkResult ? '¡Correct!' : '¡Incorrect!'
  const text = document.createTextNode(resultValue)

  if (resultValue == "¡Correct!") {
    div.setAttribute('class', 'absolute center-position teal white-text rounded p-1 animation')
  } else {
    div.setAttribute('class', 'absolute center-position red darken-1 white-text rounded p-1 animation')
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