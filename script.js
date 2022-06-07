'use strict';

//Selecting the score element

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const playerBG0 = document.querySelector('.player--0');
const playerBG1 = document.querySelector('.player--1');
let scores, currentScore, activePlayer, playing;

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;
  diceEl.classList.add('hidden');
  playerBG0.classList.add('player--active');
  playerBG1.classList.remove('player--active');
  playerBG0.classList.remove('player--winner');
  playerBG1.classList.remove('player--winner');
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerBG0.classList.toggle('player--active');
  playerBG1.classList.toggle('player--active');
};

//Rolling Dice Functionality
rollDice.addEventListener('click', function () {
  if (playing) {
    //generate a dice vcalue
    const dice = Math.floor(Math.random() * 6) + 1;
    console.log(dice);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      // currentScore0El.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

newGame.addEventListener('click', init);
