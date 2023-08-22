const wordEl = document.getElementById('word');
const wrongLetterEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard', 'magic', 'valorant', 'jonim'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//Function to show Hiddin words

function displayWords () {
    wordEl.innerHTML = `
    ${selectedWord
    .split('')
    .map(letter => `
    <span class='letter'>
    ${correctLetters.includes(letter) ? letter : ''}
    </span>
    `).join('')}
`;

const innerWord = wordEl.innerText.replace(/\n/g, '')

if(innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You Won 😃';
    popup.style.display = 'flex';
}
}


//update Worng Letters 

function updateWorngLettersEl () {
    //Display Worng Letters 
    wrongLetterEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;


    //Display Parts 
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    //Check if the game is over
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately you lost ☹️';
        popup.style.display = 'flex';
    }
}

//Show notification 

function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}


//Keydown letter press

window.addEventListener('keydown', e => {
    //console.log(e.keyCode);
    if(e.keyCode >= 65 && e.keyCode <=90){
       const letter = e.key;

       if(selectedWord.includes(letter)) {
        if(!correctLetters.includes(letter)) {
            correctLetters.push(letter);

            displayWords();
        } else {
            showNotification();
        }
       } else {
        if(!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);

            updateWorngLettersEl();
        } else {
            showNotification();
        }
       }
    }
});

//Restart the game and play again 

playAgainBtn.addEventListener('click', () => {
    //Empty the arrays 
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWords();

    updateWorngLettersEl();

    popup.style.display = 'none';
})

displayWords();