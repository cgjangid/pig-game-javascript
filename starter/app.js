/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

{
    let scores, activePlayer, roundScore, dice, gamePlaying;

    let init = () => {
        scores = [0, 0];
        activePlayer = 0;
        roundScore = 0;
        gamePlaying = true;
        document.querySelector(".dice").style.display = "none";
        document.getElementById("current-0").innerText = 0;
        document.getElementById("score-0").innerText = scores[0];
        document.getElementById("score-1").innerText = scores[1];
        document.querySelector(".player-0-panel").classList.remove("winner");
        document.querySelector(".player-1-panel").classList.remove("winner");
        document.querySelector("#name-0").innerText = "PLAYER 1";
        document.querySelector("#name-1").innerText = "PLAYER 2";
        document.querySelector(".player-0-panel").classList.remove("active");
        document.querySelector(".player-1-panel").classList.remove("active");
        document.querySelector(".player-0-panel").classList.add("active");
        document.querySelector("#current-0").innerText = 0;
        document.querySelector("#current-1").innerText = 0;
    }

    init();

    document.querySelector(".btn-roll").addEventListener("click", () => {

        if (gamePlaying) {
            //1. Roll the dice
            dice = parseInt(Math.random() * 6) + 1;
            document.querySelector(".dice").src = `dice-${dice}.png`;
            document.querySelector(".dice").style.display = "block";

            //2. Update the current player score if dice is not equal to 1
            if (dice !== 1) {
                roundScore += dice;
                document.getElementById("current-" + activePlayer).innerText = roundScore;

            } else {
                // Reset score to 0 and toggle the active player to 2
                nextPlayer();
            };
        };

    });

    // 3. If activePlayer click Hold, add current score to player score,
    // check if activePlayer won, move to next player
    document.querySelector(".btn-hold").addEventListener("click", () => {

        if (gamePlaying) {
            scores[activePlayer] += roundScore;
            document.getElementById("score-" + activePlayer).innerHTML = scores[activePlayer];
            if (scores[activePlayer] >= 20) {
                document.querySelector("#name-" + activePlayer).innerText = "Winner!";
                document.querySelector(".dice").style.display = "none";
                document.querySelector(`.player-${activePlayer}-panel`).classList.add("winner");
                document.querySelector(`.player-${activePlayer}-panel`).classList.remove("active");
                gamePlaying = false;
            } else {
                nextPlayer();
            }
        };

    });

    //Next Player
    nextPlayer = () => {
        roundScore = 0;
        document.getElementById("current-0").innerText = roundScore;
        document.getElementById("current-1").innerText = roundScore;
        document.querySelector(".dice").style.display = "none";
        document.querySelector(".player-0-panel").classList.toggle("active");
        document.querySelector(".player-1-panel").classList.toggle("active");
        activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
    }

    document.querySelector(".btn-new").addEventListener("click", init);
}