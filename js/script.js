const guessedLetters = document.querySelector(".guessed-letters");
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
    const numbers = ["●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●"]
    numbers.splice(wordLength, (40-wordLength));
    wordProgress.innerText = numbers.join("");
};

showWord(word);
    
guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    inputLetter = letterInput.value;
    console.log(inputLetter);
    letterInput.value = "";
});

