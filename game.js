let userClickedPattern = [];

let gamePattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];


                    //handler function.
$(".btn").on("click", (event)=>{

    //get the id of the button clicked
    var userChosenColour = $(event.target).attr('id');
    
    //play sound
    playSound(userChosenColour);

    // add animate whene the user click on the button
    animatePress(userChosenColour);

    userClickedPattern.push(userChosenColour);
    //console.log("userClickedPattern : "+userClickedPattern);

    //console.log(userClickedPattern);

    //passing in the index of the last answer in the user's sequence
    checkAnswer(userClickedPattern.length-1);


} )

//start level
var level = 0; 
var started = true;

$(document).on("keypress", () => {
    //9fl 3liha mra jay amtdkholch il presit ay key
    //c'est just pour la 1er fois
    if (started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = false;
      }
})


function checkAnswer(currentLevel){

    console.log("-gamePattern : "+gamePattern);
    console.log("-userClickedPattern : "+userClickedPattern);
    
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        
        console.log("success");
        // check that they have finished their sequence
        if(userClickedPattern.length === gamePattern.length){

            setTimeout(()=>{
                nextSequence();
            },1000);

        }

    }else{
        console.log("wrong");
        
        startOver();

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200)

        $("#level-title").text("Game Over, Press Any Key to Restart");

    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = true;
    
}

function nextSequence(){
    
    userClickedPattern = [];

    var randomNbr = Math.floor(Math.random()*4) //0-3
    var randomChosenColour = buttonColours[randomNbr];

    //add randomChosenColour to gamePattern
    gamePattern.push(randomChosenColour);
    //console.log("gamePattern : "+gamePattern);


    //increase the level every keypress
    level++;
    $("#level-title").text("Level "+level);

    //animate a flash to the button selected  
    $(".btn#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    //play sound
    playSound(randomChosenColour);
    
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    console.log("Audio"+audio);
}

function animatePress(currentColour){
    //added
    $("#"+currentColour).addClass("pressed")
    
    //remove
    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed");
    },100);

}