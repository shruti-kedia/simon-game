
var buttonColours = ["red", "blue", "green", "yellow"]; //array to store buttons

var gamePattern = []; //array to store pattern of game
var userClickedPattern = []; //array to store pattern of user

var started = false; //when game isnt started
var level = 0; //level=0 when start = false

$(document).keypress(function() { //in the beginning, when any button is prssed, starts the game and displays level
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() { //when any color button is clicked

  var userChosenColour = $(this).attr("id"); //the attribute id ie color is set to var userChosenColour
  userClickedPattern.push(userChosenColour); //the clicked color is pushed into userClickedPattern array

  playSound(userChosenColour); //sound for resp color is played
  animatePress(userChosenColour); //animation is occured

  checkAnswer(userClickedPattern.length-1); //calls check answer function
});

function checkAnswer(currentLevel) { //checks answer for current level

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { //checks the most recent value clicked by user ie the level on which they are and compares to last value of array
      if (userClickedPattern.length === gamePattern.length){ //checks if the overall length of user pattern is same as game pattern
        setTimeout(function () { //if yes, next pattern will be generated with a time out of 1000 ms delay
          nextSequence();
        }, 1000);
      }
    } else { //else the sound for wrong pattern is played
      playSound("wrong");
      $("body").addClass("game-over"); //gameover class is added
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () { //game over class is removed after a delay of 200 ms on clicking a button
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() { //used to generate the next random value in the game
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4); //produces 0,1,2,3
  var randomChosenColour = buttonColours[randomNumber]; //searches in array of colors
  gamePattern.push(randomChosenColour); //pushes the random color to the gamepattern array

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //animation to show the selected color
  playSound(randomChosenColour); //the sound for the given color is played
}

function animatePress(currentColor) { //function to animate the prssed button
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) { //plays sound for color selected or the game over sound
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() { //when wrong color is clicked, game restarts
  level = 0; //level setback to 0
  gamePattern = []; //game pattern array reset to empty
  started = false; //set started var to false
}
