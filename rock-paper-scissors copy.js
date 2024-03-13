let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  loses: 0,
  ties: 0,
};

updateScoreElement();
let isAutoPlaying=false;
let intervalId;
function autoplay(){
  if(!isAutoPlaying){
    intervalId=setInterval(function(){
      const playerMove=pickComputerMove();
      playGame(playerMove);
    },1500);
    isAutoPlaying=true;
  }else{
    clearInterval(intervalId);
    isAutoPlaying=false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click',()=>{
  playGame('rock');
});


document.querySelector('.js-paper-button').addEventListener('click',()=>{
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click',()=>{
  playGame('scissors');
});

document.querySelector('.js-auto-button').addEventListener('click',()=>{
  autoplay();
});

const resetFunction=()=>{
  score.wins=0;
  score.loses=0;
  score.ties=0;
  localStorage.removeItem('score');
  updateScoreElement();
  document.querySelector('.js-result').innerHTML=null;
  document.querySelector('.js-moves').innerHTML=null;
};

document.querySelector('.js-reset-button').addEventListener('click',()=>{
  resetFunction();
});

document.body.addEventListener('keydown',(event)=>{
  if(event.key==='r'){
    playGame('rock');
  }
  else if(event.key==='p'){
    playGame('paper');
  }
  else if(event.key==='s') playGame('scissors');
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  result = "";
  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose";
    } else if (computerMove === "paper") {
      result = "You win";
    } else {
      result = "Tie";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win";
    } else if (computerMove === "paper") {
      result = "Tie";
    } else {
      result = "You lose";
    }
  } else {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "You lose";
    } else {
      result = "You win";
    }
  }
  if (result === "You win") {
    score.wins++;
  } else if (result === "You lose") {
    score.loses++;
  } else {
    score.ties++;
  }
  localStorage.setItem("score", JSON.stringify(score));
  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(".js-moves").innerHTML = `You
<img src="${playerMove}-emoji.png" class="move-icon">
<img src="${computerMove}-emoji.png" class="move-icon">
Computer`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins:${score.wins},Losses:${score.loses},Ties:${score.ties}`;
}

function pickComputerMove() {
  let computerMove = "";
  const randomNumber = Math.random();
  let result = "";
  if (randomNumber >= 0 && randomNumber <= 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber > 1 / 3 && randomNumber <= 2 / 3) {
    computerMove = "paper";
  } else {
    computerMove = "scissors";
  }
  return computerMove;
}
