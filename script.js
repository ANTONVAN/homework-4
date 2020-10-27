
var startButton = document.querySelector("#start-quiz");
var landingPage = document.querySelector(".landing-page");
var questions = document.getElementById("questions");
var question = document.querySelector(".question");
var answers = document.querySelector(".answers");
var secondsDisplay = document.querySelector(".seconds");
var minutesDisplay = document.querySelector(".minutes");
var showResults = document.querySelector("#show-results");
var results = document.querySelector(".results");
var initalsInput = document.querySelector("#init");
var initialsButton = document.querySelector("#send-initials");

var questionList = ["Commonly data types DO NOT include:","What is the name of the statement that is used to exit or end a loop?","In JavaScript, what element is used to store and manipulate text usually in multiples?"];
var answerList = [["Strings","Booleans","Alerts","Numbers"],["Falter statement","Close statement","Break statement","Conditional statement"],["Arrays","Strings","Function","Variables"]];
var correctAnswers = ["Alerts","Break statement","Strings"]; 

var totalSeconds = 0;
var secondsElapsed = 0;
var moreElapsedSeconds = 0;
var interval;
var timer;
var points;

questions.style.display = "none";
results.style.display = "none";

function startTimer() {
	timeInMinutes = 2;
  // Write code to start the timer here
  totalSeconds = timeInMinutes*60;
  	timer = setInterval(timerTick,1000);
}

function timerTick(moreElapsedSeconds=0){
	 
	secondsElapsed = secondsElapsed + 1 + moreElapsedSeconds;
	updateDisplay();	
}

function updateDisplay(){
	console.log(totalSeconds);
	secondsDisplay.textContent = remainderSecondsFromTotalSeconds(totalSeconds-secondsElapsed);
	minutesDisplay.textContent = `${wholeMinutesFromSeconds(totalSeconds-secondsElapsed)}:`;
}

function wholeMinutesFromSeconds(seconds){
	return Math.floor(seconds/60);
}

function remainderSecondsFromTotalSeconds(seconds){
	var remainderSeconds = seconds % 60;
	if(remainderSeconds<10){
		remainderSeconds = "0" + remainderSeconds;
	}
	return remainderSeconds;
}


startButton.addEventListener("click", function(event){
	points=0;
	event.preventDefault();

	startTimer();
	landingPage.style.display = "none";
	questions.style.display = "block";	
	questions.textContent = questionList[0];

	for(var i=0;i<answerList[0].length;i++){
		newDiv = document.createElement("button");
		newDiv.textContent = answerList[0][i];
		newDiv.setAttribute("type","button");
		newDiv.setAttribute("class","btn btn-primary m-1");
		answers.appendChild(newDiv);
	}
});

var j=0;

answers.addEventListener("click", function(event){
	event.preventDefault();

	j++;
	if(j<questionList.length){

		questions.textContent = questionList[j];
		console.log(event.target.textContent);
		if(correctAnswers.includes(event.target.textContent)){
			points++;
		}else{
			timerTick(50);
		}


		for(var i=0;i<answerList[0].length;i++){
			answers.childNodes[i].textContent = answerList[j][i];
		}
		
		

	}else{
		if(correctAnswers.includes(event.target.textContent)){
			points++;
		}
		questions.style.display = "none";
		answers.style.display = "none"
		secondsDisplay.style.display = "none";
		minutesDisplay.style.display = "none";
		results.style.display = "block";
		showResults.textContent = `Your final score is ${points} points in ${secondsElapsed} seconds`;
		localStorage.setItem("points",points);
		localStorage.setItem("secondsElapsed",secondsElapsed);
			//all done!
			//your final score is xx
			//enter your initials submit
			//...
			//highscores window
		}

	initialsButton.addEventListener("click", function(event){
		results.style.display = "none";
		
	});

		
});





