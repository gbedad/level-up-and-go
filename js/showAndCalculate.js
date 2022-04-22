import dataSet from '../data/setOfData.json' assert { type: 'json' };

let level = 0;
let subLevel = 0;
let questionType = 0;
//let currentQuestion = 0;
let exercise = {};
let attemptToExport = 1

let userAnswerAttempta
  let attemptNumbera
  let computerAnswera
  let currentButton


//add condition on

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
function showOperationWithResult(showNum1, num1, num2, varOperator, showNum2) {
  //display the operation
  return `${showNum1} ${varOperator} ${showNum2} = ${calculateComputerAnswer(
    num1,
    varOperator,
    num2
  )}`;
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
  let varShowOperationWithResult = showOperationWithResult(
    showNum1,
    num1,
    num2,
    varOperator,
    showNum2
  );
  let result = calculateComputerAnswer(num1, varOperator, num2);

  exercise = { varShowOperation,varShowOperationWithResult, num1, num2, result, min, max };

  return exercise;
}
let questionDiv = document.querySelector('.instruction');
function showCurrentQuestion(l, s, t) {

  let operation = whichOperation(l, s, t);
  
  let operationText = document.createTextNode(operation.varShowOperation);
  questionDiv.appendChild(operationText);
  return operation;
}
/*console.log(showCurrentQuestion(0, 1, 0))*/
function newQuestion(prev_l, prev_s, prev_t) { //l de la précédente, s de la précédente, etc. autres critères à ajouter 
  let l = 0; // à revoir en fonction de la progression
  let s = 0; // à revoir en fonction de la progression
  let t = 0; // à revoir en fonction de la progression
  showCurrentQuestion(l, s, t);
  return {l,s,t} //si besoin autres features de la nouvelle question tirée à poser ?
}

//const resultToExport = showCurrentQuestion(0, 1, 0);





//function questionTacker(){
//questionTracker(l,s,t,num1, operator, num2, cumulAttempts, lastAnswerStatus)
//critères changement de question dépendent l,s,t, cumulAttempts, lastAnswerStatus
//}
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
  currentInput.placeholder = `${showCorrection3}...`;
}

/*
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

function createNewAttemptBox(attemptNumber) {
  let newAttemptPlace = document.querySelector(`#answerAttempt${attemptNumber}`);
  let newAttemptBox = document.createElement('input');
  newAttemptPlace.appendChild(newAttemptBox);
  const newBoxToAdd = newAttemptBox.classList;
  newBoxToAdd.add('form-control');
  newBoxToAdd.add(`#inputAttempt${attemptNumber}`);
  newBoxToAdd.add('form-control-lg');
  newBoxToAdd.add('my-3');
}


function createNewButton(attemptNumber) {
  let newButtonPlace = document.querySelector(`#colBtnAttempt${attemptNumber}`);
  let newButtonInput = document.createElement('button');
  newButtonPlace.appendChild(newButtonInput);
  newButtonInput.setAttribute('type', 'submit');
  const newButtonToAdd = newButtonInput.classList;
  newButtonToAdd.add('btn');
  newButtonToAdd.add(`btnAttempt${attemptNumber}`);
  let newPlaneImage = document.createElement('img');
  newButtonInput.appendChild(newPlaneImage);
  newPlaneImage.setAttribute(
    'src',
    'https://i.cloudup.com/gBzAn-oW_S-2000x2000.png'
  );
  newPlaneImage.setAttribute('id', 'plane');
  newPlaneImage.setAttribute('onclick', 'planeAnim();');

}

function clearAttempts (){
//
}

function showOtherBoxAttempt(attemptNumber) {
    createIcon(false);
    createNewAttemptBox(attemptNumber);
    createNewButton(attemptNumber);
}
*/


/*function analyzeAnswer (fct) {
    let datas=fct();
    console.log(datas.userAnswerAttempt, datas.computerAnswer)
    if(datas.userAnswerAttempt!=datas.computerAnswer && datas.attemptNumber<4){
    datas.attemptNumber=datas.attemptNumber+1;
    
    return false
  } else { //correct result or attempt4 false result
    console.log('bonne réponse')
    //change questionType
    //attemptNumber=1;
    return true
  }
}*/

const currentQuestion = showCurrentQuestion(0,0,0); //initialisation et test => à revoir 

