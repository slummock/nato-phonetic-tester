var phoneticAlphabet = [
    { letter: "A", phonetic: ["ALPHA", "ALFA"], correct: 0, incorrect: 0, badguesses: [] },
    { letter: "B", phonetic: ["BRAVO"], correct: 0, incorrect: 0, badguesses: [] },
    { letter: "C", phonetic: ["CHARLIE"], correct: 0, incorrect: 0, badguesses: [] },
    { letter: "D", phonetic: ["DELTA"], correct: 0, incorrect: 0, badguesses: [] },
    { letter: "E", phonetic: ["ECHO"], correct: 0, incorrect: 0, badguesses: [] },
    { letter: "F", phonetic: ["FOXTROT"], correct: 0, incorrect: 0, badguesses: [] },
    { letter: "G", phonetic: ["GOLF"], correct: 0, incorrect: 0, badguesses: [] },
    { letter: "H", phonetic: ["HOTEL"], correct: 0, incorrect: 0, badguesses: [] },
    { letter: "I", phonetic: ["INDIA"], correct: 0, incorrect: 0, badguesses: [] },
    { letter: "J", phonetic: ["JULIETT", "JULIET"], correct: 0, incorrect: 0, badguesses: [] },
    { letter: "K", phonetic: ["KILO"], correct: 0, incorrect: 0, badguesses: [] },
    { letter: "L", phonetic: ["LIMA"], correct: 0, incorrect: 0, badguesses: [] },
    { letter: "M", phonetic: ["MIKE"], correct: 0, incorrect: 0, badguesses: [] },
    { letter: "N", phonetic: ["NOVEMBER"], correct: 0, incorrect: 0, badguesses: [] },
    { letter: "O", phonetic: ["OSCAR"], correct: 0, incorrect: 0, badguesses: [] },
    { letter: "P", phonetic: ["PAPA"], correct: 0, incorrect: 0, badguesses: [] },
    { letter: "Q", phonetic: ["QUEBEC"], correct: 0, incorrect: 0, badguesses: [] },
    { letter: "R", phonetic: ["ROMEO"], correct: 0, incorrect: 0, badguesses: [] },
    { letter: "S", phonetic: ["SIERRA"], correct: 0, incorrect: 0, badguesses: [] },
    { letter: "T", phonetic: ["TANGO"], correct: 0, incorrect: 0, badguesses: [] },
    { letter: "U", phonetic: ["UNIFORM"], correct: 0, incorrect: 0, badguesses: [] },
    { letter: "V", phonetic: ["VICTOR"], correct: 0, incorrect: 0, badguesses: [] },
    { letter: "W", phonetic: ["WHISKEY"], correct: 0, incorrect: 0, badguesses: [] },
    { letter: "X", phonetic: ["XRAY", "X-RAY"], correct: 0, incorrect: 0, badguesses: [] },
    { letter: "Y", phonetic: ["YANKEE"], correct: 0, incorrect: 0, badguesses: [] },
    { letter: "Z", phonetic: ["ZULU"], correct: 0, incorrect: 0, badguesses: [] }
]

var currentSet;
var letterPrompt;
var submittedAnswer;
var lastAnswerResult;
var resultsContainer;
var resultsTable;

function main() {
    currentSet = shuffleArray(phoneticAlphabet.map(x => x));
    letterPrompt = document.getElementById("letterPrompt")
    submittedAnswer = document.getElementById("answer");
    submittedAnswer.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            submitAnswer();
        }
    });
    lastAnswerResult = document.getElementById("lastAnswerResult");
    resultsContainer = document.getElementById("resultsContainer");
    resultsTable = document.getElementById("resultsTable");
    nextPhonetic();
}

function nextPhonetic() {
    var currentPhonetic = currentSet[0];
    letterPrompt.innerHTML = currentPhonetic.letter;
    answer.value = "";
}

