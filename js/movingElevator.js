//* IMPORT JSON FILE
import myRanges from '../data/ranges.json' assert { type: 'json' };

// import './showOperationMode.js';
import { whichOperation } from './showAndCalculate.js';

import whatToDo from './showAndCalculate.js'; // Not used

console.log(whatToDo.attemptToExport); //not used

import { showCorrection } from './showCorrection.js'; // Not used

//* GLOBAL VARIABLES
// Global variable for storing operation display
let newAttempt = 0;
let newQuestion;
let myData;
let values;
let operation;
// let myData = whatToDo.currentQuestion;
let myData2 = whatToDo.retrievedQuestion; // not used
let isNewQuestion = true;

const getMyDataFromStorage = () => {
  let currentQuestion = JSON.parse(localStorage.getItem('currentQuestion'));

  return currentQuestion;
};
myData = getMyDataFromStorage();
let previousQuestion = myData;

console.log(previousQuestion);
// let myData = JSON.parse(localStorage.getItem('currentQuestion'));

// let myData1 = JSON.parse(localStorage.getItem('currentQuestion'));
let setStartColor;
let setEndColor;
// console.log(JSON.parse(localStorage.getItem('resultsFromUser')).attempt);
let retrievedObject = localStorage.getItem('resultsFromUser');
let result = JSON.parse(retrievedObject);
console.log(result);
let operationByAttempt = showCorrection(
  newAttempt,
  myData.varShowOperationWithResult
);
console.log(operationByAttempt);

// const getCurrentQuestionFromStorage = () => {
//   let retrievedObject = localStorage.getItem('currentQuestion');
//   let currentQuestion = JSON.parse(retrievedObject);
//   myData = currentQuestion;
//   console.log(myData.varShowOperationWithResult);
//   operationByAttempt = showCorrection(
//     result.attempt,
//     myData.varShowOperationWithResult
//   );
//   console.log(operationByAttempt);
// };

