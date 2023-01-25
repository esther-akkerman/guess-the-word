const guessedLetters = document.querySelector(".guessed-letters");
const guessedLetterArray = [];
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const guessRemainPar = document.querySelector(".remaining");
const guessRemain = document.querySelector("span");
const message = document.querySelector(".message");
const againButton = document.querySelector(".play-again");

const word = "magnolia";

const showWord = function(word) {
    const wordLength = word.length;
    const dots = ["●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●"]
    dots.splice(wordLength, (40-wordLength));
    wordProgress.innerText = dots.join("");
};

showWord(word);
    
guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    message.innerText = "";
    inputLetter = letterInput.value;
    letterInput.value = "";
    valInput(inputLetter);
    const returnLetter = valInput(inputLetter); //Add a conditional block somewhere that only letters are output.
    if (returnLetter !== undefined) {
        makeGuess(returnLetter);
    };
});

const valInput =  function(inputLetter) {
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

const makeGuess = function(letter) {
    letter.toUppercase;
    if (guessedLetterArray.includes(letter) === true) {
        message.innerText = "You already guessed this letter before, try a new letter.";
    } else {
        guessedLetterArray.push(letter);
        console.log(guessedLetterArray);
    }
};

