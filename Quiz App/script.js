const questions = [
    {
        question: "A gun fires bullets each of mass 20g with a speed of 2km/s. The person firing the gun experiences a recoil force of 800N. what is the number of bullets fired per second?",
        answers: [
            { text: "3", correct: false},
            { text: "4", correct: true},
            { text: "5", correct: false},
            { text: "14", correct: false},
        ]
    },
    {
        question: "Which of the following remains constant for an isolated system ?",
        answers: [
            { text: "Kinetic energy", correct: false},
            { text: "Kinetic energy and mechanical energy", correct: false},
            { text: "potential energy", correct: false},
            { text: "Sum total of kinetic energy and potential energy", correct: true},
        ]
    },
    {
        question: "SI unit of force ?",
        answers: [
            { text: "pascal", correct: false},
            { text: "joule", correct: false},
            { text: "Newton", correct: true},
            { text: "watt", correct: false},
        ]
    },
    {
        question: " The turning effect produced in a rigid body around a fixed point by the application of force is called ?",
        answers: [
            { text: "Turning force", correct: false},
            { text: "Moment of force", correct: true},
            { text: "Moment of Couple", correct: false},
            { text: "none of these", correct: false},
        ]
    },
    {
        question: "A body is acted upon by two unequal and opposite forces along different lines of action of force. The body will have",
        answers: [
            { text: " only rotatory motion", correct: true},
            { text: "only translatory motion", correct: false},
            { text: "both are correct", correct: false},
            { text: "none of these", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();