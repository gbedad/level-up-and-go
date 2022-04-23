//* IMPORT JSON FILE
import myRanges from '../data/ranges.json' assert { type: 'json' };

// import './showOperationMode.js';
import { whichOperation } from './showAndCalculate.js';

import whatToDo from './showAndCalculate.js';

console.log(whatToDo.attemptToExport);

import { showCorrection } from './showCorrection.js';

//* GLOBAL VARIABLES
// Global variable for storing operation display
let newAttempt = 0;
let newQuestion;
let myData;
// let myData = whatToDo.currentQuestion;
let myData2 = whatToDo.retrievedQuestion;

const getMyDataFormStorage = () => {
  let currentQuestion = JSON.parse(localStorage.getItem('currentQuestion'));

  return currentQuestion;
};
myData = getMyDataFormStorage();

// let myData = JSON.parse(localStorage.getItem('currentQuestion'));

// let myData1 = JSON.parse(localStorage.getItem('currentQuestion'));
console.log(myData, myData2);
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

// let start = Math.round(Math.random(0, 1) * 10);
// let end = -Math.round(Math.random(0, 1) * 10);

const retrieveBuildingHeight = () => {
  let object = { start: myData.max, end: myData.min };
  return object;
};

let { start, end } = retrieveBuildingHeight();

const removeDivs = () => {
  let floorDiv = document.querySelectorAll('.floor');
  floorDiv.forEach((el) => el.remove());
  boxAnimate.remove();
  elevatorStart.remove();
  ope.remove();
};

//* Function create floors depending on values start and end
const createFloors = () => {
  for (let i = start; i >= end; i--) {
    // building.innerHTML += `<div class="floor">${i}</div>`;
    let floor = createNode('div');
    append(building, floor);
    floor.classList.add('floor');
    floor.classList.add(`floor${i}`);
    // floor.textContent = `${i}`;
    let floorNum = createTextNode(`${i}`);
    append(floor, floorNum);
    // floorNum.style.paddingLeft = '4px';
  }
};
createFloors();

let operation;
const updateAttempts = () => {
  showOperation.textContent = '';
  operation = createTextNode(`${operationByAttempt}`);
  append(showOperation, operation);
};
updateAttempts();
console.log(showOperation.textContent);
// Get value from localStorage
const getUpdatesFromLocalStorage = () => {
  newAttempt = 0;

  let retrievedObject = localStorage.getItem('resultsFromUser');
  let result = JSON.parse(retrievedObject);
  newAttempt = result.attempt;

  console.log(result);
  // operationByAttempt = showCorrection(
  //   newAttempt,
  //   myData.varShowOperationWithResult
  // );
  // console.log(operationByAttempt);
  // showOperation.textContent = operationByAttempt;
  if (result.computerAns == result.userAnswerAtt && newAttempt <= 4) {
    showOperation.textContent = `${
      JSON.parse(localStorage.getItem('currentQuestion'))
        .varShowOperationWithResult
    }`;
    clearInterval(myInterval);
    changeColor();
    showArrow();
    createElevatorAnimation();
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
  }
  changeColor();
  // console.log(setEndColor, setStartColor);
  // return newAttempt;
};

let myInterval = setInterval(getUpdatesFromLocalStorage, 1000);

const clearQuestion = () => {
  let clearAttempt = { userAnswerAtt: 0, computerAns: 1, attempt: 0 };
  localStorage.setItem('resultsFromUser', JSON.stringify(clearAttempt));
  myInterval = setInterval(getUpdatesFromLocalStorage, 1000);
  document.querySelector('.correction').textContent = '';
  // retrievedObject = localStorage.getItem('resultsFromUser');
  // result = JSON.parse(retrievedObject);
  // newAttempt = result.attempt;
  // newAttempt = result.attempt;
  console.log(newAttempt);
  currentQuestion = JSON.parse(localStorage.getItem('currentQuestion'));
  console.log(currentQuestion);
  operationByAttempt = showCorrection(
    newAttempt,
    currentQuestion.varShowOperationWithResult
  );
  operation.textContent = operationByAttempt;
  console.log(operationByAttempt);
  myData = currentQuestion;
};

console.log(newAttempt);
const btn1 = document.querySelector('#removeDivs');

btn1.addEventListener('click', clearQuestion);

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
  let e = myData.result;
  let from = (start - myData.num1) * 40;
  let to = (start - myData.result) * 40;
  let dist = myData.num2 * 40;
  return { dist, from, to, e };
};

let values = getAnimateFromTo();
console.log(values);
console.log(newAttempt);
let floorDivs = [...document.querySelectorAll('.floor')];
let startDiv = document.querySelector(`.floor${myData.num1}`);
let endDiv = document.querySelector(`.floor${values.e}`);
const changeColor = () => {
  startDiv.style.color = `${setStartColor}`;

  endDiv.style.color = `${setEndColor}`;
};

// startDiv.style.backgroundColor = 'green';

// endDiv.style.backgroundColor = 'orangeRed';

//! SETTLE PADDING-LEFT OF TEXT CONTENT ON FLOORS
floorDivs.forEach((floor) => {
  let floorLevel = floor.textContent;
  floorLevel >= 0
    ? (floor.style.paddingLeft = '10px')
    : (floor.style.paddingLeft = '5px');
});

const showArrow = () => {
  arrow.style.top = `${values.to + 41}px`;
  arrow.style.height = `${values.dist}px`;
};

//   `${values.dist}` < 0 ? `${-values.dist}px` : `${values.dist}px`;

arrow.classList.add('ve-line');
append(building, arrow);
append(arrow, i);
i.classList.add('fa-solid');
i.classList.add(
  `${myData.num2}` == 0
    ? 'fa-hand'
    : `${myData.num1}` <= `${myData.result}` && `${myData.num2}` !== 0
    ? 'fa-arrow-up-long'
    : 'fa-arrow-down-long'
);
i.style.position = 'absolute';
i.style.left = 'calc(50% + 5px)';
i.style.top = `calc(50% - ${Math.abs(myData.num2) / 2}) `;
i.style.color = 'navy';
i.style.lineHeight = '30px';

const createElevatorAnimation = () => {
  setTimeout(() => {
    stopAnimation();
    elevatorStart.style.display = 'block';
    elevatorStart.style.top = `${values.from}px`;
    boxAnimate.style.display = 'block';
    avatar.style.top = `${values.from}px`;
    avatarInElevator();
    anime({
      targets: '.elevator',
      translateY: [`${values.from}`, `${values.to}`],
      duration: Math.abs(1000 * `${myData.num2}`),
      easing: 'easeInOutQuad',
      forward: true,
    });
  }, 500);
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
  anime.set('.moving_btn', { top: 0 });
  anime.remove('.moving_btn');
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
