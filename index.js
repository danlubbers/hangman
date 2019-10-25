const prompt = require("readline-sync");
const wordBank = require("./word-bank.json");

// Gets a random number between 0 and length of the array and sets it to the variable
const randomWordIndex = Math.floor(Math.random(wordBank) * (wordBank.length - 0) + 0);
// console.log(randomWordIndex);

// Uses the randomWordIndex to set the actual word from the array to the variable 
const randomWord = wordBank[randomWordIndex];
// console.log(randomWord);

// Using Regex to check for only upper and lower case letters from A to Z
const onlyAlphabetCharacters = /[a-zA-Z]/gi;
// Test Cases
// console.log(onlyAlphabetCharacters.test('a')) // true;
// console.log(onlyAlphabetCharacters.test(1)) // false;
// console.log(onlyAlphabetCharacters.test('$')) // false;

const testWord = 'AENIMA';

console.log("\nWelcome to Hangman!\nPress ctrl+c to stop\n");

let letter = '';
let count = 6;
let incorrectCharacters =[];
let gameResults = {
  "Total Rounds Played": 0,
  "Wins": 0, 
  "Losses": 0
};

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
          letter = prompt.question("\nOnly 'ONE' character is accepted, Please guess a single letter: ").toUpperCase()
          inputValidationCheck();
        } 
        
        else if(!onlyAlphabetCharacters.test(letter)) {
          letter = prompt.question("\nOnly 'Alphabetical' Characters are accepted, Please guess a letter: ").toUpperCase();
          inputValidationCheck();

        } else {
          // console.log('second check: ', letter);
        }

      } else {
        // console.log('first check: ', letter);
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

  } else {
    // A wrong guess pushes the letter to the incorrectCharacters array
    incorrectCharacters.push(letter);
    console.log(`\nThe Letter \x1b[31m'${letter}' \x1b[37mwas 'NOT' found!\n`); 

    if(hasCharacterAlreadyBeenGuessed) {
      // Informs the user that they have already guessed that particular letter 
      console.log(`\x1b[33m\nYou have already guessed that letter.\nA repeat guess will not count against you but, it also serves no purpose.\nPlease guess a new letter below.\n`);
      // if the letter has not already been guessed and is incorrect the count WILL NOT decrement
      console.log(`\x1b[37m\nYou have \x1b[33m${count} \x1b[37mguesses left\n`);
    } else {
      // if the letter has not already been guessed and is incorrect the count will decrement
      console.log(`\nYou have \x1b[33m${--count} \x1b[37mguesses left`);
    }
  }


  let matchingLetter = testWord.split('').map(e => e === letter ? letter : '__');
  console.log(matchingLetter);


  // Once all the guesses have run out and the user has not been able to solve the answer, we console log the answer here!
  if(count === 0) {
    console.log(`\n\n\nThe answer was "${testWord.toUpperCase()}"\n`);

    
    Array.from(Object.keys(gameResults)).forEach(key => {
      console.log(`${key}: ${gameResults[key]}`);
    
    });
    

    // This resets the 'state' so the game continues to play only until the User Presses Ctrl-C to exit Node
    count = 6;
    incorrectCharacters = []; 
  }

}