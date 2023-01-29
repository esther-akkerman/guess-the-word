const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const guessRemainPar = document.querySelector(".remaining");
const guessRemain = document.querySelector("span");
const message = document.querySelector(".message");
const againButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetterArray = [];
let remainingGuesses = 8;

const getWord = async function() {
    const wordRequest = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await wordRequest.text();
    const wordArray = words.split("\n");
    selectRandomWord(wordArray);
    showWord(word);
}; 

const selectRandomWord = function(wordArray) {
    const randomIndex = Math.floor(Math.random()*wordArray.length);
    const randomWord = wordArray[randomIndex];
    word = randomWord.trim();
};

const showWord = function(word) {
    // placeholder for showing how far the word is guessed
    const letterArray = [];
    for (const letter of word) {
        letterArray.push("●");
    }
    wordProgress.innerText = letterArray.join("");
};

getWord();
    
guessButton.addEventListener("click", function(e) {
    // all functions happening when the guess button is clicked
    e.preventDefault();
    message.innerText = "";
    inputLetter = letterInput.value;
    letterInput.value = "";
    const returnLetter = valInput(inputLetter);
    if (returnLetter !== undefined) {
        upperLetter = returnLetter.toUpperCase();
        makeGuess(upperLetter);
        wordUpdate(guessedLetterArray);   
    }; 
});

const valInput =  function(inputLetter) {
    // sets condiontal blocks to make sure the input is a letter
    const acceptedLetters = /[a-zA-Z]/;
    if (inputLetter === "") {
        message.innerText = "There is no input, please fill in a letter from A to Z.";
    } else if (inputLetter.length > 1) {
        message.innerText = "Please only guess 1 letter at a time.";
    } else if (!inputLetter.match(acceptedLetters)) {
        message.innerText = "This is not a letter, please fill in a letter from A to Z.";
    }
    else {
        return inputLetter;
    };
};

const makeGuess = function(upperLetter) {
    // adds the new guessed letter to the array
    if (guessedLetterArray.includes(upperLetter) === true) {
        message.innerText = "You already guessed this letter before, try a new letter.";
    } else {
        guessedLetterArray.push(upperLetter);
        countGuesses(upperLetter);
        updateGuess();
    }
};

const updateGuess = function() {
    // shows which letters the player already guessed
    guessedLetters.innerHTML = "";
    for (let item of guessedLetterArray) {
        let li = document.createElement("li");
        li.innerText = item;
        guessedLetters.append(li);
    };
};

const wordUpdate = function(guessedLetterArray) {
    //shows which letters the player guessed right and in which position of the word they are
    wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const guessedWordArray = [];
    for (const letter of wordArray) {
        if (guessedLetterArray.includes(letter)) {
        guessedWordArray.push(letter.toUpperCase());
        } else {
        guessedWordArray.push("●");
        }   
    };
    wordProgress.innerText = guessedWordArray.join("");
    playerWins(wordProgress, wordUpper);
};

const countGuesses = function(upperLetter) {
    wordUpper = word.toUpperCase();
    if (!wordUpper.includes(upperLetter)) {
        message.innerText = `The word does not contain the letter ${upperLetter}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Yes, the word contains the letter ${upperLetter}`;
    };
    if (remainingGuesses === 0) {
        message.innerText = `You lost. The word was "${word}".`;
        startOver();
    } else if (remainingGuesses === 1) {
        guessRemain.innerText = `${remainingGuesses} guess`;
    } else {
        guessRemain.innerText = `${remainingGuesses} guesses`
    };
};

const playerWins = function(wordProgress, wordUpper) {
    //checks if player won and shows styled winning message
    if (wordProgress.innerText === wordUpper) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the word correct! Congrats!</p>`;
        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    guessRemainPar.classList.add("hide");
    guessedLetters.classList.add("hide");
    againButton.classList.remove("hide");
};

againButton.addEventListener("click", function() {
    message.classList.remove("win");
    message.innerText = "";
    guessedLetters.innerHTML = "";
    remainingGuesses = 8;
    guessedLetterArray = [];
    guessRemain.innerText = `${remainingGuesses} guesses`;
    guessButton.classList.remove("hide");
    guessRemainPar.classList.remove("hide");
    guessedLetters.classList.remove("hide");
    againButton.classList.add("hide");
    getWord();
});



