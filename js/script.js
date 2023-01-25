const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const guessRemainPar = document.querySelector(".remaining");
const guessRemain = document.querySelector("span");
const message = document.querySelector(".message");
const againButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetterArray = [];

const showWord = function(word) {
    // placeholder for showing how far the word is guessed
    const wordLength = word.length;
    // came up with this solution, it looks strange, but it does work. Good creative problem solving, but I think I'll learn better ways!
    const dots = ["●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●","●"]
    dots.splice(wordLength, (40-wordLength));
    wordProgress.innerText = dots.join("");
};

showWord(word);
    
guessButton.addEventListener("click", function(e) {
    // all functions happening when the guess button is clicked
    e.preventDefault();
    message.innerText = "";
    inputLetter = letterInput.value;
    letterInput.value = "";
    const returnLetter = valInput(inputLetter);
    if (returnLetter !== undefined) {
        makeGuess(returnLetter);
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

const makeGuess = function(letter) {
    // adds the new guessed letter to the array
    letter = letter.toUpperCase();
    if (guessedLetterArray.includes(letter) === true) {
        message.innerText = "You already guessed this letter before, try a new letter.";
    } else {
        guessedLetterArray.push(letter);
        updateGuess();
        console.log(guessedLetterArray);
    }
};

const updateGuess = function() {
    wordProgress.innerHTML = "";
    for (let item of guessedLetterArray) {
        let li = document.createElement("li");
        li.innerText = item;
        guessedLetters.append(li);
    };
};

