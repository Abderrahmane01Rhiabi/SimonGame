var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];


                    //handler function.
$(".btn").on("click", (event)=>{

    //get the id of the button clicked
    var userChosenColour = $(event.target).attr('id');
    
    //play sound
    playSound(userChosenColour);

    // add animate whene the user click on the button
    animatePress(userChosenColour);

    userClickedPattern.push(userChosenColour);
    
    //console.log(userClickedPattern);


} )

//start level
var level = 0; 

$(document).on("keypress", () => {
    nextSequence();

    $("h1").text("Level "+level);

})

function nextSequence(){
    var randomNbr = Math.floor(Math.random()*4) //0-3
    var randomChosenColour = buttonColours[randomNbr];

    //add randomChosenColour to gamePattern
    gamePattern.push(randomChosenColour);

    //increase the level every keypress
    level++;

    //animate a flash to the button selected  
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    //play sound
    playSound(randomChosenColour);
    
    


}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    //added
    $("#"+currentColour).addClass("pressed")
    
    //remove
    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed");
    },100);

}