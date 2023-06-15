var character = document.getElementById("character");
var block = document.getElementById("block");
var gameOverContainer = document.getElementById("gameOverContainer");
var overlayImage = document.getElementById("overlayImage");
var restartButton = document.getElementById("restartButton");
var backgroundMusic = document.getElementById("backgroundMusic");
var gameOverSound = document.getElementById("gameOverSound");
var counter = 0;
var bestScore = 0;
var isGameOver = false;
var gameSpeed = .75; // Adjust the game speed as needed (higher value for slower speed)

backgroundMusic.volume = 0.2; // Set the volume to 50% (half of the maximum volume)

// Sample leaderboard data
var leaderboardData = [
  // Add more data as needed
];

function playMusic() {
  backgroundMusic.play();
}

function pauseMusic() {
  backgroundMusic.pause();
}

// Auto play the music when the page loads
window.addEventListener("load", playMusic);

// Allows Initial Keypress to enable Jumping upon loading website
window.addEventListener("keypress", jump);

function jump() {
  character.classList.add("animate");
  setTimeout(function () {
    character.classList.remove("animate");
  }, 300);
}



function handleGameOver() {
  // Display the game over image and overlay
  gameOverContainer.style.display = "block";
  overlayImage.style.display = "block";
  isGameOver = true;
  character.classList.remove("animate");
  pauseBlockMovement();
  pauseMusic();
  playGameOverSound();
}

function handleNewGame() {
  // Hide the game over image and overlay
  gameOverContainer.style.display = "none";
  overlayImage.style.display = "none";
  isGameOver = false;
  resumeBlockMovement();
  resumeMusic();
  resetBlockPosition();
}

function playGameOverSound() {
  gameOverSound.play();
}

function pauseMusic() {
  backgroundMusic.pause();
}

function resumeMusic() {
  backgroundMusic.play();
}

// Restart the game when the restart button is clicked
restartButton.addEventListener("click", function () {
  handleNewGame();
  resumeMusic();
  resetBlockPosition();
});

// Pause the movement of the block
function pauseBlockMovement() {
  block.style.animationPlayState = "paused";
}

// Resume the movement of the block
function resumeBlockMovement() {
  block.style.animationPlayState = "running";
}

function resetBlockPosition() {
  var gameWidth = document.querySelector(".game").offsetWidth;
  var blockWidth = block.offsetWidth;
  var blockSpacing = 200; // Adjust the spacing between blocks as needed

  var totalBlockWidth = blockWidth + blockSpacing;
  var initialLeft = gameWidth;

  var leftPosition = initialLeft;
  block.style.left = leftPosition + "px";
  block.style.animationDuration = "2s"; // Adjust the animation duration as needed
  block.style.animationName = "block";
}

function stopBlockAnimation(block) {
  block.style.animationName = "none";
}

var checkDead = setInterval(function () {
  let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
  let characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
  let characterRight = characterLeft + character.offsetWidth;
  let characterBottom = characterTop + character.offsetHeight;

  let blockTop = parseInt(window.getComputedStyle(block).getPropertyValue("top"));
  let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
  let blockRight = blockLeft + block.offsetWidth;
  let blockBottom = blockTop + block.offsetHeight;

  if (
    characterRight > blockLeft &&
    characterLeft < blockRight &&
    characterBottom > blockTop &&
    characterTop < blockBottom
  ) {
    if (!isGameOver) {
      stopBlockAnimation(block);

      var score = Math.floor(counter / 100);
      if (score > bestScore) {
        bestScore = score;
        document.getElementById("scorebest").innerHTML = bestScore;
      }

      var playerName = prompt("Game Over. Enter your name:");
      if (playerName) {
        handleNewHighScore(playerName, score);
        updateLeaderboard();
      }

      counter = 0;
      handleGameOver();
    }
    return; // Exit the function early when game over
  }

  counter++;
  document.getElementById("scoreSpan").innerHTML = Math.floor(counter / 100);
}, 10);

function handleNewHighScore(playerName, score) {
  // Add new entry to leaderboard data
  leaderboardData.push({
    rank: leaderboardData.length + 1,
    name: playerName,
    score: score,
  });

  // Sort the leaderboard data based on score (descending order)
  leaderboardData.sort(function (a, b) {
    return b.score - a.score;
  });

  // Truncate the leaderboard data to a maximum of 10 entries
  leaderboardData = leaderboardData.slice(0, 10);
}

function updateLeaderboard() {
  var leaderboardTable = document.getElementById("leaderboard");
  var tbody = leaderboardTable.getElementsByTagName("tbody")[0];
  tbody.innerHTML = ""; // Clear existing rows

  // Add new rows
  for (var i = 0; i < leaderboardData.length; i++) {
    var entry = leaderboardData[i];
    var row = tbody.insertRow();
    var rankCell = row.insertCell();
    var nameCell = row.insertCell();
    var scoreCell = row.insertCell();

    rankCell.textContent = entry.rank;
    nameCell.textContent = entry.name;
    scoreCell.textContent = entry.score;
  }
}

function submitName() {
  var playerName = document.getElementById("playerNameInput").value;
  var score = Math.floor(counter / 100);
  if (playerName) {
    handleNewHighScore(playerName, score);
    updateLeaderboard();
  }
  gameOverContainer.style.display = "none"; // Hide the game over image
  overlayImage.style.display = "none"; // Hide the overlay image
  gameOverContainer.style.pointerEvents = "none"; // Disable overlay interaction
}

function cancelSubmission() {
  gameOverContainer.style.display = "none"; // Hide the game over image
  overlayImage.style.display = "none"; // Hide the overlay image
  gameOverContainer.style.pointerEvents = "none"; // Disable overlay interaction
}

// Call the function to initially populate the leaderboard
updateLeaderboard();

// Randomly start the animation for the block
resetBlockPosition();
