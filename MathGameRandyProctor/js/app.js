
let firstMultiplicand;
let secondMultiplicand;
let correctAnswer;
let arrayOfPossibleAnswers = [];
let currentScore = 0;
let problemNumber = 1;

let arrayOfAnswerElements = document.querySelectorAll('#answers ul li');
let problemNumberElement = document.querySelector('.currentProblem');
let currentScoreElement = document.querySelector('.currentScore');

function getRandomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getWrongAnswer() {
    let wrongAnswer = correctAnswer;
    while (wrongAnswer === correctAnswer) {
        wrongAnswer = getRandomNumber(81);
    }
    return wrongAnswer;
}

function shuffleArray(arr) {
    return arr.sort(function (a, b) { return Math.random() - 0.5 })
}

function newProblem() {

    firstMultiplicand = getRandomNumber(9);
    secondMultiplicand = getRandomNumber(9);
    let mathProblemElement = document.querySelector('#problem div')
    mathProblemElement.innerText = firstMultiplicand + ' * ' + secondMultiplicand;
    correctAnswer = firstMultiplicand * secondMultiplicand;

    arrayOfPossibleAnswers.push(correctAnswer);
    arrayOfPossibleAnswers.push(getWrongAnswer());
    arrayOfPossibleAnswers.push(getWrongAnswer());
    arrayOfPossibleAnswers.push(getWrongAnswer());

    shuffleArray(arrayOfPossibleAnswers);



    arrayOfAnswerElements.forEach(element => {
        element.innerText = arrayOfPossibleAnswers.pop();
    })

}

function toggleShowHide() {

    const showHideElements = document.querySelectorAll('.show-hide');

    showHideElements.forEach(element => {
        element.hidden = element.hidden ? false : true;
    })
}

function changeMessages() {
    let evaluationMessageElement = document.querySelector('.evaluation-message');
    let conclusionMessageElement = document.querySelector('.conclusion-message');
    if (currentScore < 5) {
        evaluationMessageElement.innerText = 'You gave it a shot';
        conclusionMessageElement.innerText = 'Try to get more than 5 next time';
    } else if (currentScore >= 5 && currentScore < 8) {
        evaluationMessageElement.innerText = 'Nice job';
        conclusionMessageElement.innerText = 'Your practice is paying off';
    } else if (currentScore >= 8 && currentScore < 10) {
        evaluationMessageElement.innerText = 'Great job!';
        conclusionMessageElement.innerText = 'You are great at maths!';
    } else if (currentScore === 10) {
        evaluationMessageElement.innerText = 'Perfect!';
        conclusionMessageElement.innerText = 'You should be proud!';
    }
}

function finalScreenChanges() {
    let finalScoreElement = document.querySelector('.final-score')
    finalScoreElement.innerText = currentScore;
    changeMessages();
}


newProblem();


document.addEventListener('DOMContentLoaded', () => {


    arrayOfAnswerElements.forEach(element => {

        element.addEventListener('click', (event) => {

            if (parseInt(event.currentTarget.textContent) === correctAnswer) {
                currentScore++;
            }

            if (problemNumber <= 10) {
                problemNumber++;
            }

            currentScoreElement.innerText = currentScore;
            problemNumberElement.innerText = problemNumber;

            if (problemNumber === 11) {
                finalScreenChanges();
                toggleShowHide();
            }

            newProblem();
        })
    })


    let buttonStartOverElement = document.getElementById('btnStartOver');

    buttonStartOverElement.addEventListener('click', (event) => {


        if (problemNumber === 11) {
            toggleShowHide();
        }

        currentScore = 0;
        currentScoreElement.innerText = currentScore;

        problemNumber = 1;
        problemNumberElement.innerText = problemNumber;

        newProblem();



    })



})