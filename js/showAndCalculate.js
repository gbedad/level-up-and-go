let level=0;
let subLevel=0;
let questionType=0;
let currentQuestion=0;
let nextQuestion;
let operation; //inutile ?
let par; //inutile ?
let sign; //inutile ?
let rangeMin; //inutile ?
let rangeMax; //inutile ?


const dataSet = [
	[ //level1
		[ //sublevel1
			//questionType1
			{level: 1, sublevel: 1, questionType: 1, par1: 0, sign1: '', rangeMin1: 1, rangeMax1: 5, operator: '+', par2: 0, sign2:'', rangeMin2: 2, rangeMax2: 5}	
			
		],
    	[ //sublevel2 
    	{level: 1, sublevel: 1, questionType: 1, par1: 1, sign1:'+', rangeMin1: 0, rangeMax1:6, operator: '+', par2: 1, sign2:'+', rangeMin2:0, rangeMax2:6}
		],  	
    	[ //sublevel3
    	{level: '1', sublevel: '3', questionType: '1', par1: '1', sign1:'+', rangeMin1:'0', rangeMax1:'6', operator: '+', par2: '0', sign2:'', rangeMin2:'0', rangeMax2:'6'},
    	{level: '1', sublevel: '3', questionType: '2', par1: '0', sign1:'', rangeMin1:'0', rangeMax1:'6', operator: '+', par2: '1', sign2:'+', rangeMin2:'0', rangeMax2:'6'}
   		],
    	[ //sublevel4
    	{level: '1', sublevel: '4', questionType: '1', par1: '0', sign1:'+', rangeMin1:'0', rangeMax1:'6', operator: '+', par2: '1', sign2:'+', rangeMin2:'0', rangeMax2:'6'},
    	{level: '1', sublevel: '4', questionType: '2', par1: '1', sign1:'+', rangeMin1:'0', rangeMax1:'6', operator: '+', par2: '0', sign2:'', rangeMin2:'0', rangeMax2:'6'},
   		{level: '1', sublevel: '4', questionType: '3', par1: '0', sign1:'+', rangeMin1:'0', rangeMax1:'6', operator: '+', par2: '0', sign2:'+', rangeMin2:'0', rangeMax2:'6'}  	
   		]
   	]
]


function randomNum(rangeMin, rangeMax) {
	let num = Math.floor(Math.random() * (rangeMax - rangeMin) ) + rangeMin;
	return num
}


function showNum(par, sign, num){ //display a number with parenthesis and sign
	let parStart;
	let parEnd;
	if (Number(par)===1){
		parStart='(';
		parEnd=')';
	} else {
		parStart='';
		parEnd='';
	}
	return `${parStart}${sign}${num}${parEnd}`
}

function numberNum(sign, num){ //get the sign and the number
	if (sign==='-'){
		num = -num;
	} 
	return `${num}`
}


function showOperation(showNum1, varOperator, showNum2){ //display the operation
	return `${showNum1} ${varOperator} ${showNum2} = ?`
}

function calculateComputerAnswer(num1, operator, num2){  //
	if (operator==='+'){
		result=num1+num2;
	} else 
		result=num1-num2;
	return result
} 


function whichOperation(l,s,t){
	let varPar1 = Number(dataSet[l][s][t].par1);
	let varSign1 = dataSet[l][s][t].sign1;
	let varRangeMin1 = Number(dataSet[l][s][t].rangeMin1);
	let varRangeMax1 = Number(dataSet[l][s][t].rangeMax1);
	let varPar2 = Number(dataSet[l][s][t].par2);
	let varSign2 = dataSet[l][s][t].sign2;
	let varRangeMin2 = Number(dataSet[l][s][t].rangeMin2);
	let varRangeMax2 = Number(dataSet[l][s][t].rangeMax2);
	let varOperator = dataSet[l][s][t].operator;
	let num1=randomNum(varRangeMin1, varRangeMax1);
	let num2=randomNum(varRangeMin2, varRangeMax2);
	let showNum1=showNum(varPar1, varSign1, num1);
	let showNum2=showNum(varPar2, varSign2, num2);
	num1=Number(numberNum(varSign1, num1));
	num2=Number(numberNum(varSign2, num2));
	let varShowOperation = showOperation(showNum1, varOperator, showNum2);
	let result = calculateComputerAnswer(num1, varOperator, num2)
	let exercise = {varShowOperation, num1, num2, result};
	return exercise
	
}

function changeCurrentQuestion(){
	currentQuestion="";
	showCurrentQuestion(0,1,0);
}

function showCurrentQuestion(l,s,t){
	let questionDiv = document.querySelector('.question');
	let operationText= document.createTextNode(whichOperation(l,s,t).varShowOperation);
	questionDiv.appendChild(operationText);
}

changeCurrentQuestion(0,1,0);
console.log(result);
