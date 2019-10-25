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

isFound ? console.log(`\nThe letter '${letter}' was found!\n`) 
        : console.log(`\nThe Letter ${letter} was not found!\n`, `\nYou have ${--count} guesses left`);


let matchingLetter = testWord.split('').map(e => e === letter ? letter : '__');
console.log(matchingLetter);

// console.log(matchingLetter.length);
if(count === 0) console.log(`\nThe answer was "${testWord.toUpperCase()}"`);

}