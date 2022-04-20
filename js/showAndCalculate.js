import dataSet from '../data/setOfData.json' assert { type: 'json' };

let level = 0;
let subLevel = 0;
let questionType = 0;
let currentQuestion = 0;
let nextQuestion;
let operation; //inutile ?
let par; //inutile ?
let sign; //inutile ?
let rangeMin; //inutile ?
let rangeMax; //inutile ?

//add condition

function randomNum(rangeMin, rangeMax) {
  let num = Math.floor(Math.random() * (rangeMax - rangeMin)) + rangeMin;
  return num;
}

function showNum(par, sign, num) {
  //display a number with parenthesis and sign
  let parStart;
  let parEnd;
  if (Number(par) === 1) {
    parStart = '(';
    parEnd = ')';
  } else {
    parStart = '';
    parEnd = '';
  }
  return `${parStart}${sign}${num}${parEnd}`;
}

function numberNum(sign, num) {
  //get the sign and the number
  if (sign === '-') {
    num = -num;
  }
  return `${num}`;
}

function showOperation(showNum1, varOperator, showNum2) {
  //display the operation
  return `${showNum1} ${varOperator} ${showNum2} = ?`;
}

function calculateComputerAnswer(num1, operator, num2) {
  let result;
  if (operator === '+') {
    result = num1 + num2;
  } else result = num1 - num2;
  return result;
}

function whichOperation(l, s, t) {
  let min = Number(dataSet[l][s][t].min);
  let max = Number(dataSet[l][s][t].max);
  let varPar1 = Number(dataSet[l][s][t].par1);
  let varSign1 = dataSet[l][s][t].sign1;
  let varRangeMin1 = Number(dataSet[l][s][t].rangeMin1);
  let varRangeMax1 = Number(dataSet[l][s][t].rangeMax1);
  let varPar2 = Number(dataSet[l][s][t].par2);
  let varSign2 = dataSet[l][s][t].sign2;
  let varRangeMin2 = Number(dataSet[l][s][t].rangeMin2);
  let varRangeMax2 = Number(dataSet[l][s][t].rangeMax2);
  let varOperator = dataSet[l][s][t].operator;
  let num1 = randomNum(varRangeMin1, varRangeMax1);
  let num2 = randomNum(varRangeMin2, varRangeMax2);
  let showNum1 = showNum(varPar1, varSign1, num1);
  let showNum2 = showNum(varPar2, varSign2, num2);
  num1 = Number(numberNum(varSign1, num1));
  num2 = Number(numberNum(varSign2, num2));
  let varShowOperation = showOperation(showNum1, varOperator, showNum2);
  let result = calculateComputerAnswer(num1, varOperator, num2);
  let exercise = { varShowOperation, num1, num2, result, min, max };
  return exercise;
}

function showCurrentQuestion(l, s, t) {
  let questionDiv = document.querySelector('.instruction');
  let operationText = document.createTextNode(
    whichOperation(l, s, t).varShowOperation
  );
  questionDiv.appendChild(operationText);
}

function changeCurrentQuestion(l, s, t) {
  currentQuestion = '';
  showCurrentQuestion(l, s, t);
}
changeCurrentQuestion(0, 1, 0);
// console.log(result);

//succession of attempts

let answer = false; //à revoir après intégration
let currentInput = document.querySelector('.attempt'); ////à revoir après intégration
//1st attempt : la question apparaît dans le cadre, la box 1st attempt est là avec son placeholder, pas de case correction à droite
// si réponse juste : fa-check (left), correction mode x (right) puis next question
// si réponse fausse : fa-xmark(left), cadre réponse grisé, disparition clickbutton, correction mode y (right) puis 2nd attempt apparaît

//2nd attempt : la question apparaît dans le cadre, la box 2nd attempt est là
// si réponse juste : correction mode x (right) puis next question
// si réponse fausse : correction mode y  (right) puis 3rd attempt apparaît

// function showCurrentQuestion() {
//   let questionBox = document.querySelector('.instruction');
//   let operationText = document.createTextNode('6 + 7 = ?'); //
//   questionBox.appendChild(operationText);
// }
// showCurrentQuestion();

function showExpectation(currentInput) {
  currentInput.placeholder = '6 + 7 = ...'; //
}
showExpectation(currentInput);

function createIcon(answer) {
  let iconPlace = document.querySelector('.icon');
  let iconDiv = document.createElement('i');
  iconPlace.appendChild(iconDiv);
  const iconToAdd = iconDiv.classList;
  iconToAdd.add('fa-solid');

  if (answer === false) {
    iconToAdd.add('fa-xmark');
    //griser l'input
  } else {
    iconToAdd.add('fa-check');
  }
}
createIcon(true);

function createNewAttemptBox() {
  let newAttemptPlace = document.querySelector('.attempt2');
  let newAttemptBox = document.createElement('input');
  newAttemptPlace.appendChild(newAttemptBox);
  const newBoxToAdd = newAttemptBox.classList;
  newBoxToAdd.add('form-control');
  newBoxToAdd.add('attempt');
  newBoxToAdd.add('form-control-lg');
  newBoxToAdd.add('my-3');
}
createNewAttemptBox();

function createNewButton() {
  let newButtonPlace = document.querySelector('.submission');
  let newButtonInput = document.createElement('button');
  newButtonPlace.appendChild(newButtonInput);
  newButtonInput.setAttribute('type', 'submit');
  const newButtonToAdd = newButtonInput.classList;
  newButtonToAdd.add('btn');

  let newPlaneImage = document.createElement('img');
  newButtonInput.appendChild(newPlaneImage);
  newPlaneImage.setAttribute(
    'src',
    'https://i.cloudup.com/gBzAn-oW_S-2000x2000.png'
  );
  newPlaneImage.setAttribute('id', 'plane');
  newPlaneImage.setAttribute('onclick', 'planeAnim();');
}
createNewButton();

function falseAttempt() {
  createIncon(false);
  createNewAttemptBox();
}

export { whichOperation };
