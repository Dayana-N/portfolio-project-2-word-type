// Array to hold the highScore values set to the value in local storage or empty array
let highScore = JSON.parse(localStorage.getItem("highScore")) || [];

document.addEventListener('DOMContentLoaded', (e) => {
    // Add active class on difficulty button and removes it from the rest
    activeButton();
    // Check difficulty selected
    checkDifficulty();
    // How to Play Modal
    howToPlay();
    // Typewritter effect on the welcome text
    displayText();
});

// Typewritter effect on the welcome text
function displayText() {
    let welcomeTextEl = document.getElementById('welcome-text');
    let welcomeText = 'Welcome To WordType!';
    let i = 0;

    function typewritter(text, textEl) {

        if (i < text.length) {
            textEl.innerHTML += text.charAt(i);
            i++;
            setTimeout(typewritter, 100, text, textEl);
        }
    }
    typewritter(welcomeText, welcomeTextEl);
}

// Add active class on difficulty button and removes it from the rest
function activeButton() {
    let difficultyButtons = document.querySelectorAll('.difficulty-btn');

    difficultyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (e.target.classList.contains('active')) {
                difficultyButtons.forEach(button => button.classList.remove('active'));
            } else {
                difficultyButtons.forEach(button => button.classList.remove('active'));
                button.classList.add('active');
            }
        });
    });
}

// Check if  difficulty is selected and start game if it is
function checkDifficulty() {
    let startBtn = document.getElementById('start');
    let difficultyButtons = document.querySelectorAll('.difficulty-btn');
    let startError = document.getElementById('error-start');

    startBtn.addEventListener('click', () => {
        difficultyButtons.forEach(button => {
            if(button.classList.contains('active')){
                startError.innerHTML = '';
                startGame();
            } else {
                startError.innerHTML = 'Please select difficulty';
            }
        });
    });
}

// start game
function startGame() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('start-game').style.display = 'flex';

    // Focus on input field
    document.getElementById('input').focus();
    // Set initial score to 0
    document.getElementById('score').innerHTML = 0;

    // check game time to display correct word
    checkGameType();
    // start timer
    startTimer();

}

// check game type selected and pass it on to the generate word function
function checkGameType() {
    let difficultyButtons = document.querySelectorAll('.difficulty-btn');
    let gameType;
    // check which button has active class and assign the difficulty to gameType 
    difficultyButtons.forEach(button => {
        if(button.classList.contains('active')) {
            gameType = button.getAttribute('data-type');
        }
    });

// check which game type is selected and if there are words in the array before run the game
    if(gameType === 'easy' && easyWords.length !== 0){
        generateWord(easyWords);
    } else if (gameType === 'medium' && mediumWords.length !== 0) {
        generateWord(mediumWords);
    } else if (gameType === 'hard' && hardWords.length !== 0) {
        generateWord(hardWords);
    } else {
        generateWord(usedWordsArr);
    }
}

// generate random word
function generateWord(array){
    let randomIndex = Math.floor(Math.random() * array.length);
    let randomWord = array[randomIndex];
    let wordDisplay = document.getElementById('display-word');
    // Remove the word from the array and store it into usedWordsArr
    let usedWord = array.splice(randomIndex, 1);
    // using the spread operator to push a string as oppose to array
    usedWordsArr.push(...usedWord);

    wordDisplay.innerHTML = '';
    document.getElementById('input').value = '';
// Split the word in characters and create a span for each, then append to parent element
    randomWord.split('').forEach(character => {
        let characterSpan = document.createElement('span');
        characterSpan.classList.add('character-span');
        characterSpan.innerText = character.toUpperCase();
        wordDisplay.appendChild(characterSpan);
        // compare words
        compareWords();

        return randomWord;
    });
}

    // compare each character of the current word with the input field character
    function compareWords() {
        let userInput = document.getElementById('input');
        
        // add eventlistener to the input and create arrays by splitting the input values and the characters in the word
        userInput.addEventListener('input', () => {
            let arrayWord = document.querySelectorAll('.character-span');
            let arrayInput = userInput.value.split('');
            let correct = true;

            arrayWord.forEach((characterSpan, index) => {
                let character = arrayInput[index];

                if(character == null){
                    characterSpan.classList.remove('green');
                    characterSpan.classList.remove('red');
                    correct = false;
                } else if (character.toLowerCase() === characterSpan.innerText.toLowerCase()) {
                    characterSpan.classList.add('green');
                    characterSpan.classList.remove('red');
                } else {
                    characterSpan.classList.add('red');
                    characterSpan.classList.remove('green');
                    correct = false;
                }
            });

            if(correct) {
                // check game type and display word
                checkGameType();
                // increment score
                incrementScore();
            }
        });
    }

