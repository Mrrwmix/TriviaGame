// Global variables

var correct = 0;
var incorrect = 0;
var unanswered = 0;
var questionNumber = 0;
var secondsLeft = 30;
var timer;
var loadingTimer;
var gifSeconds = 4;


// On click button to start trivia
$(document).ready(function () {
    $("#start").on("click", function () {
        $("#instructions").empty();
        changeQuestion();
    })


    // Changing questions function

    function changeQuestion() {
        questionNumber++;
        $("#question" + (questionNumber)).css("display", "block");
        $("#instructions").html("<p><h2 class='text-danger'>" + "Time remaining: " + secondsLeft + "</h2></p>");
        timer = setInterval(function () {
            $("#instructions").html("<p><h2 class='text-danger'>" + "Time remaining: " + secondsLeft + "</h2></p>");
            secondsLeft--;
            $("#instructions").html("<p><h2 class='text-danger'>" + "Time remaining: " + secondsLeft + "</h2></p>");
            if (secondsLeft == 0) {
                clearInterval(timer);
                secondsLeft = 30;
                unanswered++;
            }
        }, 1000);
    }


    // Checking answer or timeout function. Add classes bg-danger and bg-success classes to wrong/right answers. Clear them before loading the next question.

    // $("button").attr("value","wrong").toggleClass("btn-secondary btn-danger") switch secondary and danger to reset this
    $(".btn-secondary").on("click", function () {
        var gotThisCorrect;
        clearInterval(timer);
        secondsLeft = 30;
        if ($(this).attr("value") === "correct") {
            console.log("You clicked the right answer!");
            correct++;
            gotThisCorrect = true;
        }
        else {
            incorrect++;
            gotThisCorrect = false;
        }
        $(".btn-secondary").attr("disabled", true); // set this to false in the next question function
        $("button").each(function (index) {
            if ($(this).val() === "correct") {
                $(this).toggleClass("btn-secondary btn-success");
            }
            else {
                $(this).toggleClass("btn-secondary btn-danger")
            }
        });

        setTimeout(function () {
            $("button").each(function (index) {
                if ($(this).val() === "correct") {
                    $(this).toggleClass("btn-success btn-secondary");
                }
                else {
                    $(this).toggleClass("btn-danger btn-secondary")
                }

            })
            $(".btn-secondary").attr("disabled", false);
            $("#question" + (questionNumber)).css("display", "none");
            if (gotThisCorrect){
                $("#correctLoading").css("display", "block");
            }
            else {
                $("#wrongLoading").css("display", "block");
            }

        }, 1000)
        $(".loadingTimer").text("Next question in " + gifSeconds + "!");
        loadingTimer = setInterval(function () {
            gifSeconds--;
            $(".loadingTimer").text("Next question in " + gifSeconds + "!");
        }, 1000);

        setTimeout(function() {
            clearInterval(loadingTimer);
            gifSeconds = 4;
            $("#correctLoading").css("display", "none");
            $("#wrongLoading").css("display", "none");
            changeQuestion();
        }, 4000);

    })

});
