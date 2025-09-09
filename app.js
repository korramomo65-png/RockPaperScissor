
const gestureBtns = document.querySelectorAll(".gesture-btn");
const menuBtns = document.querySelectorAll(".menu-btn");

let winningScore = 51;
let p1Score = 0;
let p2Score = 0;


// > ---------- PLAYERS  ----------

// * Player 1 options.
function playerOne(e) {
  const selectedOption = e.target.id;
  return selectedOption;
}

//* Player 2 options.
function playerTwo() {
  const options = ["Rock", "Paper", "Scissor"];
  const randNum = Math.floor(Math.random() * options.length);
  const computerGesture = options[randNum];
  return computerGesture;
}


// ---------- GAME SEQUENCE/LOOP ----------


toggleGestureButtonState(false)

//* Winner and animation handler.
async function runGameRound(e) {
  const player1 = playerOne(e);
  const player2 = playerTwo();
  const isPlayerwinner = getWinner(player1, player2);
  btnAnimation(e.target);
  toggleMenuButtonState(1, false);
  await animateElement();
  await imgDisplay(player1, player2);
  updateScoreBoard(isPlayerwinner);
  await gestureReset();
}



//* Win and Lose function.
function getWinner(player1, player2) {
  if (player1 === player2) return "TIE";
  
  if (
    (player1 === "Rock" && player2 === "Scissor") ||
    (player1 === "Paper" && player2 === "Rock") ||
    (player1 === "Scissor" && player2 === "Paper")
  ) {
    return true;
  }
  
  return false;
  }


//* Scoring function.
function updateScoreBoard(isPlayerwinner) {
  setTimeout(() => {
    const p1Display = document.querySelector("#p1Display");
    const p2Display = document.querySelector("#p2Display");
    const isTie = isPlayerwinner === "TIE";
    const scoreBoard = isPlayerwinner ? p1Display : p2Display;
    const winLose = isPlayerwinner ? "You Win" : "You lose";
    const declareWinner = isPlayerwinner ? "Player 1 Wins" : "Player 2 Wins";
    const score = isTie ? scoreBoard.textContent : ++scoreBoard.textContent;
    display.textContent = isTie ? "Tie" : winLose;
    scoreBoard.textContent = score;

    if (score === winningScore) {
      display.textContent = declareWinner;
      setTimeout(() => {
        display.textContent = "Press start to play again";
      }, 2000);
      toggleMenuButtonState(1, true);
      toggleMenuButtonState(0, true);
    } else {
      setTimeout(() => {
        toggleGestureButtonState(true);
        toggleMenuButtonState(1, true);
        display.textContent = "Pick";
      }, 900);
    }
  }, 800);
}

gestureBtns.forEach((btn) => btn.addEventListener("click", runGameRound));


// ---------- START AND RESET ----------

// * Start and Reset function.
const display = document.querySelector(".text-display");

function startOrReset(e) {
  const selectedMenu = e.target.id;
  [p1Score, p2Score] = [0, 0];
  [p1Display.textContent, p2Display.textContent] = [0, 0];
  btnAnimation(e.target);
  
  if (selectedMenu === "start") {
    display.textContent = "Pick";
    toggleMenuButtonState(0, false);
    toggleGestureButtonState(true);
  } else {
    display.textContent = "Game reset";
    toggleMenuButtonState(0, false);
    toggleGestureButtonState(false);
    setTimeout(() => {
      display.textContent = "Press Start to Play";
      toggleMenuButtonState(0, true);
    }, 1800);
  }
}

menuBtns.forEach((btn) => btn.addEventListener("click", startOrReset));


// ---------- BUTTONS, ANIMATION, & IMAGE DISPLAY ----------


//* ----- IMAGE FUNCTIONS -----

//* Gesture image display function.
const gestureDisplay = document.querySelectorAll(".gesture-display");

function imgDisplay(player1, player2) {
  [p1GestureImg, p2GestureImg] = [player1, player2];
  [p1GestureDisplay, p2GestureDisplay] = [gestureDisplay[0], gestureDisplay[1]];

  setTimeout(() => {
    p1GestureDisplay.setAttribute("src", `gestures/${p1GestureImg}.png`);
    p2GestureDisplay.setAttribute("src", `gestures/${p2GestureImg}.png`);
  }, 845);
}

//* Gesture image animation function.
function animateElement() {
  const pContainer = document.querySelector(".player-container");
  const cContainer = document.querySelector(".computer-container");
  const containers = [pContainer, cContainer];
  containers.forEach(container => container.classList.add("gesture-animation"));
   setTimeout(() => {
    containers.forEach((container) =>
      container.classList.remove("gesture-animation")
    );
  }, 849);


  toggleGestureButtonState(false);
}

//* Gesture image reset function.
function gestureReset() {
  setTimeout(() => {
    [p1GestureDisplay.src, p2GestureDisplay.src] = [`gestures/Rock.png`, `gestures/Rock.png`];
  }, 1700);
}

//* ----- BUTTON FUNCTIONS -----

//* Buttons Animation.
function btnAnimation(btn) {
  btn.classList.add("btn-clicked");
  setTimeout(() => btn.classList.remove("btn-clicked"), 100);
}

//* Gesture Buttons on & off.
function toggleGestureButtonState(isEnabled) {
  gestureBtns.forEach((btn) => btn.classList.toggle("btn-disabled", !isEnabled));
}

//* Menu Buttons on & off.

function toggleMenuButtonState(index, isEnabled) {
  const classListMethod = isEnabled ? "remove" : "add";
  menuBtns[index].classList[classListMethod]("btn-disabled");
}

