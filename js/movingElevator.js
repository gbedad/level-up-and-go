//* IMPORT JSON FILE
import myRanges from '../data/ranges.json' assert { type: 'json' };

// import './showOperationMode.js';

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
// const container = document.querySelector('.container');
const boxAnimate = document.querySelector('.elevator');
const building = document.getElementById('building');
const elevatorStart = document.getElementById('elevator_start');
const road = document.querySelector('#road');
// const veLine = document.querySelector('.ve-line');
const arrow = document.createElement('div');
const i = document.createElement('i');

// let start = Math.round(Math.random(0, 1) * 10);
// let end = -Math.round(Math.random(0, 1) * 10);

const retrieveValuesFromDatas = (index) => {
  let object = { start: myRanges[index].max, end: myRanges[index].min };
  return object;
};

let { start, end } = retrieveValuesFromDatas(1);

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
  }
};

createFloors();

const btn1 = document.querySelector('#removeDivs');

btn1.addEventListener('click', removeDivs);

let groundFloor = document.querySelector('.floor0');
let pos = groundFloor.offsetTop;

const eleRect = groundFloor.getBoundingClientRect();
const targetRect = ele.getBoundingClientRect();

console.log(pos);

//* Position the road depending on ground floor
road.style.top = `${pos + 40}px`;

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

const getAnimateFromTo = () => {
  let e = s + ds;
  let from = (start - s) * 40;
  let to = (start - e) * 40;
  let dist = (s - e) * 40;
  return { dist, from, to, e };
};

let values = getAnimateFromTo();

console.log(values);

let startDiv = document.querySelector(`.floor${s}`);
let endDiv = document.querySelector(`.floor${values.e}`);
startDiv.style.color = 'green';
startDiv.style.fontSize = '22px';
startDiv.style.fontWeight = 'bolder';
endDiv.style.fontSize = '22px';
endDiv.style.color = 'orangeRed';
endDiv.style.fontWeight = 'bolder';

arrow.style.top =
  `${values.dist}` < 0 ? `${values.to + 41}px` : `${values.from + 41}px`;

arrow.style.height =
  `${values.dist}` < 0 ? `${-values.dist}px` : `${values.dist}px`;

arrow.classList.add('ve-line');
append(building, arrow);
append(arrow, i);
i.classList.add('fa-solid');
i.classList.add(
  `${values.dist}` > 0 ? 'fa-arrow-down-long' : 'fa-arrow-up-long'
);
i.style.position = 'absolute';
i.style.left = 'calc(50% + 5px)';
i.style.top = `calc(50% - ${Math.abs(values.dist) / 2}) `;
// i.style.background = 'orange';
// i.style.width = '30px';
// i.style.height = '30px';
// i.style.borderRadius = '50%';
i.style.color = 'navy';
i.style.lineHeight = '30px';

const createElevatorAnimation = () => {
  setTimeout(() => {
    elevatorStart.style.display = 'block';
    elevatorStart.style.top = `${values.from}px`;
    boxAnimate.style.display = 'block';
    anime({
      targets: '.elevator',
      translateY: [`${values.from}`, `${values.to}`],
      duration: Math.abs(1000 * `${ds}`),
      easing: 'easeInOutQuad',
      forward: true,
    });
  }, 2000);
};
const btn2 = document.querySelector('#createAnimation');

btn2.addEventListener('click', createElevatorAnimation);

// document.getElementById('operation').innerHTML = `${s} + (${ds}) = ${values.e}`;
