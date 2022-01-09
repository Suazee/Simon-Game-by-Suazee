var buttonColors = ["blue", "green", "red", "yellow"];
var pattern = [];
var gotPattern = false;
var gameLevel = 1;

var userTiles = [];
var userEntries = 0;


function keyPress() {
  pattern = [];
  userTiles = [];
  gameLevel = 1;
  $("#start").click(startGame);
}


function startGame() {
  $("#start").off("click");
  nextSequence();
}


function nextSequence() {

  $("#level-title").text(`Level ${gameLevel}`);

  var randomNumber = Math.floor(Math.random() * 3);
  var chosenButton = buttonColors[randomNumber];
  pattern.push(chosenButton);

  $(`#${chosenButton}`).fadeOut().fadeIn();
  playSound(chosenButton);


  userEntries = 0;
  userTiles = [];
  user();

}



function user() {
  $(".btn").click(userEvent);
}

function userPlay() {
  $(".btn").on("click");
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
      $(".btn").off("click");
      gameLevel++;
      setTimeout(function() {nextSequence()}, 1000);
    } else {
      userPlay();
    }
  } else {
    $(".btn").off("click");
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
    $("body").addClass("game-over");
    $("#level-title").text(`Level ${gameLevel}! Game Over, Press the 'White' Button to Restart`);
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 500);
    keyPress();
  } else {
    $(`#${color}`).addClass("pressed");
    setTimeout(function() {
        $(`#${color}`).removeClass("pressed");
    }, 200);
  }

}



keyPress();
