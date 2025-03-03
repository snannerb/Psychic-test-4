// Predefined word list
const wordList = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape", "Honeydew"];

// DOM elements
const wordListElement = document.querySelector(".word-list");
const startTestButton = document.getElementById("start-test");
const messageElement = document.getElementById("message");
const scoreElement = document.getElementById("score");
const testCountElement = document.getElementById("test-count");

// Game variables
let hiddenWords = [];
let selectedWords = [];
let score = 0;
let testCount = 0;

// Initialize the word list
function initializeWordList() {
  wordListElement.innerHTML = wordList
    .map(
      (word) => `
    <li>${word}</li>
  `
    )
    .join("");
}

// Pick 2 unique hidden words
function pickHiddenWords() {
  hiddenWords = [];
  while (hiddenWords.length < 2) {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    if (!hiddenWords.includes(randomWord)) {
      hiddenWords.push(randomWord);
    }
  }
}

// Handle word selection
function handleWordSelection(event) {
  const selectedWord = event.target.textContent;
  if (!selectedWords.includes(selectedWord)) {
  }  selectedWords.push(selectedWord);
    event.target.classList.add("selected");
    if (selectedWords.length === 2) {
      checkAnswer();
    }
  }
}

// Check the user's selections
function checkAnswer() {
  let correctCount = 0;
  selectedWords.forEach((word) => {
    if (hiddenWords.includes(word)) {
      correctCount++;
    }
  });

  score += correctCount;
  scoreElement.textContent = score;

  testCount++;
  testCountElement.textContent = `Tests Remaining: ${5 - testCount}`;

  if (correctCount === 2) {
    messageElement.textContent = "You got both words right! Amazing!";
  } else if (correctCount === 1) {
    messageElement.textContent = "You got one word right. Good job!";
  } else {
    messageElement.textContent = "Sorry, none of your selections were correct.";
  }

  if (testCount === 5) {
    messageElement.textContent = `You've completed 5 tests! Final Score: ${score}`;
    setTimeout(() => {
      score = 0;
      testCount = 0;
      scoreElement.textContent = 0;
      testCountElement.textContent = "Tests Remaining: 5";
      resetTest();
    }, 3000);
  } else {
    setTimeout(() => {
      resetTest();
    }, 2000);
  }
}

// Reset the test
function resetTest() {
  selectedWords = [];
  document.querySelectorAll(".word-list li").forEach((li) => {
    li.classList.remove("selected");
  });
  messageElement.textContent = "";
  pickHiddenWords();
}

// Initialize the app
function initializeApp() {
  initializeWordList();
  pickHiddenWords();

  // Event listeners
  wordListElement.addEventListener("click", handleWordSelection);
  startTestButton.addEventListener("click", () => {
    score = 0;
    testCount = 0;
    scoreElement.textContent = 0;
    testCountElement.textContent = "Tests Remaining: 5";
    resetTest();
  });
}

// Start the app
initializeApp();