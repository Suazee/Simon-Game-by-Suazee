var buttonColors = ["blue", "green", "red", "yellow"];
var pattern = [];
var gotPattern = false;
var gameLevel = 1;

var userTiles = [];
var userEntries = 0;

var gameoverTitle = "Game Over, Press the 'White' Button to Restart";



function keyPress() {
  pattern = [];
  userTiles = [];
  gameLevel = 1;
  document.querySelector("#start").addEventListener("click", startGame);
}


function startGame() {
  document.querySelector("#start").removeEventListener("click", startGame);
  nextSequence();
}


function nextSequence() {

  document.querySelector("#level-title").textContent = `Level ${gameLevel}`;

  var randomNumber = Math.floor(Math.random() * 3);
  var chosenButton = buttonColors[randomNumber];
  pattern.push(chosenButton);

  document.querySelector(`#${chosenButton}`).fadeOut().fadeIn();
  playSound(chosenButton);


  userEntries = 0;
  userTiles = [];
  user();

}

function user() {
  document.querySelector("#blue").addEventListener("click", userEvent);
  document.querySelector("#green").addEventListener("click", userEvent);
  document.querySelector("#red").addEventListener("click", userEvent);
  document.querySelector("#yellow").addEventListener("click", userEvent);
}

function userEvent() {
  userClick = event.path[0].id;
  playSound(userClick);
  buttonAnimation(userClick);
  userTiles.push(userClick);


  userEntries++;

  resultChecker();
}



function resultChecker() {

  if (userTiles[userEntries - 1] === pattern[userEntries - 1]) {
    if (userTiles.length === pattern.length) {
      for (var i = 0; i < document.querySelectorAll(".btn").length; i++) {
        document.querySelectorAll(".btn")[i].removeEventListener("click", userEvent);
      }
      gameLevel++;
      setTimeout(function() {nextSequence()}, 1000);
    } else {
      user();
    }
  } else {
    for (var i = 0; i < document.querySelectorAll(".btn").length; i++) {
      document.querySelectorAll(".btn")[i].removeEventListener("click", userEvent);
    }
    playSound("wrong");
  }

}


function playSound(color) {
  var soundList = ["sounds/blue.mp3", "sounds/green.mp3", "sounds/red.mp3", "sounds/yellow.mp3", "sounds/wrong.mp3"];

  if (color === "blue") {
    soundId = 0;
  } else if (color === "green") {
    soundId = 1;
  } else if (color === "red") {
    soundId = 2;
  } else if (color === "yellow") {
    soundId = 3;
  } else if (color === "wrong"){
    soundId = 4;
    buttonAnimation("wrong");
  }

  var sound = soundList[soundId];
  var audio = new Audio(sound);
  audio.play();
}



function buttonAnimation(color) {

  if (color === "wrong") {
    document.querySelector("body").classList.add("game-over");
    document.querySelector("#level-title").textContent = gameoverTitle;
    setTimeout(function() {
        document.querySelector("body").classList.remove("game-over");
    }, 500);
    keyPress();
  } else {
    document.querySelector(`#${color}`).classList.add("pressed");
    setTimeout(function() {
        document.querySelector(`#${color}`).classList.remove("pressed");
    }, 200);
  }

}



keyPress();
