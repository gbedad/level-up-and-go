

//rules
//{"questionDrawWithinSubLevel": "randomize"}//tant que trueMinWithinSublevel pas atteint
//conditions to get out from l,s: 
//quid if non OK soustraction and addition sortie
let rules = [{"trueMinWithinSublevel":0}/*,{"trueSuccMinWithinSublevel":0}*/];

function findRules(l,s){
if (l<5){
	rules=[{"trueMinWithinSublevel":2}/*,{"trueSuccMinWithinSublevel":2}*/]
	else {
		rules=[{"trueMinWithinSublevel":3}/*,{"trueSuccMinWithinSublevel":2}*/]
	}
	return rules
}

let trueAnswersWithinSublevel = 0;
let currentQuestionAnswer = true;


questionTracker:[0,true],[1, false]


function defineNextQuestion(l,s,t){
  //currentQuestion = showCurrentQuestion(l,s,t);
  //quand répondu à la question (soit jusqu'à 4 soit juste)
  if(dataSet[l][s][t].questionType<dataSet[l][s].length && currentQuestionAnswer){
  	if (trueAnswersWithinSublevel<findRules(l,s)[0].trueMinWithinSublevel){
  	t=randomNum(0, dataSet[l][s].length)
  	} 
  } else {
    if(dataSet[l][s][t].sublevel<dataSet[l].length){
    s=s+1;
    t=0
    } else {
      if(dataSet[l][s][t].level<dataSet[l].length) {
      l=l+1;
      t=0;
      s=0;
      } else {
        console.log("congrats")
      }
    }
    }
  return [l,s,t]
  }





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