function playTheAttempt(attemptNumber){
 
  function getinput () {
    //let currentQuestion = showCurrentQuestion(0,0,0); //initialisation et test => à revoir 
    //let attemptNumber=1; //initialisation des tentatives
    let currentButton = document.querySelector(`.btnAttempt${attemptNumber}`);
    let currentInput = document.querySelector(`.inpAttempt${attemptNumber}`);
    let userAnswerAttempt = currentInput.value;
    let computerAnswer = currentQuestion.result;
    console.log(currentButton)
    return {
      userAnswerAttempt: userAnswerAttempt,
      attemptNumber: attemptNumber,
      computerAnswer: computerAnswer,
      currentButton: currentButton
    }
    }

  let datas = getinput();


  userAnswerAttempta= datas.userAnswerAttempt
  attemptNumbera= datas.attemptNumber
 computerAnswera= datas.computerAnswer
  currentButton= datas.currentButton

currentButton.addEventListener('click', () => analyzeAnswer(getinput))
}

 


 function playTheQuestion(){
    let attemptNumber=1; 
    
      playTheAttempt(attemptNumber);
   
    
   /* doplayTheAttempt(attemptNumber);{
    playTheAttempt(attemptNumber);
    attemptNumber=attemptNumber+1;
    } while()*/
  }

  playTheQuestion()


export { whichOperation };

/*
_________________________*/

  function show(a, b){
    let i = document.createElement("i")
    /*let feedback = document.querySelector(`${a}, .attempt${b}`);*/
    let feedback = document.querySelector(`.attempt${b}`);
    const newIcon = feedback.appendChild(i)
    /*const newClassToAdd = feedback.classList;*/
    const newClassToAdd = newIcon.classList
    newClassToAdd.add(`fa-solid`);
    newClassToAdd.add(`${a}`);
    newClassToAdd.add('isShown');
    feedback.classList.remove('isHidden');
    console.log(feedback)
  }

  function showBtn(b){
    let feedback = document.querySelector(`.btnAttempt${b+1}`);
    const newClassToAdd = feedback.classList;
    newClassToAdd.add('isShown');
    feedback.classList.remove('isHidden');
  }

  function showInp(b){
    let feedback = document.querySelector(`.inpAttempt${b+1}`);
    const newClassToAdd = feedback.classList;
    newClassToAdd.add('isShown');
    feedback.classList.remove('isHidden');
  }

 function analyzeAnswer (fct) {
      let datas=fct();
      console.log(datas.userAnswerAttempt, datas.computerAnswer, datas.attemptNumber)
      if(datas.userAnswerAttempt!=datas.computerAnswer && datas.attemptNumber<4){
      //affichage croix datas.attemptNumber
      show(`fa-xmark`,datas.attemptNumber);
      //affichage input et bouton datas.attemptNumber+1
      showInp(datas.attemptNumber);
      showBtn(datas.attemptNumber);
      //correction n° datas.attemptNumber
      datas.attemptNumber=datas.attemptNumber+1;
      
      playTheAttempt(datas.attemptNumber)
      //return false
      attemptToExport = datas.attemptNumber
      console.log("======> Where ?", attemptToExport)
      return attemptToExport
      } else if (datas.userAnswerAttempt!=datas.computerAnswer && datas.attemptNumber==4){
      //affichage croix datas.attemptNumber (4)
      show('fa-xmark',datas.userAnswerAttempt);
    //correction n° datas.attemptNumber (4)
    playTheQuestion()
      //return false
      } else if (datas.userAnswerAttempt==datas.computerAnswer) {
      //affichage check datas.attemptNumber (4)
      show('fa-check',datas.attemptNumber);
      //correction n° datas.attemptNumber (4)
      console.log("Data is correct")
      location.reload()
      showCurrentQuestion(0,1,0)

      playTheQuestion()

      //return true
    }
    }
console.log(attemptToExport)
export default { currentQuestion, attemptToExport };

 /* function playTheAttempt(attemptNumber){
console.log(attemptNumber)
    function getinput () {
    let currentQuestion = showCurrentQuestion(0,0,0); //initialisation et test => à revoir 
    //let attemptNumber=1; initialisation des tentatives
    let currentButton = document.querySelector(`.btnAttempt${attemptNumber}`);
    let currentInput = document.querySelector(`#inputAttempt${attemptNumber}`);
    //let userAnswerAttempt = currentInput.value;
    let computerAnswer = currentQuestion.result;
    return {
      //userAnswerAttempt: userAnswerAttempt,
      attemptNumber: attemptNumber,
      computerAnswer: computerAnswer,
      currentButton: currentButton
    }
    }
    let datas = getinput();
    /*let userAnswerAttempt= datas.userAnswerAttempt
    let attemptNumber= datas.attemptNumber
    let computerAnswer= datas.computerAnswer*/
/*    let currentButton= datas.currentButton*/
 
   /* currentButton.addEventListener('click', () => analyzeAnswer(getinput, ))
    }*/

   

