const prompt = require("readline-sync");
const wordBank = require("./word-bank.json");

// Gets a random number between 0 and length of the array and sets it to the variable
const randomWordIndex = Math.floor(Math.random(wordBank) * (wordBank.length - 0) + 0);
// console.log(randomWordIndex);

// Uses the randomWordIndex to set the actual word from the array to the variable 
const randomWord = wordBank[randomWordIndex].toUpperCase();
// console.log(randomWord);

// console.log(randomWord);

// Using Regex to check for only upper and lower case letters from A to Z
const onlyAlphabetCharacters = /[a-zA-Z]/gi;
// Test Cases
// console.log(onlyAlphabetCharacters.test('a')) // true;
// console.log(onlyAlphabetCharacters.test(1)) // false;
// console.log(onlyAlphabetCharacters.test('$')) // false;

const testWord = 'AENIMA';

// Greeting when logging in for the First Time
console.log(`\nWelcome to Hangman!\nPress CTRL-C to stop\n`);
console.log(`\nWords are chosen at random for each round`);
console.log(`\nBegin by inputting your first guess below...`);


// Global Variables / State
let letter = '';
let count = 6;
let correctCharacters = [];
let incorrectCharacters = [];
let gameResults = {
  "Total Rounds Played": 1,
  "Wins": 0, 
  "Losses": 0
};


// Start of game loop | Game counts down from 6 and once it gets to zero there is either a win or loss and the game restarts. Use Ctrl-C to exit the game and nodejs
while(count > 0) {
  
  guess()
  function guess() {  
    letter = prompt.question("\nChoose a single character between a-z: ").toUpperCase();
  // console.log(letter);
  };


  // Invokes function to check if the user input an invalid character or if the user input more than one character, prompts user to re-enter a valid letter
  inputValidationCheck();
  function inputValidationCheck() {
    if(!onlyAlphabetCharacters.test(letter) || letter.length > 1) {

      if(letter.length > 1) {
        letter = prompt.question("\nOnly \x1b[31m'ONE' \x1b[37mcharacter is accepted, Please guess a single letter: ").toUpperCase()
        inputValidationCheck();
      } 
        
      else if(!onlyAlphabetCharacters.test(letter)) {
        letter = prompt.question("\nOnly \x1b[33m'Alphabetical' \x1b[37mCharacters are accepted, Please guess a letter: ").toUpperCase();
        inputValidationCheck();

      } 
    }
  }

  // console.log('After Input Check: ', letter);

  // isFound variable checks if the letter is in the word
  let isFound = testWord.split('').includes(letter);

  // Checks if letter has already been guessed
  let hasCharacterAlreadyBeenGuessed = incorrectCharacters.includes(letter);
  // console.log('hasCharacterAlreadyBeenGuessed: ', hasCharacterAlreadyBeenGuessed);

  if(isFound) { 
    console.log(`\nThe letter \x1b[32m'${letter}' \x1b[37mwas found!\n`); 
    if(!correctCharacters.includes(letter)) {
      correctCharacters.push(letter);
      console.log(correctCharacters);
    }

  } else {
    // A wrong guess pushes the letter to the incorrectCharacters array
    incorrectCharacters.push(letter);
    console.log(`\nThe Letter \x1b[31m'${letter}' \x1b[37mwas 'NOT' found!\n`); 

    if(hasCharacterAlreadyBeenGuessed) {
      // Informs the user that they have already guessed that particular letter 
      console.log(`\x1b[33m\nYou have already guessed the letter \x1b[31m\'${letter}'\x1b[33m\.\nA repeat guess will not count against you but, it also serves no purpose.\nPlease guess a new letter below.\n`);
      // if the letter has not already been guessed and is incorrect the count WILL NOT decrement
      console.log(`\x1b[37m\nYou have \x1b[33m${count} \x1b[37mguesses left\n`);
    } else {
      // if the letter has not already been guessed and is incorrect the count will decrement
      console.log(`\nYou have \x1b[33m${--count} \x1b[37mguesses left\n`);
    }
  }


  let matchingLetter = testWord.split('').map(e => e === letter ? letter : '__');
  console.log(matchingLetter);


  // Once all the guesses have run out and the user has not been able to solve the answer, we console log the answer here!
  if(count === 0) {
    console.log(`\n\n\nThe answer was \x1b[32m"${testWord.toUpperCase()}" \x1b[37m\n`);
    gameResults.Losses++;
    
    // Prints the Key Value pairs for Total Rounds, Wins and Losses at the end of the round
    Array.from(Object.keys(gameResults)).forEach(key => {
      console.log(`${key}: ${gameResults[key]}`);    
    });

    // Informs user if they want a rematch to just keep playing or the keys they need to press to quit
    console.log(`\n\x1b[36mWant a rematch? Continue to keep playing or press CTRL-C to quit!\x1b[37m\n`);

    // This resets the 'state' so the game continues to play only until the User Presses Ctrl-C to exit Node
    count = 6;
    correctCharacters = [];
    incorrectCharacters = []; 

    // Increments the Total amount of Rounds played in the gameResults Object
    gameResults["Total Rounds Played"]++;
  }

}