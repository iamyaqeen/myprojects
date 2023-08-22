const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');


const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
  ];

  //init word 

  let randomWord;

  //init score 

  let score = 0;

  //init time 

  let time = 10;

  // set difficulty to value in the list or mmedium

  let difficulty = localStorage.getItem('difficulty') !== null ? 
  localStorage.getItem('difficulty') : 'medium';

  //Set difficulty to selected value 

  difficultySelect.value = localStorage.getItem('difficulty') !== null ? 
  localStorage.getItem('difficulty') : 'medium';

  // Focus on text on start 
  text.focus();

  //Start counting down

  const timeInterval = setInterval(updateTime, 1000)

  //Generate a random word drom an array
  function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  //Add word to DOM

  function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
  }

  //Update Score 
  function updateScore() {
    score++;
    scoreEl.innerHTML = score;
  }


  //Update Time 

  function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if(time === 0 ) {
        clearInterval(timeInterval);

        //end game
        gameOver();
    }
  }

  //Game over show on screen

  function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p> Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;

    endgameEl.style.display='flex';
  }

  addWordToDOM();


  //Event Listners 

  // Typing event listener

  text.addEventListener('input', e => {
    const insertedText = e.target.value;
    

    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        //clear 
        e.target.value = '';

        if (difficulty === 'hard') {
            time += 3;
        } else if (difficulty === 'medium') {
            time += 4;
        } else {
            time += 5;
        }
        

        updateTime();
    }
  });

  // Settings Button click 

  settingBtn.addEventListener('click', () =>  
  settings.classList.toggle('hide'));
  
  //Settings select 
  settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
  })



