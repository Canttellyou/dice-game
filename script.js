"use strict";
//Selecting elements
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

//Starting conditions
let scores, currentScore, activePlayer, playing;
const init = function () {
  playing = true;
  scores = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  ///Setting the active player back to player 0
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  ///Removing the dark background from winner
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  document.getElementById("current--0").textContent = 0;
  document.getElementById("current--1").textContent = 0;
  diceEl.classList.add("hidden");
};
init();
///For switching player
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
let roll = function () {
  if (playing) {
    ///1.Generating a random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;
    ///2.Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    ///Checked for rolled 1:true
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      ///switch to next player
      switchPlayer();
    }
  }
};
//Rolling dice functionality
btnRoll.addEventListener("click", roll);
btnHold.addEventListener("click", function () {
  if (playing) {
    ////1.Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    ///Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      playing = false;
      ///Finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});
btnNew.addEventListener("click", init);
