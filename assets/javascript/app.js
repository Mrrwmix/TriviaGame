// Global variables

var correct = 0;
var incorrect = 0;
var questionNumber = 0;
var secondsLeft = 30;


// On click button to start trivia
$(document).ready(function () {
    $("#start").on("click", function(){
        $("#instructions").empty();
        questionNumber++;
        var timer = setInterval(function () {
            $("#instructions").html("<p><h2 class='text-danger'>" + "Time remaining: " + secondsLeft + "</h2></p>");
            secondsLeft--;
            $("#instructions").html("<p><h2 class='text-danger'>" + "Time remaining: " + secondsLeft + "</h2></p>");
            if (secondsLeft == 0){
                clearInterval(timer);
                incorrect++;
            }
        }, 1000);
        $("#question1").css("display", "block");
    
    })


    // On click button to restart game (without reloading the page)


    // Checking answer or timeout function. Add classes bg-danger and bg-success classes to wrong/right answers. Clear them before loading the next question.

    // $("button").attr("value","wrong").toggleClass("btn-secondary btn-danger") switch secondary and danger to reset this
    $(".btn-secondary").on("click", function(){
        var gotThisCorrect;
        if ($(this).attr("value") === "correct"){
            console.log("You clicked the right answer!");
            correct++;
            gotThisCorrect = true;
        }
        else {
            incorrect++;
            gotThisCorrect = false;
        }
        $("button").each(function(index){
            if ($(this).val() === "correct"){
                $(this).toggleClass("btn-secondary btn-success");
            }
            else {
                $(this).toggleClass("btn-secondary btn-danger")
            }
        })

    })

});
