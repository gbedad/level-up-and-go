//* IMPORT JSON FILE
import myRanges from '../data/ranges.json' assert { type: 'json' };

// import './showOperationMode.js';
import { whichOperation } from './showAndCalculate.js';

import { showCorrection } from './showCorrection.js';

let myData = whichOperation(0, 3, 2);
console.log(myData);

let operationByAttempt = showCorrection(
  [1, 2, 3, 4],
  2,
  myData.varShowOperation
);

//* GLOBAL VARIABLES

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

const operation = createTextNode(`${operationByAttempt}`);
append(showOperation, operation);

const btn1 = document.querySelector('#removeDivs');

btn1.addEventListener('click', removeDivs);

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

let floorDivs = [...document.querySelectorAll('.floor')];
let startDiv = document.querySelector(`.floor${myData.num1}`);
let endDiv = document.querySelector(`.floor${values.e}`);
startDiv.style.color = 'yellowGreen';
// startDiv.style.backgroundColor = 'green';
startDiv.style.fontWeight = 'bolder';
// endDiv.style.backgroundColor = 'orangeRed';
endDiv.style.color = 'orangeRed';
endDiv.style.fontWeight = 'bolder';

//! SETTLE PADDING-LEFT OF TEXT CONTENT ON FLOORS
floorDivs.forEach((floor) => {
  let floorLevel = floor.textContent;
  floorLevel >= 0
    ? (floor.style.paddingLeft = '10px')
    : (floor.style.paddingLeft = '5px');
});

arrow.style.top = `${values.to + 41}px`;

arrow.style.height = `${values.dist}px`;
//   `${values.dist}` < 0 ? `${-values.dist}px` : `${values.dist}px`;

arrow.classList.add('ve-line');
append(building, arrow);
append(arrow, i);
i.classList.add('fa-solid');
i.classList.add(
  `${myData.num1}` > `${myData.result}`
    ? 'fa-arrow-down-long'
    : 'fa-arrow-up-long'
);
i.style.position = 'absolute';
i.style.left = 'calc(50% + 5px)';
i.style.top = `calc(50% - ${Math.abs(myData.num2) / 2}) `;
i.style.color = 'navy';
i.style.lineHeight = '30px';

const createElevatorAnimation = () => {
  setTimeout(() => {
    elevatorStart.style.display = 'block';
    elevatorStart.style.top = `${values.from}px`;
    boxAnimate.style.display = 'block';
    avatar.style.top = `${values.from}px`;
    anime.remove(avatar_btn);
    avatarInElevator();
    anime({
      targets: '.elevator',
      translateY: [`${values.from}`, `${values.to}`],
      duration: Math.abs(1000 * `${myData.num2}`),
      easing: 'easeInOutQuad',
      forward: true,
    });
  }, 2000);
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
avatarAnimation();

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
