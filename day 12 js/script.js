// funtion to get a choice from the computer
function getComputerChoice() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }
  //funtion to get both parties' choices
  function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
      return "It's a tie!";
    } else if (
      (playerSelection === 'rock' && computerSelection === 'Scissors') 
      (playerSelection === 'paper' && computerSelection === 'Rock') 
      (playerSelection === 'scissors' && computerSelection === 'Paper')
    ) {
      return `You Win! ${playerSelection} beats ${computerSelection}.`;
    } else {
      return `You Lose! ${computerSelection} beats ${playerSelection}.`;
    }
  }
  //game function to get the 5 rounds
  function game() {
    let playerScore = 0;
    let computerScore = 0;
  
    for (let i = 0; i < 5; i++) {
      let playerChoice;
      do {
        playerChoice = prompt("Enter Rock, Paper, or Scissors:");
        playerChoice = playerChoice.toLowerCase();
  
        if (!['rock', 'paper', 'scissors'].includes(playerChoice)) {
          console.log("Enter a valid choice (Rock, Paper, or Scissors).");
        }
      } while (!['rock', 'paper', 'scissors'].includes(playerChoice));
  
      const computerChoice = getComputerChoice();
      const result = playRound(playerChoice, computerChoice);
      console.log(result);
  
      if (result.includes('Win')) {
        playerScore++;
      } else if (result.includes('Lose')) {
        computerScore++;
      }
    }
  // end of the 5rounds and final result
    if (playerScore > computerScore) {
      console.log("You Win!");
    } else if (playerScore < computerScore) {
      console.log("Better luck next time.");
    }
  }
  
  game();