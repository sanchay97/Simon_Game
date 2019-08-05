var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var keyPressed = false;
var calledGameManager = false;
var level = 0;


function PopUp(hideOrshow) {
  if (hideOrshow == 'hide') document.getElementById('ac-wrapper').style.display = "none";
  else document.getElementById('ac-wrapper').removeAttribute('style');
}

window.onload = function() {
  setTimeout(function() {
    PopUp('show');
  },0);
};

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
}

// var nextseq = nextSequence();
// $("#" + nextseq).click(function() {
//   $(this).fadeOut(250).fadeIn(250);
//   playSound(nextseq);
// });

function playSound(color) {
  var audio = new Audio(color + ".mp3");
  audio.play();
}

function animatePress(id) {
  var self = $(id);
  self.addClass("pressed");
  setTimeout(function() {
    self.removeClass("pressed");
  }, 300);
}

$(document).on("keydown", function() {
  if (!keyPressed) {
    $("#level-title").text("Level " + level);
    keyPressed = true;
  }
  if (!calledGameManager) {
    gameManager();
    calledGameManager = true;
  }
});

function gameManager() {
  if(level < 2) {
    playgamepattern(1000);
    takeUserInput();
  }
  else if (level >= 2 && level < 4){
    playgamepattern(500);
    takeUserInput();
  }
  else if (level >= 4 && level <= 6) {
    playgamepattern(300);
    takeUserInput();
  }
  else {
    $(".btn").off("click");
    gameFinished();
  }
}

function playgamepattern(speed) {
  nextSequence();
  $(".btn").off("click");
  gamePattern.forEach(function(color, index) {
    setTimeout(function() {
      $("#" + color).fadeOut(200).fadeIn(200);
      playSound(color);
      animatePress("#" + color);
    }, speed * (index + 1));
  });
}

function takeUserInput() {
  $(".btn").on("click", function() {
    var userChoosenColor = $(this).attr("id");
    $(this).fadeOut(200).fadeIn(200);
    userClickedPattern.push(userChoosenColor);
    var userPatternlength = userClickedPattern.length;
    playSound(userChoosenColor);
    animatePress("#" + userChoosenColor);
    if (gamePattern[userPatternlength - 1] == userClickedPattern[userPatternlength - 1]) {
      if (userPatternlength == gamePattern.length) {
        $(".chance").text("");
        nextLevelRestore();
      }
    } else {
      $(".btn").off("click");
      gameOverRestore();
    }
  });
}

function nextLevelRestore() {
  level++;
  $("#level-title").text("Level " + level);
  userClickedPattern = [];
  gameManager();
}

function gameOverRestore() {
  playSound("wrong");
  $("body").addClass("body-color");
  setTimeout(function() {
    $("body").removeClass("body-color");
  }, 300);
  $("#level-title").text("GameOver! Press any Key to Try Again.");
  keyPressed = false;
  calledGameManager = false;
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
}

function gameFinished() {
  $("body").addClass("winning-color");
  setTimeout(function() {
    $("body").removeClass("winning-color");
  }, 300);
  $("#level-title").text("Congrats! Game Finsihed. Press any Key to Play Again.");
  keyPressed = false;
  calledGameManager = false;
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
}
