// Get all necessary elements
const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const nextBtn = document.querySelector('.next-btn');
const  resultBox= document.querySelector('.result-box');
const  tryAgainbtn= document.querySelector('.tryAgain-btn');
const  goHomebtn= document.querySelector('.goHome-btn');


let questionCount = 0;
let questionNumb = 1; 
let userScore = 0;

// Start Quiz Button functionality
startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
};

// Exit Button functionality
exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
};

// Continue Button functionality
continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');
    showQuestions(0);
    questionCounter(1);
    headerScore();
};

tryAgainbtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

     questionCount = 0;
     questionNumb = 1;
     userScore = 0;
     nextBtn.disabled = false;
     showQuestions(questionCount); 
     questionCounter(questionNumb);

     headerScore();
}

goHomebtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

     questionCount = 0;
     questionNumb = 1;
     userScore = 0;
     nextBtn.disabled = false;
     showQuestions(questionCount); 
     questionCounter(questionNumb);

}


nextBtn.onclick = () => {
    questionCount++;
    if (questionCount < questions.length )
         {
        showQuestions(questionCount); 
        questionNumb++;
        questionCounter(questionNumb);
        nextBtn.classList.remove('active');
    } else {
        showResultBox ()
        nextBtn.disabled = true; 
    }
};

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    const optionsList = document.querySelector('.option-list');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

   
    optionsList.innerHTML = '';

    // Dynamically create and display options
    questions[index].options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;

        // Option click event (for further interaction)
        optionElement.onclick = () => {
            selectOption(optionElement);
        };

        // Append each option to the list
        optionsList.appendChild(optionElement);
    });

    const option = document.querySelectorAll('.option');
    for (let i = 0; i< option.length;i++){
        option[i].setAttribute('onclick','optionSelected(this)');
    }
}

function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = document.querySelectorAll('.option');

    if (userAnswer == correctAnswer){
    answer.classList.add('correct');
    userScore +=1;
    headerScore();
    }
    else{
        answer.classList.add('incorrect');
        allOptions.forEach(option => {
            if (option.textContent === correctAnswer) {
                option.classList.add('correct');
            }
        });
    }
    allOptions.forEach(option => {
        option.classList.add('disabled');
        option.onclick = null; 
    });
    nextBtn.classList.add('active');
}

function selectOption(optionElement) {
    optionElement.classList.add('selected');
}

function questionCounter(index){
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
} 

function headerScore(){
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore}/${questions.length}`;

}

function showResultBox () {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;
        
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background= `conic-gradient(#c613dd ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1)0deg)`;
        if(progressStartValue == progressEndValue){
            clearInterval(progress);
        }
    },speed);
}
