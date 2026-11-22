// Game state variables
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let roundCount = 0;
let results = []; // Stores "Win", "Lose", or "Draw" for each round

//Validate player name and start the game
function startGame() {
    let name = document.getElementById("playerName").value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    gameStarted = true;
    document.getElementById("welcomeMsg").innerHTML = "Welcome, <strong>" + name + "</strong>!";
    document.getElementById("startTime").innerHTML = "Started on: " + Date();
}

//Randomly select Rock, Paper, or Scissors for the computer
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

//Play one round against the computer
function playRound(playerChoice) {
    // Check if game has started
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    const computerChoice = getComputerChoice();
    roundCount++;

    //Update images based on choices
    document.getElementById("playerImg").src = "../Png/" + playerChoice + ".png";
    document.getElementById("computerImg").src = "../Png/" + computerChoice + ".png";

    const resultEl = document.getElementById("result");
    let roundOutcome = "";

    // Determine winner using if...else
    if (playerChoice === computerChoice) {
        roundOutcome = "Draw";
        draws++;
        resultEl.innerHTML = "It's a Draw!";
        resultEl.style.color = "grey";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        roundOutcome = "Win";
        wins++;
        resultEl.innerHTML = "You Win this round!";
        resultEl.style.color = "green";
    } else {
        roundOutcome = "Lose";
        losses++;
        resultEl.innerHTML = "You Lose this round!";
        resultEl.style.color = "red";
    }

    //Store outcome and update scoreboard
    results.push(roundOutcome);
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Append new row to the history table
    const historyBody = document.getElementById("historyBody");
    historyBody.innerHTML +=
        "<tr>" +
            "<td>" + roundCount + "</td>" +
            "<td>" + playerChoice.toUpperCase() + "</td>" +
            "<td>" + computerChoice.toUpperCase() + "</td>" +
            "<td>" + roundOutcome + "</td>" +
        "</tr>";
}

//Calculate and display win percentage using a for loop and Math.round()
function showSummary() {
    if (results.length === 0) {
        alert("No rounds played yet.");
        return;
    }

    let winCount = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            winCount++;
        }
    }

    const winPercentage = Math.round((winCount / results.length) * 100);
    document.getElementById("summaryText").innerHTML =
        "You played " + results.length + " rounds and won " + winPercentage + "%.";
}

//Reset all scores, arrays, and table rows back to initial state
function resetGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    roundCount = 0;
    results = [];

    document.getElementById("wins").innerHTML = "0";
    document.getElementById("losses").innerHTML = "0";
    document.getElementById("draws").innerHTML = "0";
    document.getElementById("result").innerHTML = "";
    document.getElementById("summaryText").innerHTML = "";
    document.getElementById("historyBody").innerHTML = "";
}
