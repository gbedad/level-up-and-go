let levels = JSON.parse(localStorage.getItem('levels'));
let getLevel = levels.level;
// let getLevel = 2;
console.log(getLevel);
let stepCompleted = [];
const getActiveLevel = (getLevel) => {
  switch (getLevel) {
    case 1:
      stepCompleted = [1];
      return stepCompleted;
    case 2:
      stepCompleted = [1, 2];
      return stepCompleted;
    case 3:
      stepCompleted = [1, 2, 3];
      return stepCompleted;
    case 4:
      stepCompleted = [1, 2, 3, 4];
      return stepCompleted;
    case 5:
      stepCompleted = [1, 2, 3, 4, 5];
      return stepCompleted;
    case 6:
      stepCompleted = [1, 2, 3, 4, 5, 6];
      return stepCompleted;

    default:
      break;
  }
  console.log(stepCompleted);
};
// const stepCompleted = [1, 2, 3];
stepCompleted = getActiveLevel(getLevel);
const activeStep = getLevel;

let items = [...document.querySelectorAll('.stepper-item')];

let counters = [...document.querySelectorAll('.step-counter')];
console.log(items);
const changeClass = () => {
  counters.forEach((counter, index) => {
    console.log(counter.textContent, stepCompleted[index]);
    if (counter.textContent == stepCompleted[index]) {
      counter.parentElement.classList.add('completed');
    }
  });
};
changeClass();
anime({
  targets: '.avatar',
  translateX: 570,
  translateY: -30,
  loop: 3,
  easing: 'easeInOutSine',
});
