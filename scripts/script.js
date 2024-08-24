const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetter, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    //Reseting all variables and UI elements
    correctLetter = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => '<li class="letter"></li>').join("");
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    // selcting a random word and hint from the wordlist 
    const { word , hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    // list of word length and inserting in wordDisplay 
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
    wordDisplay.innerHTML = word.split("").map(() => '<li class="letter"></li>').join("");
}

const gameOver = (isVictory) => {
    //After 600ms of game complete. showing modal with relevant details
    setTimeout(() => {
        const modalText = isVictory ? `you found the word` :`The correct word was:`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : `lost`}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? `Congrats!` : `Game Over!`}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
}

const initGame = (button, clickedLetter) => {
    //checking if clicked letter exist in a currentword or not
    if (currentWord.includes(clickedLetter)) {
        //  to displays the matched word or correct word
        [...currentWord].forEach((letter,index) => {
            if(letter === clickedLetter) {
                correctLetter.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
    //    if clicked letter doesn't exist update the wrong count and hangman image 
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
     //Calling GAMEOVER condition if any condition meets
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetter.length === currentWord.length) return gameOver(true);
}

// creating keyboard buttons and add event listener
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    // making the buttons clickable 
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);