const questions = [
  {
    question: "What are cat's unable to taste?",
    option: ["Sweetness", "Sourness", "Bitterness"],
    answer: 0,
  },
  {
    question: "What is a group of cats called?",
    option: ["Fluffle", "Kennel", "Clowder"],
    answer: 2,
  },
  {
    question: "At what age can cats become pregnant?",
    option: ["Four months of age", "Two months of age", "Three months of age"],
    answer: 0,
  },
  {
    question: "Cat's use their tails for what?",
    option: ["For communication", "For balance", "For climbing"],
    answer: 1,
  },
  {
    question: "What is something unusual about a cat's nose",
    option: [
      "Each cat's nose is unique.",
      "The nose is the only smell organ.",
      "They are not sensitive to strong smell.",
    ],
    answer: 0,
  },
  {
    question: "Does a cat dream?",
    option: ["No", "Yes", "Only when they are young"],
    answer: 1,
  },
  {
    question: "What is a feral cat?",
    option: [
      "A cat that lives in wild",
      "A cat that has an owner",
      "A kitten that is not breastfeed by it's mother",
    ],
    answer: 0,
  },
  {
    question:
      "Do kittens born into the same litter always have the same father?",
    option: ["Yes", "Maybe", "No"],
    answer: 2,
  },
  {
    question: "Cats have how many toes?",
    option: ["12 toes", "18 toes", "10 toes"],
    answer: 1,
  },
  {
    question: "Do black cats bring bad luck?",
    option: ["No", "Yes", "Some black cats"],
    answer: 0,
  },
  {
    question: "What does it mean when a cat blinks slowly?",
    option: [
      "They are angry at you",
      "They are hungry",
      "They are kissing you",
    ],
    answer: 2,
  },
  {
    question: "Cats spend how much time grooming each day?",
    option: ["1/3 of the day", "Halve of the day", "Quarter of the day"],
    answer: 0,
  },
];


const text = document.querySelector('.text');
const questionNumber = document.querySelector('.question-no');
const gameBox = document.getElementById("game-box");
const homeBox = document.getElementById("home-box");
const optBox = document.querySelector('.opt-box')
const answerIndicatorContainer = document.querySelector(".ans-indicator");


let options = [];
let availableQuestions = [];
let qcounter = 0;
let runningQuestion;
let correctAnswers = 0;

// Get the username and display it
function getUserName() {
  let user = document.getElementById("userName").value;
  let userName = document.getElementById("user");
  userName.innerHTML = "Welcome " + user;
}
// push the question into the avaible question
function setQuestions() {
  const totalQuestions = questions.length;
  for (let i = 0; i < totalQuestions; i++) {
    availableQuestions.push(questions[i]);
  }
}
function getNextQuestion() {
 
  questionNumber.innerHTML = "Question:" + (qcounter+1) + " of 10";

  // shuffle questions
  const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  runningQuestion = questionIndex;
  text.innerHTML = runningQuestion.question;

  const index = availableQuestions.indexOf(questionIndex);
  //Make sure the question doesn't repeat
  availableQuestions.splice(index, 1);
  const optionLen= runningQuestion.option.length;
  //push options in availableOptions array
  for(let i=0; i<optionLen; i++){
    options.push(i)
  }

  optBox.innerHTML='';

 for(let i=0;i<optionLen; i++){
   //random option
   const optionIndex = options[i];
   //get the position of 'OptionIndex' from the availableOptions
   const index1= options.indexOf(optionIndex);
   //removes the 'optionIndex' from the availableOptions, so that option does not repeat
 options.splice(index1,0);



   const option1 = document.createElement("div");
   option1.innerHTML=runningQuestion.option[optionIndex];
   option1.id=optionIndex;
 
   option1.className="opt";
   optBox.appendChild(option1);
   option1.setAttribute("onclick","getEffects(this)");
 }
  qcounter++
}

// this block of code inside this function is not mine.
function getEffects(element) {
  const id = parseInt(element.id);
	//fetch the answer by comparing the id of clicked option
	if (id === runningQuestion.answer){
		//set the green color to the correct option
		element.classList.add("correct");
		// add the indicator correct mark
		updateAnswerIndicator("correct");
		correctAnswers++;
		console.log("correct:"+correctAnswers)
	}
	else{
		//set the red color to the wrong option
		element.classList.add("wrong");
		// add the indicator wrong mark
		updateAnswerIndicator("wrong");

		// if the answer is incorrect, show the correct option
		const optionLength = optBox.children.length;
		for(let i=0; i<optionLength; i++){
			if(parseInt(optBox.children[i].id) === runningQuestion.answer){
				optBox.children[i].classList.add("correct");
			}
		}
	}
	unclickableOptions();
}
function unclickableOptions(){
  const optionLen = optBox.children.length;
	for(let i=0;i<optionLen; i++){
		optBox.children[i].classList.add("already-answered");
	}
}
function getanswerIndicator() {
  for(let i=0; i<10; i++){
		const indicator = document.createElement("div");
		answerIndicatorContainer.appendChild(indicator);
	}
}
function updateAnswerIndicator(mark) {
  answerIndicatorContainer.children[qcounter-1].classList.add(mark)
}
function startQuiz() {
  homeBox.classList.add("hide");
  gameBox.classList.remove("hide");
  getUserName();
  setQuestions();
  getNextQuestion();
  getanswerIndicator();
}
function next() {}
function scores() {}
function quizOver() {}
function resetGame() {}
function goToHomebox() {}
