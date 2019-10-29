const prompt = require("readline-sync");
const wordBank = require("./word-bank.json");

// Global Variables
const clearScreenAndHistory = "\u001b[H\u001b[2J\u001b[3J";
const clearScreen = "\u001B[2J\u001B[0;0f";
const onlyAlphabetCharacters = /[a-z]/gi;
let randomWordIndex = undefined;
let randomWord = '';
let guessedLetter = '';
let count = 6;
let correctCharacters = '';
let incorrectCharacters = [];

// State
let gameResults = {
  "Total Rounds Played": 1,
  "Wins": 0, 
  "Losses": 0
};

// Starts with a fresh clear interface
console.log(clearScreenAndHistory);

wordGenerator();
// function generates new random word
function wordGenerator() {
  // Gets a random number between 0 and length of the array and sets it to the variable
  randomWordIndex = Math.floor(Math.random(wordBank) * (wordBank.length - 0) + 0);
  // console.log(randomWordIndex);
  
  // Uses the randomWordIndex to set the actual word from the array to the variable 
  randomWord = wordBank[randomWordIndex].toUpperCase();
  // console.log({randomWord});
}


// The correctCharacters Array length has to be set after the wordGenerator() because otherwise the randomWord has not been initialized yet and will be a length of 0
correctCharacters = Array(randomWord.length).fill('__');
// console.log('after initialization: ', correctCharacters);

// *** GREETING *** 
// Greeting when logging in for the First Time
console.log(`Welcome to Hangman!\nPress CTRL-C to stop\n`);
console.log(`\nWords are chosen at random for each round`);
console.log(`\nBegin by inputting your first guess below...\n`);


