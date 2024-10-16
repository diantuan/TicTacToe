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


let playerTurn1 = true;

function createBoard(){
    for(let i=0; i<9;i++){
        const boardItem = document.createElement("div");
        boardItem.classList.add("tictactoeBox")
        boardItem.id = `box-${i}`;
        board.appendChild(boardItem);
       
        boardItem.addEventListener("click", ()=>{
            addMove(boardItem.id, i)
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
    
    
    winGame();
    console.log(playerWin)
    if(playerWin){
        displayWin(element.textContent);
    }
}

createBoard();


const prev = document.getElementById("prev");
const next = document.getElementById("next");




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
    }
    
})

const winGame = ()=>{
    
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



const dialog = document.getElementById("dialog");
const displayWin = (player)=>{
    
    const dialogWin = document.createElement("div");
    dialogWin.textContent = `Congrats! ${player} wins!`;
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Close";
    dialog.appendChild(dialogWin);
    dialog.appendChild(closeBtn);
    dialog.showModal();

    closeBtn.addEventListener("click", ()=>{
        dialog.close();
    })
    
}

