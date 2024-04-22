function CheckTriviaAnswer() {
    const answer = document.getElementById('trivia-answer').value.toLowerCase();
    const CorrectAnswer = "paris";
    let response;
    if (answer===CorrectAnswer) {
        response = "You guessed Paris. Correct!";
    } 
    else {
        response = "Incorrect. The right answer is Paris.";
    }
    document.getElementById('trivia-response').innerHTML = response;
}

function CheckNumber() {
    const num = document.getElementById('number-input').value;
    if (!/^\d{5}$/.test(num)) {
        document.getElementById('number-response').innerHTML = "Please enter a 5 digit number.";
        return;
    }
    const response = parseInt(num, 10) % 2 === 0 ? "even" : "odd";
    document.getElementById('number-response').innerHTML = "The number " + num + " is " + response + ".";
}

function PressEnter(event, func) {
    if (event.key === 'Enter') {
        func();
    }
}
