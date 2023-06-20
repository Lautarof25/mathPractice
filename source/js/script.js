const firstNumber = document.querySelector("#firstNumber")
const secondNumber = document.querySelector("#secondNumber")
const operation = document.querySelector("#operation")
const inputResult = document.querySelector("#inputResult")
const buttonStart = document.querySelector("#buttonStart")
const progressBar = document.querySelector("#progressBar")
const message = document.querySelector("#message")
const body = document.querySelector("body")


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}

const operations = ["+","-","x"]

buttonStart.addEventListener("click", playTheGame)

function playTheGame(){
  
}

function calculateResult(){
  let total = 0
  let number1 = getRandomInt(0, 9)
  let number2 = getRandomInt(0, 9)
  firstNumber.textContent = number1
  secondNumber.textContent = number2
  let randomOp = randomOperation()
  operation.textContent = randomOp
  switch(randomOp){
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

inputResult.addEventListener("keyup", enterResult)

function enterResult(e){
  let inputValue = Number(inputResult.value)
  let randomRes = calculateResult()
  let checkResult = inputValue == randomRes
  if(e.key === "Enter" && inputValue != ""){
     createMessage(checkResult)
  }
}

function createMessage(checkResult){
  const div = document.createElement('div')
  const p = document.createElement('p')
  const resultValue = checkResult ? '¡Correct!' : '"¡Incorrect!"'
  const text = document.createTextNode(resultValue)
  
  if(resultValue == "¡Correct!"){
    div.setAttribute('class','absolute center-position teal white-text rounded p-1 animation')
  }else{
    div.setAttribute('class','absolute center-position red darken-1 white-text rounded p-1 animation')
  }
  
  p.appendChild(text)
  div.appendChild(p)
  body.appendChild(div)
  setTimeout(() => {
    div.remove()
  }, 2000);
}


  
function randomOperation(){
  return operations[getRandomInt(0, 3)]
}