//? Functions for dom elements creation
function createNode(element) {
  return document.createElement(element);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function append(parent, el) {
  return parent.appendChild(el);
}

//? Dom elements variables
const rightCol = document.querySelector('.right');
const boxAnimate = document.querySelector('.elevator');
const building = document.getElementById('building');
const elevatorStart = document.getElementById('elevator_start');
const road = document.querySelector('#road');
// const veLine = document.querySelector('.ve-line');
const arrow = document.createElement('div');
const i = document.createElement('i');
const avatar = document.querySelector('.avatar');
const avatar_btn = document.querySelector('.avatar');
const showOperation = document.querySelector('.correction');
// let floorDivs = document.querySelectorAll('.floor');

// let start = Math.round(Math.random(0, 1) * 10);
// let end = -Math.round(Math.random(0, 1) * 10);

const retrieveBuildingHeight = () => {
  let object = { start: myData.max, end: myData.min };
  return object;
};

let { start, end } = retrieveBuildingHeight();

// removeDivs();
const removeDivs = () => {
  let floorDiv = document.querySelectorAll('.floor');
  floorDiv.forEach((floor) => floor.remove());
};

//* Function create floors depending on values start and end
const createFloors = (max, min) => {
  removeDivs();
  for (let i = max; i >= min; i--) {
    // building.innerHTML += `<div class="floor">${i}</div>`;
    let floor = createNode('div');
    append(building, floor);
    floor.classList.add('floor');
    floor.classList.add(`floor${i}`);
    // floor.textContent = `${i}`;
    let floorNum = createTextNode(`${i}`);
    floorNum >= 0
      ? (floor.style.paddingLeft = '10px')
      : (floor.style.paddingLeft = '5px');
    append(floor, floorNum);
    // floorNum.style.paddingLeft = '4px';
  }
};
createFloors(start, end);

let groundFloor = document.querySelector('.floor0');
let pos = groundFloor.offsetTop;

const getPositionOfElement = (element, target) => {
  const eleRect = element.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const top = eleRect.top - targetRect.top;
  return top;
};
let top = getPositionOfElement(groundFloor, rightCol);

console.log(pos, top);

//* Position the road depending on ground floor
road.style.top = `${top + 80}px`;
avatar_btn.style.top = `${top - 100}px`;
avatar_btn.style.cursor = 'pointer';
avatar_btn.classList.add('moving_btn');

const updateAttempts = () => {
  showOperation.textContent = '';
  operation = createTextNode(`${operationByAttempt}`);
  append(showOperation, operation);
};
updateAttempts();
console.log(showOperation.textContent);
// Get value from localStorage
const getUpdatesFromLocalStorage = () => {
  let retrievedObject = localStorage.getItem('resultsFromUser');
  let result = JSON.parse(retrievedObject);
  newAttempt = result.attempt;
  console.log(result);
  operationByAttempt = showCorrection(
    newAttempt,
    myData.varShowOperationWithResult
  );
  console.log(operationByAttempt);
  showOperation.textContent = operationByAttempt;
  let currentQuestion = JSON.parse(localStorage.getItem('currentQuestion'));
  if (Number(result.computerAns) == result.userAnswerAtt && newAttempt <= 4) {
    showOperation.textContent = `${currentQuestion.varShowOperationWithResult}`;
    clearInterval(myInterval);
    changeColor();
    showArrow();
    createElevatorAnimation();
    isNewQuestion = false;
    // localStorage.getItem('currentQuestion');
  }
  if (newAttempt <= 3) {
    setStartColor = 'yellowGreen';
  }
  if (newAttempt > 2 && newAttempt < 4) {
    showArrow();
  }
  if (newAttempt == 4) {
    setEndColor = 'red';
    setStartColor = 'yellowGreen';
    clearInterval(myInterval);
    showArrow();
    createElevatorAnimation();
    isNewQuestion = false;
  }
  changeColor();
  newAttempt = 0;
};

let myInterval = setInterval(getUpdatesFromLocalStorage, 500);
myData = getMyDataFromStorage();
console.log(
  previousQuestion.varShowOperationWithResult,
  currentQuestion.varShowOperationWithResult
);

const clearQuestion = () => {
  let clearAttempt = { userAnswerAtt: '', computerAns: 1, attempt: 0 };
  newAttempt = clearAttempt.attempt;
  document.querySelector('.correction').textContent = '';
  localStorage.setItem('resultsFromUser', JSON.stringify(clearAttempt));
  hideArrow();
  stopAnimation();
  elevatorStart.style.display = 'none';
  elevatorStart.style.top = `0px`;
  boxAnimate.style.display = 'none';
  avatar.style.top = `0px`;

  // retrievedObject = localStorage.getItem('resultsFromUser');
  // result = JSON.parse(retrievedObject);
  // newAttempt = result.attempt;
  // newAttempt = result.attempt;
  let buildingHeight = retrieveBuildingHeight();
  start = buildingHeight.start;
  end = buildingHeight.end;

  console.log(newAttempt);
  currentQuestion = getMyDataFromStorage();
  createFloors(start, end);
  console.log(currentQuestion);
  groundFloor = document.querySelector('.floor0');
  let newTop = getPositionOfElement(groundFloor, rightCol);
  road.style.top = `${newTop + 80}px`;
  updateAttempts();
  // operationByAttempt = showCorrection(
  //   newAttempt,
  //   currentQuestion.varShowOperationWithResult
  // );

  // operation.textContent = `${operationByAttempt}`;
  console.log(operationByAttempt);
  myData = currentQuestion;
  values = getAnimateFromTo();
  isNewQuestion = true;
  myInterval = setInterval(getUpdatesFromLocalStorage, 500);
};

// if (
//   previousQuestion.varShowOperationWithResult !=
//   JSON.parse(localStorage.getItem('currentQuestion')).varShowOperationWithResult
// ) {
//   clearQuestion();
// }

console.log(myData, start, end);
const btn1 = document.querySelector('#removeDivs');

btn1.addEventListener('click', clearQuestion);

//* RANDOMIZATION FUNCTIONS OF VALUES DEPENDING ON RANGE
function getRandomDs(min, max) {
  return Math.round(Math.random() * (max - min - 2)) + min;
}
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//* OBTAIN THE VALUES FOR START & END DEPENDING ON RANDOMIZATION
let s = getRandomIntInclusive(end, start); // start value

let ds = getRandomDs(end, start); // Translation from start point in value to be transformed in pixels

console.log('RANGE', ds);
//* CHECK VALIDITY OF VALUES IN ORDER NOT TO OVERFLOW BUILDING HEIGHT
const checkValidity = () => {
  if (ds === 0) {
    ds = getRandomDs(end, start);
  }
  if (Math.abs(ds) > Math.abs(s - start) || ds === 0) {
    ds = -(s - ds);
  }
  if (Math.abs(ds) > Math.abs(s - end) || ds === 0) {
    if (ds < 0) {
      ds = -ds;
    }
  }
};
checkValidity();
console.table(s, ds, start, end);

// const getAnimateFromTo = () => {
//   let e = s + ds;
//   let from = (start - s) * 40;
//   let to = (start - e) * 40;
//   let dist = (s - e) * 40;
//   return { dist, from, to, e };
// };

const getAnimateFromTo = () => {
  let e = Number(myData.result);
  let from = Number(start - myData.num1) * 40;
  let to = Number(start - myData.result) * 40;
  let dist = Number(myData.num2) * 40;
  return { dist, from, to, e };
};
console.log('isNewQ', isNewQuestion);

// if (isNewQuestion == true) {
values = getAnimateFromTo();
// }

console.log(values);
console.log(newAttempt);

let startDiv = document.querySelector(`.floor${myData.num1}`);
let endDiv = document.querySelector(`.floor${values.e}`);
const changeColor = () => {
  startDiv.style.color = `${setStartColor}`;
  endDiv.style.color = `${setEndColor}`;
};

// startDiv.style.backgroundColor = 'green';

// endDiv.style.backgroundColor = 'orangeRed';

//! SETTLE PADDING-LEFT OF TEXT CONTENT ON FLOORS

// floorDivs.forEach((floor) => {
//   let floorLevel = floor.textContent;
//   floorLevel >= 0
//     ? (floor.style.paddingLeft = '10px')
//     : (floor.style.paddingLeft = '5px');
// });

const showArrow = () => {
  arrow.style.top =
    `${Number(myData.num1)}` < `${Number(myData.result)}`
      ? `${Number(values.to + 41)}px`
      : `${Number(values.from + 41)}px`;
  arrow.style.height = `${values.dist}px`;
  arrow.style.display = 'block';
  i.style.display = 'block';
};

const hideArrow = () => {
  // arrow.style.top = `0px`;
  // arrow.style.height = `0px`;
  arrow.style.display = 'none';
  i.style.display = 'none';
};

//   `${values.dist}` < 0 ? `${-values.dist}px` : `${values.dist}px`;

arrow.classList.add('ve-line');
append(building, arrow);
// append(arrow, i);
// i.classList.add('fa-solid');
// i.classList.add(
//   `${myData.num1}` > `${myData.result}`
//     ? 'fa-arrow-down-long'
//     : 'fa-arrow-up-long'
// );
// i.style.position = 'absolute';
// i.style.left = 'calc(50% + 5px)';
// // i.style.top = `calc(50% - ${Math.abs(myData.num2) / 2}) `;
// i.style.top = `calc(50% - ${myData.num2 / 2}) `;
// i.style.color = 'navy';
// i.style.lineHeight = '30px';

const createElevatorAnimation = () => {
  setTimeout(() => {
    // stopAnimation();
    elevatorStart.style.display = 'block';
    elevatorStart.style.top = `${values.from}px`;
    boxAnimate.style.display = 'block';
    avatar.style.top = `${values.from}px`;
    avatarInElevator();
    anime({
      targets: '.elevator',
      translateY: [`${values.from}`, `${values.to}`],
      // duration: Math.abs(1000 * `${myData.num1}`),
      duration: Math.abs(1000),
      easing: 'easeInOutQuad',
      forward: true,
    });
  }, 300);
};

//? ANIMATE AVATAR
const avatarAnimation = () => {
  anime({
    targets: '.moving_btn',
    translateY: 20,
    delay: 500,
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine',
  });
};
// avatarAnimation();

const stopAnimation = () => {
  // anime.set('.moving_btn', { top: 0 });
  anime.remove('.avatar');
  anime.remove('.elevator');
};

//? FUNCTION FOR AVATAR : GO TO ELEVATOR START POSITION

const avatarInElevator = () => {
  append(boxAnimate, avatar);
  avatar.style.top = `${values.from}px`;
  avatar.style.width = '40px';
  avatar.style.height = '40px';
};

let startTopPos = getPositionOfElement(startDiv, groundFloor);
console.log(startTopPos);
// const gotoElevator = () => {
//   anime({
//     targets: avatar_btn,
//     keyframes: [{ translateX: -220 }, { translateY: `${startTopPos + 100}` }],
//     duration: 4000,
//     scale: 0.5,
//     easing: 'easeOutElastic(1, .8)',
//     forward: true,
//   });
// };
// gotoElevator();

const btn2 = document.querySelector('#createAnimation');

// btn2.addEventListener('click', createElevatorAnimation);
avatar_btn.addEventListener('click', createElevatorAnimation);

// document.getElementById('operation').innerHTML = `${s} + (${ds}) = ${values.e}`;
