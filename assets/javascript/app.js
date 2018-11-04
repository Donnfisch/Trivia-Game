var GameObj = {
    correctAnswers: 0,
    incorrectAnswers: 0,
    unAnswers: 0,
    time: 10,
    timer: 0,
    randomQ: null,
    totalQuestions: 0,
    triviaQA: [{
        Question: "What comes next? In the criminal justice system, sexually based offenses are considered especially _________.?",
        Answers: {
            a: "Terrible", 
            b: "Awful", 
            c: "Heinous", 
            d: "Felonious"
        },
        correctAnswer: "c"
    }, {
        Question: "Detective Elliot Stabler was in season 1 thru what season?",
        Answers: {
            a: "9", 
            b: "12", 
            c: "11", 
            d: "13"
        },
        correctAnswer: "b"
    }, {
        Question: "What is the name of Elliot's eldest son?",
        Answers: {
            a: "Dickie", 
            b: "Eli", 
            c: "Noah", 
            d: "Aaron"
        },
        correctAnswer: "a"
    }, {
        Question: "Which U.S. vice president made an appearance in a season 18 episode?",
        Answers: {
            a: "Mike Pence", 
            b: "Dick Cheney", 
            c: "Joe Biden", 
            d: "Al Gore"
        },
        correctAnswer: "c"
    }, {
        Question: "This ADA faked her own death and went into witness protection for some time, until testifying against her would-be murderer. Who was it?",
        Answers: {
            a: "Casey Novak", 
            b: "Alexandra Cabot", 
            c: "Sonya Paxton", 
            d: "Kim Greylek"
        },
        correctAnswer: "b"
    }, {
        Question: "Before New York, what state did Amanda Rollins live in?",
        Answers: {
            a: "Ohio", 
            b: "Tennesee", 
            c: "Alaska", 
            d: "Georgia"
        },
        correctAnswer: "d"
    }, {
        Question: "What does Captain Ed Tucker do in the NYPD?",
        Answers: {
            a: "Special Investigator", 
            b: "Homicide Detective", 
            c: "Internal Affairs officer", 
            d: "CSI tech"
        },
        correctAnswer: "c"
    }, {
        Question: "Detective Lake transferred into Manhattan SVU from where?",
        Answers: {
            a: "New Jersey", 
            b: "Staten Island", 
            c: "Brooklyn", 
            d: "Upstate New York"
        },
        correctAnswer: "c"
    }, {
        Question: "Olivia Benson went undercover as what to investigate alleged sexual abuse by prison guards at Sealview Correctional Facility?",
        Answers: {
            a: "Inmate", 
            b: "Guard", 
            c: "Delivery driver", 
            d: "Counsler"
        },
        correctAnswer: "a"
    }, {
        Question: "How many times has Munch been divorced?",
        Answers: {
            a: "1", 
            b: "4", 
            c: "3", 
            d: "5"
        },
        correctAnswer: "b"
    }, {
        Question: "At the end of season 16, Detective Amaro was planning to move where?",
        Answers: {
            a: "Washington D.C.", 
            b: "New Jersey", 
            c: "Chicago", 
            d: "California"
        },
        correctAnswer: "d"
    }, {
        Question: "How many years has S.V.U. been on television?",
        Answers: {
            a: "18", 
            b: "20", 
            c: "19", 
            d: "21"
        },
        correctAnswer: "b"
    }],

    reset: function () {
        GameObj.correctAnswers= 0;
        GameObj.incorrectAnswers= 0;
        GameObj.unAnswers= 0;
        GameObj.time = 10;
        GameObj.randomQ= null;
        GameObj.totalQuestions= 0;
        clearTimeout(timer);
        $("#startAgain").hide();
        $("#content, #buttons, #displayTimer, #displayQuesiton, #answer, #showResults, #choices").html("");
        GameObj.loadQuestion();
    },

    showResults: function () {
        clearTimeout(timer);
        $("#answer").html("<h1 class='QA'>Completed! Results Below<br />" 
                        + "Correct Answers: " + GameObj.correctAnswers
                        + "<br />Incorrect Answers: " + GameObj.incorrectAnswers
                        + "<br />Unanswers: " + GameObj.unAnswers
                        + "</h1>");
        $("#displayTimer").html("");
        $("#startAgain").show();
        $("#startAgain").on("click", function () {
            GameObj.reset();
        })
    },

    validateAnswer: function (result) {
        for (result in randomQ.Answers) {
            if (result == randomQ.correctAnswer) {
                GameObj.totalQuestions++;
                return randomQ.Answers[result];
            }
            else {
                result = randomQ.correctAnswer;
                GameObj.totalQuestions++;
                return randomQ.Answers[result];
            }
        }
    },

    checktotalQuestions: function () {
        if (GameObj.totalQuestions == 10) {
            GameObj.showResults();
            clearTimeout(timer);
        }
        else {
            clearTimeout(timer);
            GameObj.time = 10;
            setTimeout(GameObj.loadQuestion,3000);     
        } 
    },


    timeRemaining: function (secs) {  
        if (secs <= 5) {
            $("#displayTimer").html("<h2 class='timeRemainingRed'>Time Remaining: " + secs +"s</h2>");
        }
        else {
            $("#displayTimer").html("<h2 class='timeRemaining'>Time Remaining: "+ secs +"s</h2>");
        }
        secs--;
        timer = setTimeout('GameObj.timeRemaining(' + secs + ')', 1000);
        if (secs < 0) {
            clearTimeout(timer);
            var result = GameObj.validateAnswer(randomQ.correctAnswer);
            $("#answer").html("<h1 class='timeRemainingRed'>You took to long!"+"</h1>"
            + "<h1 class='QA'>Correct Answer: " + result + "<h1>" 
            + '<img class="startGameImg" src="assets/images/timeout.gif">'
            + "</h1>");
            GameObj.unAnswers++;
            $("#choices, #displayQuestion").html("");
            GameObj.checktotalQuestions();
        }
 
        $("#choices").off("click");
        
        $("#choices").on("click", ".choiceBtn", function () {
            if ($(this).val() != randomQ.correctAnswer) {
                var $pickedAnswer = GameObj.validateAnswer($(this).val());
                $("#answer").html("<h1 class='timeRemainingRed'>Incorrect!"+"</h1>"
                + "<h1 class='QA'>Correct Answer: " + $pickedAnswer + "</h1>" 
                + '<img class="startGameImg" src="assets/images/wrong.gif">'
                + "</h1>");
                $("#choices, #displayQuestion").html("");
                GameObj.incorrectAnswers++;
                GameObj.checktotalQuestions();
            }
            else if ($(this).val() == randomQ.correctAnswer) {
                var $pickedAnswer = GameObj.validateAnswer($(this).val());
                $("#answer").html("<h1 class='timeRemaining'>Correct!"+"</h1>"
                + '<img class="startGameImg" src="assets/images/c1.gif">');
                $("#choices, #displayQuestion").html("");
                GameObj.correctAnswers++;
                GameObj.checktotalQuestions();
            }  
        });
    },

    
    loadQuestion: function () {
        randomQ = GameObj.triviaQA[Math.floor(Math.random()*GameObj.triviaQA.length)];
        $("#displayQuestion").html("<h1 class='QA'>"+randomQ.Question+"</h1>");
        var i = 0;
        for (letter in randomQ.Answers) {
            var $choiceBtn = $("<button id='choiceBtn" + i + "'>");
            $choiceBtn.addClass("btn col-11 col-md-4 choiceBtn").attr("value", letter);
            $choiceBtn.html("<p>" + letter + ". " + randomQ.Answers[letter] + "</p>");
            $("#choices").append($choiceBtn,'<br />');  
            i++;
        }
        $("#answer").html("");
        GameObj.timeRemaining(GameObj.time);
    },

   
    startGame: function () {
        $("#content, #buttons, #displayTimer, #displayQuesiton, #answer, #showResults").html("");
        $("#startAgain").hide();
        $("#startGame").on("click", function () {
        $("#startContent, #buttons, #showResults").html("");
        GameObj.loadQuestion();          
        });
    }
}

GameObj.startGame();
