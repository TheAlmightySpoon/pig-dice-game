var scores, roundScore, activePlayer, gamePlaying;

gameStart();
// PASS EVENT
document.querySelector('.pass-button').addEventListener('click', pass);
// ROLL EVENT
document.querySelector(".roll-button").addEventListener("click", rollDice);
// NEW GAME EVENT
document.querySelector('.new-button').addEventListener('click', gameStart);

function gameStart(){
    scores = [0,0];
    activePlayer = 0; // if 0 = player1 and if 1 = player2 
    roundScore = 0;
    gamePlaying = true;
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1'; 
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};

function rollDice() {
    const dice = [...document.querySelectorAll(".die-list")];
    var score = 0, one = false;
    dice.forEach(die => {
        toggleClasses(die);
        var val = getRandomNumber(1, 6);
        console.log(val);
        score += val;
        if(val==1) {
            one = true; 
        }
        die.dataset.roll = val;
    });
    setTimeout(function(){
        if(one) {
            // single one - clear round score and move to next player
            nextPlayer();
        }else if(score !== 2){
            roundScore += score;
            document.querySelector('#current-' + activePlayer).textContent = roundScore; // score in this round
        }else{
            // snake eyes - clear score
            scores[activePlayer] = 0; //score in this round
            nextPlayer();
        } 
    }, 1400);
}

function nextPlayer(){
    // Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');   
};

function pass(){
    if (gamePlaying) {
        
        // Add the current score to the global score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if(scores[activePlayer] >= 100){
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER !'; 
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');    
            gamePlaying = false;
        }else{
            nextPlayer();
        }
    }
};
  
  function toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
  }
  
  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }