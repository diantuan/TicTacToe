let board = document.getElementById("board");

let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

let rowHistory = [];
let columnHistory = [];
let idHistory = [];
let contentHistory = [];

let removedRows = [];
let removedColumns = [];
let removedIds = [];
let removedContent = [];


let playerWin = false;
let stopGame = false;

let playerTurn1 = true;

const prev = document.getElementById("prev");
const next = document.getElementById("next");


function createBoard(){
    for(let i=0; i<9;i++){
        const boardItem = document.createElement("div");
        boardItem.classList.add("tictactoeBox")
        boardItem.id = `box-${i}`;
        board.appendChild(boardItem);
       
        boardItem.addEventListener("click", ()=>{
            if(!stopGame){
            addMove(boardItem.id, i)
            }
        })
    }

}

function addMove(element, boxNumber){
    let boarditem = document.getElementById(`${element}`);
    if(playerTurn1 && !boarditem.textContent){
        boarditem.textContent = "X";
        playerTurn1 = false;
    }
    else if(!boarditem.textContent){
        boarditem.textContent = "O";
        playerTurn1 = true;
    }
    
    
    updateBoard(boarditem, boxNumber)
}

function updateBoard(element, boxNumber){
    gameBoard[Math.floor(boxNumber/3)][boxNumber%3] = element.textContent;

    rowHistory.push(Math.floor(boxNumber/3));
    columnHistory.push(boxNumber%3);
    idHistory.push(element.id);

    contentHistory.push(element.textContent);

    removedIds = [];
    removedColumns = [];
    removedRows = [];
    removedContent = [];
    
    
    if(idHistory.length > 0){
        prev.classList.remove("fade");
    }
    next.classList.add("fade");




    winGame();
    console.log(playerWin)
    if(playerWin){
        displayWin(element.textContent);
        stopGame = true;

    }


}

createBoard();






prev.addEventListener("click", ()=>{
   
    if(idHistory.length > 0){
        let rowNum = rowHistory.pop();
        removedRows.push(rowNum);
        let columnNum = columnHistory.pop();
        removedColumns.push(columnNum);
        let textValue = contentHistory.pop();
        removedContent.push(textValue);
    
        gameBoard[rowNum][columnNum] = "";
        

        let boxId = idHistory.pop();
        document.getElementById(`${boxId}`).textContent="";
        removedIds.push(boxId);
        
        playerTurn1 = !playerTurn1;
        console.log(gameBoard)

        if(idHistory.length < 1){
            prev.classList.add("fade")
        }

        next.classList.remove("fade");

        
    }
   
})

next.addEventListener("click", ()=>{
    if(removedIds.length > 0){
        let rowNum = removedRows.pop();
        rowHistory.push(rowNum);
        let columnNum = removedColumns.pop();
        columnHistory.push(columnNum);
        let textValue = removedContent.pop();
        contentHistory.push(textValue);
        
        gameBoard[rowNum][columnNum] = textValue;
        let boxId = removedIds.pop();
        document.getElementById(`${boxId}`).textContent = textValue;
        idHistory.push(boxId);
        playerTurn1 = !playerTurn1;
        console.log(gameBoard)

        if(removedIds.length < 1){
            next.classList.add("fade");
        }

        prev.classList.remove("fade")
    }
    
    
})

const winGame = ()=>{
    if(!stopGame){
        for(let i=0; i<gameBoard.length; i++){
        if(gameBoard[i][0] !=="" && gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][0] === gameBoard[i][2] && gameBoard[i][1]===gameBoard[i][2]){
            playerWin = true;
            
        }
        }

        for(let i = 0; i<3; i++){
            if(gameBoard[0][i] !== "" && gameBoard[0][i] === gameBoard[1][i] && gameBoard[0][i] === gameBoard[2][i] && gameBoard[1][i] === gameBoard[2][i]){
                playerWin = true;
            }
        }

        if(gameBoard[0][2] !== "" && gameBoard[0][2] === gameBoard[1][1] && gameBoard[0][2] === gameBoard[2][0] && gameBoard[1][1] === gameBoard[2][0]){
            playerWin = true;
        }
        if(gameBoard[0][0] !== "" && gameBoard[0][0] === gameBoard[1][1] && gameBoard[0][0] === gameBoard[2][2] && gameBoard[1][1] === gameBoard[2][2]){
            playerWin = true;
        }
    }
    else{
        playerWin = false;
    }
    
}

const resetBtn = document.getElementById("reset");
const resetGame = ()=>{
    idHistory = [];
    rowHistory = [];
    columnHistory = [];
    contentHistory = [];
    removedIds=[] ;
    removedRows =[];
    removedColumns =[];
    removedContent =[];   
    stopGame = false;
    playerWin = false;

    for(let i=0; i<gameBoard.length; i++){
        for(let j=0; j<3; j++){
            gameBoard[i][j] = "";
        }
            
    }

    for(let i=0;i<9;i++){
        document.getElementById(`box-${i}`).textContent = "";
    }

    console.log(gameBoard);
    prev.classList.add("fade");
    next.classList.add("fade");
}
    


resetBtn.addEventListener("click", resetGame);



const dialog = document.getElementById("dialog");
const displayWin = (player)=>{
    
    dialog.innerHTML = `<div>Congrats! ${player} won!</div>
                        <button onclick="dialog.close()">Close</button> `
    dialog.showModal();

   
    
}

