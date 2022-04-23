function planeAnim1() {
  document.getElementById('plane1').classList.add('planeAnimation');
}
function planeAnim2() {
  document.getElementById('plane2').classList.add('planeAnimation');
}
function planeAnim3() {
  document.getElementById('plane3').classList.add('planeAnimation');
}
function planeAnim4() {
  document.getElementById('plane4').classList.add('planeAnimation');
}

//DATA model
let level = 0;
let subLevel = 0;
let questionType = 0;
let currentQuestion = 0;
let nextQuestion;
let num1;
let num2;
let operation;
let par;
let sign;
let rangeMin;
let rangeMax;
let dataSet = [
  [
    //level1
    [
      //sublevel1
      //questionType1
      {
        level: 1,
        sublevel: 1,
        questionType: 1,
        par1: 0,
        sign1: '',
        rangeMin1: 1,
        rangeMax1: 5,
        operator: '+',
        par2: 0,
        sign2: '',
        rangeMin2: 2,
        rangeMax2: 5,
      },
    ],
    [
      //sublevel2
      {
        level: 1,
        sublevel: 1,
        questionType: 1,
        par1: 1,
        sign1: '+',
        rangeMin1: 0,
        rangeMax1: 6,
        operator: '+',
        par2: 1,
        sign2: '+',
        rangeMin2: 0,
        rangeMax2: 6,
      },
    ],
    [
      //sublevel3
      {
        level: '1',
        sublevel: '3',
        questionType: '1',
        par1: '1',
        sign1: '+',
        rangeMin1: '0',
        rangeMax1: '6',
        operator: '+',
        par2: '0',
        sign2: '',
        rangeMin2: '0',
        rangeMax2: '6',
      },
      {
        level: '1',
        sublevel: '3',
        questionType: '2',
        par1: '0',
        sign1: '',
        rangeMin1: '0',
        rangeMax1: '6',
        operator: '+',
        par2: '1',
        sign2: '+',
        rangeMin2: '0',
        rangeMax2: '6',
      },
    ],
    [
      //sublevel4
      {
        level: '1',
        sublevel: '4',
        questionType: '1',
        par1: '0',
        sign1: '+',
        rangeMin1: '0',
        rangeMax1: '6',
        operator: '+',
        par2: '1',
        sign2: '+',
        rangeMin2: '0',
        rangeMax2: '6',
      },
      {
        level: '1',
        sublevel: '4',
        questionType: '2',
        par1: '1',
        sign1: '+',
        rangeMin1: '0',
        rangeMax1: '6',
        operator: '+',
        par2: '0',
        sign2: '',
        rangeMin2: '0',
        rangeMax2: '6',
      },
      {
        level: '1',
        sublevel: '4',
        questionType: '3',
        par1: '0',
        sign1: '+',
        rangeMin1: '0',
        rangeMax1: '6',
        operator: '+',
        par2: '0',
        sign2: '+',
        rangeMin2: '0',
        rangeMax2: '6',
      },
    ],
  ],
];

function randomNum(rangeMin, rangeMax) {
  return Math.floor(Math.random() * (rangeMax - rangeMin)) + rangeMin;
}
