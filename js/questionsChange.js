// question terminée
// level1
// souslevel1
// questionType1

// question à venir
// si dernière tentative fausse
// 	level1  //idem
// 	souslevel1
// 	questionType1
// sinon
// 	level1
// 	souslevel2
// 	questionType1

// question terminée
// level1
// souslevel2
// questionType1

// question à venir
// si dernière tentative fausse
// 	level1//idem
// 	souslevel2
// 	questionType1
// sinon
// 	level1
// 	souslevel2
// 	questionType1

l = 0;
s = 0;
t = 0;
showCurrentQuestion(0, 0, 0);

//bouton apparaît si juste ou si attempt4
let btnChange = document.querySelector('.change');
let nextQuestion = defineNextQuestion(l, s, t);
btnChange.addEventListener('click', () => console.log(nextQuestion));
showCurrentQuestion(nextQuestion[0], nextQuestion[1], nextQuestion[2]);

function defineNextQuestion(l, s, t) {
  //currentQuestion = showCurrentQuestion(l,s,t);
  //quand répondu à la question (soit jusqu'à 4 soit juste)
  if (dataSet[l][s][t] < dataSet[l][s].length) {
    t = t + 1;
  } else {
    if (dataSet[l][s] < dataSet[l].length) {
      s = s + 1;
      t = 0;
    } else {
      if (dataSet[l][s] < dataSet[l].length) {
        l = l + 1;
        t = 0;
        s = 0;
      } else {
        console.log('congrats');
      }
    }
  }
  return [l, s, t];
}
