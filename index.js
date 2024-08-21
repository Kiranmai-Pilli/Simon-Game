// alert("It's working!");

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern=[];
var userClickedPattern = [];

var level =0;
var started = false;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
        
    }
    
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        // console.log(gamePattern);
        // console.log(userClickedPattern);
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("failure");
        // console.log(gamePattern);
        // console.log(userClickedPattern);
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }

}

$(".btn").on("click",function(event){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    //calling the checking answer function
    checkAnswer(userClickedPattern.length-1);

});

function nextSequence(){

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+level);

    var num = Math.trunc(Math.random()*4);
    // console.log(num);
    var randomChosenColor = buttonColors[num];
    gamePattern.push(randomChosenColor);

    var colorId='#'+randomChosenColor;
    $(colorId).fadeIn(100).fadeOut(100).fadeIn(100);
    // var audio = new Audio("sounds/"+randomChosenColor+".mp3");
    // audio.play();

    playSound(randomChosenColor);
    
    
}

function playSound(name){
    
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100);
}

function startOver(){
    level=0;
    started=false;
    gamePattern = [];
}


