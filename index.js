const prompt = require("readline-sync");
const wordBank = require("./word-bank.json");

console.log("\nWelcome to Hangman!\nPress ctrl+c to stop\n");

const letter = prompt.question("Please guess a letter: ");
console.log(letter);

