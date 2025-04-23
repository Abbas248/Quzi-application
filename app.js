var questions = [
    { question: "What does HTML stand for?", option1: "Hyperlinks and Text Markup Language", option2: "Hypertext Markup Language", option3: "Home Tool Markup Language", option4: "<h1>", correctOption: "Hypertext Markup Language" },
    { question: "Who is making the Web standards?", option1: "Google", option2: "The World Wide Web Consortium", option3: "Microsoft", option4: "<h1>", correctOption: "The World Wide Web Consortium" },
    { question: "Choose the correct HTML element for the largest heading:", option1: "<heading>", option2: "<h6>", option3: "<h1>", option4: "<h1>", correctOption: "<h1>" },
    { question: "What is the correct HTML element for inserting a line break?", option1: "<linebreak>", option2: "<br>", option3: "<break>", option4: "<h1>", correctOption: "<br>" },
    { question: "What is the correct HTML for adding a background color?", option1: '<body bg="yellow">', option2: "<background>yellow</background>", option3: '<body style="background-color:yellow;">', option4: "<h1>", correctOption: '<body style="background-color:yellow;">' },
    { question: "Choose the correct HTML element to define important text:", option1: "<strong>", option2: "<b>", option3: "<i>", option4: "<h1>", correctOption: "<strong>" },
    { question: "Choose the correct HTML element to define emphasized text:", option1: "<italic>", option2: "<i>", option3: "<em>", option4: "<h1>", correctOption: "<em>" },
    { question: "What is the correct HTML for creating a hyperlink?", option1: "<a>http://www.w3schools.com</a>", option2: '<a href="http://www.w3schools.com">W3Schools</a>', option3: '<a url="http://www.w3schools.com">W3Schools.com</a>', option4: "<h1>", correctOption: '<a href="http://www.w3schools.com">W3Schools</a>' }
];

var getOption1 = document.getElementById("opt1");
var getOption2 = document.getElementById("opt2");
var getOption3 = document.getElementById("opt3");
var timeDisplay = document.getElementById("time");
var getQues = document.getElementById("ques");
var getBtn = document.getElementById("btn");
var timeLeft = 59;
var index = 0;
var score = 0;
var timer;

function showQuestion() {
    var q = questions[index];
    getQues.innerText = q.question;
    getOption1.innerText = q.option1;
    getOption2.innerText = q.option2;
    getOption3.innerText = q.option3;
    getBtn.disabled = true;
    startTimer();
}
function enableNext() {
    getBtn.disabled = false;
}
function startTimer() {
    clearInterval(timer);
    timeLeft = 59;
    timeDisplay.innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.innerText = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            next();
        }
    }, 1000);
}
function next() {
    var getInputs = document.querySelectorAll("input[name='opt']");
    var selected = null;
    getInputs.forEach(input => {
        if (input.checked) {
            selected = document.getElementById(input.value).innerText;
        }
        input.checked = false;
    });
    if (selected === questions[index].correctOption) {
        score++;
    }
    index++;
    if (index >= questions.length) {
        clearInterval(timer);
        let percentage = Math.round((score / questions.length) * 100);
        let result = percentage >= 70 ? "Pass" : "Fail";
        Swal.fire({
            title: "Quiz Completed",
            html: `<b>Score:</b> ${score} / ${questions.length}<br><b>Percentage:</b> ${percentage}%<br><b>Result:</b> ${result}`,
            icon: result === "Pass" ? "success" : "error",
            confirmButtonText: "Restart"
        }).then(() => {
            index = 0;
            score = 0;
            showQuestion(); // Restart from question 1
        });}
        else {showQuestion();}
}
showQuestion();