// variables to store data
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;

// function to randomize numbers to assign to color
function nextSequence() {
  // H1 displays level when game starts, level goes up once with each nextSequence
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  // chosen color fades in and out inside of function
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}

// stores user clicks on buttons
$(".btn").on("click", function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer();
});

// function to play audio on random selection and on clicks
function playSound(name) {
  $("#" + name).ready(function () {
    var randomAudio = new Audio("sounds/" + name + ".mp3");
    randomAudio.play();
  });
}

// function to animate the pressed key to dark
function animatePress(currentColor) {
  $(".btn").on("click", function () {
    $(this).addClass("pressed");

    setTimeout(() => {
      $(this).removeClass("pressed");
    }, 100);
  });
}

// Keypress activates game only at beginning and not in the middle of the game
$(document).on("keypress", function () {
  if (gamePattern.length < 1) {
    nextSequence();
  }
});

function checkAnswer() {
  console.log(gamePattern);
  console.log(userClickedPattern);

  if (
    gamePattern[userClickedPattern.length - 1] ===
    userClickedPattern[userClickedPattern.length - 1]
  ) {
    console.log("success");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else if (
    gamePattern[userClickedPattern.length - 1] !==
    userClickedPattern[userClickedPattern.length - 1]
  ) {
    console.log("wrong");
    $(document).ready(function () {
      var wrongAudio = new Audio("sounds/wrong.mp3");
      wrongAudio.play();
    });
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, press any key to restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