// *** START OF THE GAME ***
// Start of game loop | Game counts down from 6 and once it gets to zero there is either a win or loss and the game restarts.
while(count > 0) {

  guess()
  function guess() {  
    guessedLetter = prompt.question("\nChoose a single letter between a-z: ").toUpperCase();
  };


  // Invokes function to check if the user input an invalid character or if the user input more than one character, prompts user to re-enter a valid letter
  inputValidationCheck();
  function inputValidationCheck() {
    if(!onlyAlphabetCharacters.test(guessedLetter) || guessedLetter.length > 1) {
      
      if(guessedLetter.length > 1) {
        guessedLetter = prompt.question("\nOnly \x1b[31m'ONE' \x1b[37mletter is accepted, Please guess a single letter: ").toUpperCase()
        inputValidationCheck();
      } 
      
      else if(!onlyAlphabetCharacters.test(guessedLetter)) {
        guessedLetter = prompt.question("\nOnly \x1b[33m'Alphabetical' \x1b[37mCharacters are accepted, Please guess a letter: ").toUpperCase();
        inputValidationCheck();
      } 
    }
  }

  // console.log('After Input Check: ', letter);

  // isFound variable checks if the letter is in the word
  let isFound = randomWord.split('').includes(guessedLetter);

  // Checks if letter has already been guessed
  let hasCharacterAlreadyBeenGuessed = incorrectCharacters.includes(guessedLetter);
  // console.log('hasCharacterAlreadyBeenGuessed: ', hasCharacterAlreadyBeenGuessed);

  // if isFound is true and the letter is not already been added to correctCharacters log the letter was found
  if(isFound && !correctCharacters.includes(guessedLetter)) { 
    console.log(`\nThe letter \x1b[32m'${guessedLetter}' \x1b[37mwas found!\n`); 
    
    // If guessed letter is found, gets "all" the indexs of letter in randomWord
    const indexOfAll = randomWord.split('').map((letter, idx) => letter === guessedLetter ? idx : null).filter(idx => idx !== null)  
    
    // maps over indexOfAll and pushes the guessedLetter to each index in which it was found
    indexOfAll.map(indexNum => correctCharacters.splice(indexNum, 1, guessedLetter))
    // correctCharacters.push(guessedLetter);
    console.log(`\x1b[32m${correctCharacters.join(' ')}\x1b[37m`);
    
    // if correctCharacters array already has the guessed letter, will notify, has already been found.
  } else if(correctCharacters.includes(guessedLetter)) {
    console.log(`\nThe letter \x1b[32m'${guessedLetter}' \x1b[37mhas already been found!\n`);
    console.log(`\x1b[32m${correctCharacters.join(' ')}\x1b[37m`);

    
  } else {
    // A wrong guess pushes the letter to the incorrectCharacters array
    incorrectCharacters.push(guessedLetter);
    console.log(`\nThe letter \x1b[31m'${guessedLetter}' \x1b[37mwas 'NOT' found!\n`); 
    console.log(`Incorrect Guesses: \x1b[31m${incorrectCharacters.join(' ')}\x1b[37m\n`);
    
    
    // *** START OF HANGMAN GRAPHIC ***
    switch(count) {
      case 6: console.log(`    🙂\n`);
        break;
      case 5: console.log(`    🤨\n     |\n`);
        break;
      case 4: console.log(`    😑\n    \\|\n`);
        break;
      case 3: console.log(`    😳\n\    \\|/\n     |\n`);
        break;
      case 2: console.log(`    😵\n\    \\|/\n     |\n    /\n`);
        break;
      case 1: console.log(`    💀\n\    \\|/\n     |\n    / \\\n`);
        break;
    };
    
    console.log(`\x1b[32m${correctCharacters.join(' ')}\x1b[37m`);
    
    if(hasCharacterAlreadyBeenGuessed) {
      // Informs the user that they have already guessed that particular letter 
      console.log(`\x1b[33m\nYou have already guessed the letter \x1b[31m\'${guessedLetter}'\x1b[33m\.\nA repeat guess will not count against you but, it also serves no purpose.\nPlease guess a new letter below.\n`);
      // if the letter has not already been guessed and is incorrect the count WILL NOT decrement
      console.log(`\x1b[37m\nYou have \x1b[33m${count} \x1b[37mguesses left\n`);
      console.log(`\x1b[32m${correctCharacters.join(' ')}\x1b[37m`);
    } else {
      // if there is only 1 guess left changes guesses plural to singular to be grammatically correct
      if(count === 2) {
        // SINGULAR
        // if the letter has not already been guessed and is incorrect the count will decrement
        console.log(`\nYou have \x1b[33m${--count} \x1b[37mguess left\n`);
      } else {
        // PLURAL
        console.log(`\nYou have \x1b[33m${--count} \x1b[37mguesses left\n`);
      }
    }
  }

  // Setup an End Of Round function to keep with the practice of DRY: Do Not Repeat yourself
  function endOfRound() {
       // This resets the 'state' so the game continues to play only until the User Presses Ctrl-C to exit Node
       count = 6;
       incorrectCharacters = []; 
       
       // Increments the Total amount of Rounds played in the gameResults Object
       gameResults["Total Rounds Played"]++;
       
       // Invokes wordGenerator to pick a new random word for the next round
       wordGenerator();
       
       // The correctCharacters Array length has to be set after the wordGenerator() picks the next random word because the length of the word might be different
       correctCharacters = Array(randomWord.length).fill('__');
       
      }

  // *** WINNING ROUND ***
  if(correctCharacters.join('') === randomWord) {
    console.log(`\n\nYou guessed the correct word: \x1b[32m${randomWord} \x1b[37m\n\n`);
    gameResults.Wins++;

     // Prints the Key Value pairs for Total Rounds, Wins and Losses at the end of the round
     Array.from(Object.keys(gameResults)).forEach(key => {
      console.log(`${key}: ${gameResults[key]}`);    
    });

    // Informs user if they want a rematch to just keep playing or the keys they need to press to quit
    console.log(`\n\x1b[36mWant to play another round? Continue to keep playing or press CTRL-C to quit!\x1b[37m\n`);

    endOfRound();
  }
  
  // *** LOSING ROUND ***
  // Once all the guesses have run out and the user has not been able to solve the answer, we console log the answer here!
  if(count === 0) {
    console.log(`\nThe answer was \x1b[32m"${randomWord.toUpperCase()}" \x1b[37m\n\n`);
    gameResults.Losses++;
    
    // Prints the Key Value pairs for Total Rounds, Wins and Losses at the end of the round
    Array.from(Object.keys(gameResults)).forEach(key => {
      console.log(`${key}: ${gameResults[key]}`);    
    });
    
    // Informs user if they want a rematch to just keep playing or the keys they need to press to quit
    console.log(`\n\x1b[36mWant a rematch? Continue to keep playing or press CTRL-C to quit!\x1b[37m\n`);
    
    endOfRound();
  }
}