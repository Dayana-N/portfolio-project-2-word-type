document.addEventListener('DOMContentLoaded', (e) => {
    // Add active class on difficulty button and removes it from the rest
    activeButton()
    // Check difficulty selected
    checkDifficulty()
    // Typewritter effect on the welcome text
    displayText()
})

// Typewritter effect on the welcome text
function displayText() {
    let welcomeTextEl = document.getElementById('welcome-text');
    let welcomeText = 'Welcome To WordType!';
    let i = 0;

    function typewritter(text, textEl) {

        if (i < text.length) {
            textEl.innerHTML += text.charAt(i)
            i++
            setTimeout(typewritter, 100, text, textEl)
        }
    }
    typewritter(welcomeText, welcomeTextEl)
}

// Add active class on difficulty button and removes it from the rest
function activeButton() {
    let difficultyButtons = document.querySelectorAll('.difficulty-btn');

    difficultyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (e.target.classList.contains('active')) {
                difficultyButtons.forEach(button => button.classList.remove('active'))
            } else {
                difficultyButtons.forEach(button => button.classList.remove('active'))
                button.classList.add('active')
            }
        })
    })
}

// Check if  difficulty is selected and start game if it is
function checkDifficulty() {
    let startBtn = document.getElementById('start');
    let difficultyButtons = document.querySelectorAll('.difficulty-btn');
    let startError = document.getElementById('error-start');

    startBtn.addEventListener('click', () => {
        difficultyButtons.forEach(button => {
            if(button.classList.contains('active')){
                startError.innerHTML = ''
                console.log(button)
                startGame()
            } else {
                startError.innerHTML = 'Please select difficulty'
            }
        })
    })
}

// start game
function startGame() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('start-game').style.display = 'flex';

    // Focus on input field
    document.getElementById('input').focus()
    // Set initial score to 0
    document.getElementById('score').innerHTML = 0;

    // check game time to display correct word
    checkGameType()
    // start timer
    startTimer()

}

// check game type selected and pass it on to the generate word function
function checkGameType() {
    let difficultyButtons = document.querySelectorAll('.difficulty-btn');
    let gameType;

    difficultyButtons.forEach(button => button.classList.contains('active') ? gameType = button.getAttribute('data-type') : console.log('no active class'));

    if(gameType === 'easy'){
        generateWord(easyWords)
    } else if (gameType === 'medium') {
        generateWord(mediumWords)
    } else if (gameType === 'hard') {
        generateWord(hardWords)
    } else {
        generateWord(easyWords)
        throw Error('Unknown game type, starting default game type easy')
    }
}

// generate random word
function generateWord(array){
    let randomIndex = Math.floor(Math.random() * array.length);
    let randomWord = array[randomIndex];
    let wordDisplay = document.getElementById('display-word')
    wordDisplay.innerHTML = '';
    document.getElementById('input').value = '';

    randomWord.split('').forEach(character => {
        let characterSpan = document.createElement('span');
        characterSpan.classList.add('character-span');
        characterSpan.innerText = character.toUpperCase();
        wordDisplay.appendChild(characterSpan);
        // compare words
        compareWords()

        return randomWord
    })}

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
            })

            if(correct) {
                // check game type and display word
                checkGameType()
                // increment score
                incrementScore()
            }
        })
    }

// increment score
function incrementScore() {
    let score = parseInt(document.getElementById('score').innerHTML);
    score ++
    document.getElementById('score').innerHTML = score;
}

// start the timer
function startTimer() {
    let timer = document.getElementById('time');
    let time = 4;

    let setTimer = setInterval(() => {
        --time;
        timer.innerHTML = time;
// if time is 0 stop the timer and display end screen
        if(time === 0){
            clearInterval(setTimer);
            gameOver()
        }
    }, 1000);
}

// display end screen
function gameOver() {
    document.getElementById('start-game').style.display = 'none';
    document.getElementById('end-game').style.display = 'flex';


}