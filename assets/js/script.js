document.addEventListener('DOMContentLoaded', (e) => {
    // Typewritter effect on the welcome text
    displayText ()
})

// Typewritter effect on the welcome text
function displayText () {
    let welcomeTextEl = document.getElementById('welcome-text');
    let welcomeText = 'Welcome To WordType!';
    let i = 0;

    function typewritter(text, textEl){

        if(i < text.length) {
            textEl.innerHTML += text.charAt(i)
            i++
            setTimeout(typewritter, 100, text, textEl)
        }
    }
    typewritter(welcomeText, welcomeTextEl)
}


