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

// Check difficulty selected
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

function startGame() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('start-game').style.display = 'flex';

    // Focus on input field
    document.getElementById('input').focus()
    // Set initial score to 0
    document.getElementById('score').innerHTML = 0;

    // check game time to display correct word

    // start timer

    // compare the words

}