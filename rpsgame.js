const endgameButton = document.getElementById('endgamebtn');
const rpsButtons = document.querySelectorAll('.rpsbutton');
const resultBoard = document.getElementById('resultcontainer')
const playerBoard = document.getElementById('playerscoreboard');
const gameBoard = document.getElementById('gamechoice');


// this serves as a datatbase to help keep track of the score
const totalScore = {computerScore : 0, playerScore : 0}



// * Adds an on click event listener to each RPS button and every time you click it, it calls the onClickRPS function with the RPS button that was last clicked *

// 1. loop through the buttons using a forEach loop
// 2. Add a 'click' event listener to each button
// 3. Call the onClickRPS function every time someone clicks
// 4. Make sure to pass the  value of the currently selected rps button as an argument

const playGame = () => {
    rpsButtons.forEach((button) => {
        button.addEventListener('click', () => onClickRPS(button.value))
    })
}
playGame();


const getcomputerChoice = () => {
    const rpsArray = ['Rock', 'Paper', 'Scissors']
    let randomChoice = Math.floor(Math.random() * rpsArray.length)
    return rpsArray[randomChoice]    
}

const getResults = (playerchoice, computerchoice) => {
    //create score variable
    let score;

    //situation if score is a tie
    if(playerchoice == computerchoice) {
        score = 0
    }
    //situation when playerchoice wins
    else if (playerchoice == 'Rock' && computerchoice == 'Scissors'){
        score = 1
    }
    else if (playerchoice == 'Paper' && computerchoice == 'Rock'){
        score = 1
    }
    else if (playerchoice == 'Scissors' && computerchoice == 'Paper'){
        score = 1
    }
    //situation where computer wins
    else {
        score = -1
    }

    return score
}

// ** showResult updates the DOM to `You Win!` or `You Lose!` or `It's a Draw!` based on the score. Also shows Player Choice vs. Computer Choice**
const showResults = (score, playerchoice, computerchoice) => {
    if(score == 0){
        resultBoard.innerText = 'TIE GAME!!!'
    }else if (score == 1){
        resultBoard.innerText = 'YOU WON!!!'
    }else{
        resultBoard.innerText = 'YOU LOSE!!!'
    }


    //update the DOM by showing it to the User
    gameBoard.innerText = `👨 chose ${playerchoice} vs 🤖 chose ${computerchoice}`

    playerBoard.innerText = `Your Score: ${totalScore['playerScore']}`
}


// ** Calculate who won and show it on the screen **
const onClickRPS = (playerchoice) => {
    // onclick of the player choice, the getcomputerchoice will run 
    const computerchoice = getcomputerChoice();

    // get the score based on what choices playerChoice and computerChoice made
    const score = getResults(playerchoice, computerchoice)

    // increment the score on the database
    totalScore['playerScore'] += score
    totalScore['computerScore'] += score

    // call the showResults function to update the DOM
    showResults(score, playerchoice, computerchoice)
}


endgameButton.addEventListener('click', (event) => {
    event.stopPropagation();
    clearBoard();
})

const clearBoard = () => {
    totalScore['playerScore'] = 0;
    totalScore['computerScore'] = 0;
    resultBoard.innerText = '';
    playerBoard.innerText = '';
    gameBoard.innerText = '';
}

