let theWord = [];
let theAnswer = '';
let maxWrong = 7;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
let i = 0;
let x = 0;

var button = document.getElementById('enterButton'); // variabila button este creata pentru a nu putea apasa de 2 ori butonul "enter the word" inainte de a reseta jocul

function createButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>  // creem tastatura virtuala
  `
    <button
      class = "btn btn-black btn-lg"
       id = '` + letter + `'
       onclick = "handleGuess('` + letter + `')"
    >
   ` + letter + `
   </button>
 `).join(''); // scapam de caracterul "," dintre litere

  document.getElementById('keyboard').innerHTML = buttonsHTML; 
}

function enterButton() {

  guessedWord();
  theAnswer = theWord.join('');
  x = 1; //pentru ca de fiecare data cand apasam un buton se va executa functia handleGuess, ne asiguram ca programul va rula corect doar dupa apasarea butonului "enter the word"
  
  guessed = [];
  theWord = [];

  guessedWord();
  updateMistakes();
  createButtons();
  button.disabled = true; // dezactivam butonul "enter the word" dupa ce l-am apasat

}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  
  if (x === 1) {
    document.getElementById(chosenLetter).setAttribute('disabled', true); // dezactivam fiecare litera dupa apasarea sa dar doar dupa ce a fost introdus cuvantul pentru ghicit
  }

  theWord[i] = document.getElementById(chosenLetter).id; // implementam citirea cuvantului de ghicit din tastatura virtuala
  ++i;

  if(theAnswer.indexOf(chosenLetter) >= 0) { // daca litera apasata se regaseste in cuvantul de ghicit, se va afisa si se va verifica daca ai castigat
    guessedWord();
    checkIfGameWon();
  } else if (theAnswer.indexOf(chosenLetter) === -1 && x === 1) { // daca s-a apasat butonul "enter the word" iar litera apasata nu corespunde cu nici o litera din cuvantul de ghicit, 
      mistakes++;                                                 // se vor actualiza greselile, imaginile si se va verifica daca jocul a luat sfarsit
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
    document.getElementById('hangMan').src = './imagesHangman/9.jpg';
    document.getElementById('wordSpotlight').innerHTML = "";
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = "The answear was: " + theAnswer;
    document.getElementById('keyboard').innerHTML = 'You Lost !!!';
  }
}

function guessedWord() { // se inlocuiesc toate literele cuvantului de ghicit cu caracterul "_" si se scapa de "," dintre ele
  wordStatus = theAnswer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
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