function submitAnswer() {
    var currentPhonetic = currentSet[0];
    var questionLetter = currentPhonetic.letter;
    var questionPhonetic = currentPhonetic.phonetic;
    var answer = submittedAnswer.value.toUpperCase();
    var possibleAnswers = possibleAnswersToString(questionPhonetic);

    if (questionPhonetic.includes(answer)) {
        currentPhonetic.correct++;
        lastAnswerResult.innerHTML = "Correct! " + questionLetter + " = " + possibleAnswers
        lastAnswerResult.style.color = "green"
        var item = currentSet.shift();
        currentSet.push(item);
    }
    else {
        currentPhonetic.incorrect++;
        currentPhonetic.badguesses.push(answer)
        lastAnswerResult.innerHTML = "Incorrect! " + questionLetter + " = " + possibleAnswers + ". <br> You answered: " + answer
        lastAnswerResult.style.color = "red"
        var item = currentSet.shift();
        var randomInsert = Math.floor(Math.random() * 22 + 3);
        currentSet.splice(randomInsert, 0, item);
    };
    nextPhonetic()
}

function shuffleArray(array) {
    var index = array.length;
    var temp;
    var randomIndex;

    // for(var i = array.length -1; i > 0; i--){
    //     var randomIndex =  Math.floor(Math.random() * index-1);
    //     var temp = array[i];
    //     array[i] = array[randomIndex];
    //     array[randomIndex] = temp;
    // }
    // While there remain elements to shuffle...
    while (0 !== index) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * index);
        index -= 1;

        // And swap it with the current element.
        temp = array[index];
        array[index] = array[randomIndex];
        array[randomIndex] = temp;
    }

    return array;
}

function possibleAnswersToString(array) {

    var possibleAnswers = array[0]

    for (var i = 1; i < array.length; i++) {

        possibleAnswers += " OR " + array[i]
    };
    return possibleAnswers;
}


function toggleFullResults() {
    if (resultsContainer.style.visibility == "visible") {
        resultsContainer.style.visibility = "hidden";
    }
    else {
        resultsContainer.style.visibility = "visible";
        populateResults();
    }
}

function populateResults() {
    var results = sortByLetterAsc(phoneticAlphabet)
    var results = sortByIncorrectDesc(phoneticAlphabet)
    var resultsHtml = "<table style=\"width:100%\">"
    resultsHtml += "<tr>"
    resultsHtml += "<th>"
    resultsHtml += "Letter"
    resultsHtml += "</th>"
    resultsHtml += "<th>"
    resultsHtml += "Phonetic"
    resultsHtml += "</th>"
    resultsHtml += "<th>"
    resultsHtml += "Incorrect Guesses"
    resultsHtml += "</th>"
    resultsHtml += "<th>"
    resultsHtml += "Correct Guesses"
    resultsHtml += "</th>"
    resultsHtml += "</tr>"
    results.forEach(element => {
        resultsHtml += "<tr>"
        resultsHtml += "<td>"
        resultsHtml += element.letter
        resultsHtml += "</td>"
        resultsHtml += "<td>"
        resultsHtml += element.phonetic[0]
        resultsHtml += "</td>"
        if (element.incorrect > 0) {
            resultsHtml += "<td style=\"color:red\">"
        }
        else {
            resultsHtml += "<td>"
        }
        resultsHtml += element.incorrect
        resultsHtml += "</td>"
        if (element.correct > 0) {
            resultsHtml += "<td style=\"color:green\">"
        }
        else {
            resultsHtml += "<td>"
        }
        resultsHtml += element.correct
        resultsHtml += "</td>"
        resultsHtml += "</tr>"
    });
    resultsHtml += "</table>"
    resultsTable.innerHTML = resultsHtml;
}


function sortByIncorrectAsc(results) {
    return results.sort((a, b) => (a.incorrect > b.incorrect) ? 1 : -1)
}

function sortByIncorrectDesc(results) {
    return results.sort((a, b) => (a.incorrect > b.incorrect) ? -1 : 1)
}


function sortByLetterAsc(results) {
    return results.sort((a, b) => (a.letter > b.letter) ? -1 : 1)
}

function sortByLetterDesc(results) {
    return results.sort((a, b) => (a.letter > b.letter) ? -1 : 1)
}

function sortByCorrectAsc(results) {
    return results.sort((a, b) => (a.correct > b.correct) ? 1 : -1)
}

function sortByCorrectDesc(results) {
    return results.sort((a, b) => (a.correct > b.correct) ? -1 : 1)
}
