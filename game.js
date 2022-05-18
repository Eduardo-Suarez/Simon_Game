let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false
let level = 0;



$("html").keypress(function(event) {
    const start = event.key
    
    if(start === "a"){
        if(!started){
            $("h1").text("level " + level)
            nextSequence()
            started = true    
        }
        
    }
    else{
        alert("Tecla no valida")
    }

    
})

function nextSequence () {
    
    userClickedPattern = [];
    
    level++
    $("h1").text("level " + level)

    let randomNumber = Math.floor(Math.random() * 4)
    
    let randomChosenColour = buttonColours[randomNumber]

    gamePattern.push(randomChosenColour);

    //$('#green').fadeIn(100).fadeOut(100).fadeIn(100);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

//Esta funcion detecta que boton aprieta el usuario 
$(".btn").click(function () {

    let userChosenColour = $(this).attr("id")

    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    //console.log(userChosenColour)
    animatedPress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

function playSound (name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    //console.log(audio);
}

function animatedPress (currentColour) {
    $("#" + currentColour).addClass("pressed")

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    },100)
   
}

function checkAnswer (currentLevel) {
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        //console.log("success")

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function (){
                nextSequence();
            },1000)
        }
    }
    else{
        var audio = new Audio("/sounds/wrong.mp3")
        audio.play();
        $("body").addClass("game-over"); //Agregamos la clase game-over al body al perder
        lose();
        $("h1").text("Game Over, press 'a' to restart");
        startOver()//Funcion que reinicia el juego
        
        
        function lose (){
            
            setTimeout(function(){//Funcion que remueve la clase game-over del body despues de 200 milisegundos
                $("body").removeClass("game-over")
            },200)
        }
    }
}

function startOver () {

    level = 0
    gamePattern = []
    started = false
}


