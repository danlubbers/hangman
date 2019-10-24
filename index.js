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

const testWord = 'aenima';

console.log("\nWelcome to Hangman!\nPress ctrl+c to stop\n");


let letter = prompt.question("Please guess a letter: ").toLowerCase();
// console.log(letter);


// Invokes function to check if the user input an invalid character or if the user input more than one character, prompts user to re-enter a valid letter
inputCheck();
function inputCheck() {
if(!onlyAlphabetCharacters.test(letter) || letter.length > 1) {

  if(letter.length > 1) {
    letter = prompt.question("\nOnly 'ONE' character is accepted, Please guess a single letter: ").toLowerCase()
    inputCheck();
  } 
  
  else if(!onlyAlphabetCharacters.test(letter)) {
    letter = prompt.question("\nOnly 'Alphabetical' Characters [A-Z] are accepted, Please guess a letter: ").toLowerCase();
    inputCheck();

  } else {
    console.log('alphabet outer: ', letter);
  }

  } else {
    console.log('double check: ', letter);
  }
}



