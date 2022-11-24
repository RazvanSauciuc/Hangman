let theWord = [];
let theAnswer = '';
let maxWrong = 7;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
let i = 0;
let x = 0;

var button = document.getElementById('enterButton');

function createButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
  `
    <button
      class = "btn btn-black btn-lg"
       id = '` + letter + `'
       onclick = "handleGuess('` + letter + `')"
    >
   ` + letter + `
   </button>
 `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function enterButton() {

  guessedWord();
  theAnswer = theWord.join('');
  x = 1;
  
  guessed = [];
  theWord = [];

  guessedWord();
  updateMistakes();
  createButtons();
  button.disabled = true;

}


function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  
  if (x === 1) {
    document.getElementById(chosenLetter).setAttribute('disabled', true);
  }

  theWord[i] = document.getElementById(chosenLetter).id;
  ++i;

  if(theAnswer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (theAnswer.indexOf(chosenLetter) === -1 && x === 1) {
      mistakes++;
      updateMistakes();
      checkIfGameLost();
      updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangMan').src = './imagesHangman/' + mistakes + '.jpg';
}

function checkIfGameWon() {
  if (wordStatus === theAnswer) {
    document.getElementById('keyboard').innerHTML = 'You Won !!!';
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = "The answear was: " + theAnswer;
    document.getElementById('keyboard').innerHTML = 'You Lost !!!';
  }
}

function guessedWord() {
  wordStatus = theAnswer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : "    ____    ")).join('');
  document.getElementById("wordSpotlight").innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  theWord = [];
  theAnswer = '';
  x = 0;
  button.disabled = false;

  document.getElementById('hangMan').src = "./imagesHangman/0.jpg";

  guessedWord();
  updateMistakes();
  createButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

createButtons();