// increment score
function incrementScore() {
    let score = parseInt(document.getElementById('score').innerHTML);
    score ++;
    document.getElementById('score').innerHTML = score;
}

// start the timer
function startTimer() {
    let timer = document.getElementById('time');
    let time = 30;

    let setTimer = setInterval(() => {
        --time;
        timer.innerHTML = time;
// if time is 0 stop the timer and display end screen
        if(time === 0){
            clearInterval(setTimer);
            gameOver();
        }
    }, 1000);
}

// display end screen
function gameOver() {
    document.getElementById('start-game').style.display = 'none';
    document.getElementById('end-game').style.display = 'flex';

    let score = document.getElementById('score').innerText;
    let result = document.getElementById('result');
    result.innerHTML = score;
    endGameMessage();
    checkNameInput();

    document.getElementById('submit').addEventListener('click',() => submitScore());

}

// generates message based on the score number
function endGameMessage(){
    let text = document.getElementById('result-msg');
    let score = parseInt(document.getElementById('score').innerText);

    if(score <= 10) {
        text.innerText = 'You Should Practice More!';
    } else if(score <= 20) {
        text.innerText = 'Well Done!';
    } else {
        text.innerText = 'Godlike!';
    }
}

function checkNameInput() {
    let nameInput = document.getElementById('input-name');
    let submitBtn = document.getElementById('submit');

    nameInput.addEventListener('input', () => {
        if(nameInput.value === ''){
            submitBtn.disabled = true;
        } else {
            submitBtn.disabled = false;
        }
    });
}

// display the score screen
function submitScore() {
    document.getElementById('end-game').style.display = 'none';
    document.getElementById('score-screen').style.display = 'flex';
    saveHighScore();
    displayHighScore();
}

//save scores in local storage

function saveHighScore() {
    let name = document.getElementById('input-name').value;
    let score = document.getElementById('score').innerText;
// create object with the user name and score
    let scoreObj = {
        name: name,
        score: score
    };
    // push the object to the array
    highScore.push(scoreObj);
    // sort the array
    highScore.sort((a,b) => b.score - a.score);
    // slices 5 values from the array
    highScore.splice(5);
    // add the array to local storage
    localStorage.setItem('highScore', JSON.stringify(highScore));
}

// display the highscore in the html document
function displayHighScore() {
    let savedScore = JSON.parse(localStorage.getItem('highScore')) || [];
    savedScore.forEach(score => {
        let item = document.createElement('li');
        item.innerText = `${score.name}  ${score.score}`;
        document.getElementById('score-list').appendChild(item);
    });
}

// modal 
function howToPlay() {
    let modalContainer = document.getElementById('modal-container');
    let howToBtn = document.getElementById('how-to-play');
    let gotItBtn = document.getElementById('close');

    // add eventlistener to the how to play button to display the modal and hide the scroll on background
    howToBtn.addEventListener('click', () => {
        modalContainer.style.display = 'flex';
        document.body.style.overflowY = 'hidden';
    });

     // add eventlistener to the got it button to hide the modal and revert the scroll on background
    gotItBtn.addEventListener('click', () => {
        modalContainer.style.display = 'none';
        document.body.style.overflowY = 'visible';
    });

    // add onclick event outside the modal window closes the modal
    window.onclick = function(event) {
        if(event.target == modalContainer) {
            modalContainer.style.display = 'none';
        }
    };
}
