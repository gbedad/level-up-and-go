const stepCompleted = [1, 2, 3];

const activeStep = 3;

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
