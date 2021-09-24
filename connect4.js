/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
const btn=document.querySelector("button");

const WIDTH= 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
// let count = 0;
// let redSet = [];
// let blueSet=[];
// currSet=[];
// function changePlayer(y) {
//   count ++
//   playedPiece(y);
//   if(!count % 2 === 0){
//     currPlayer = 1;
//     currSet=redSet;
    
//   }else{
//     currPlayer = 2;
//     currSet=blueSet;
   
//   }
 
function changePlayer(){
  currPlayer = currPlayer === 1 ? 2 : 1;
}
  
// }
btn.addEventListener("click", function(e){
  document.querySelectorAll(".p1").forEach(e=>e.classList.add("deleteGame"));
  document.querySelectorAll(".p2").forEach(e=>e.classList.add("deleteGame"));
  // count = 0;
  // redSet=[];
  // blueSet=[];
  currPlayer = 1;
  setTimeout(function(){
    document.querySelectorAll(".p1").forEach(e=>e.remove());
  document.querySelectorAll(".p2").forEach(e=>e.remove());
  },1000);
board=[];
makeBoard();

})

 


let board = []; // array of rows, each row is array of cells  (board[y][x])



function makeBoard() {
  for(let y = 0; y<HEIGHT; y++){
    board.push(Array.from({length : WIDTH}));
  }
}



function makeHtmlBoard() {

  const htmlBoard=document.getElementById("board");
  
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y},${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}



function findSpotForCol(x) {
  for(let y = HEIGHT -1; y>=0; y--){
    if(!board[y][x]){
      return y;
    }
  }
  return null;
  // let cells =[
  //   document.getElementById(`0,${x}`),
  //   document.getElementById(`1,${x}`),
  //   document.getElementById(`2,${x}`),
  //   document.getElementById(`3,${x}`),
  //   document.getElementById(`4,${x}`),
  //   document.getElementById(`5,${x}`)];
  //   for (let i=cells.length-1; i>=0; i--){
  //     if(!cells[i].hasChildNodes()){
  //         return cells[i];
  //     }
  //   }
    
}



function placeInTable(y, x) {
  let marker=document.createElement("div");
  // if (count % 2 === 0){
  marker.classList.add("piece");
  // }else {
    marker.classList.add(`p${currPlayer}`);
    const spot = document.getElementById(`${y},${x}`)
    spot.append(marker);
  }
 
  
  


\

function endGame(msg) {
  alert(msg);
}



function handleClick(evt) {
  

  let x = +evt.target.id;
  let y = findSpotForCol(x);
  
  
  if (y === null) {
    return;
  }
 

  board[y][x] = currPlayer;
  placeInTable(y,x);
  
  checkForTie();
 
 
  if (checkForWin()) {
    if(true){
    return endGame(`Player ${currPlayer} won!`);
  }
  }
  
  changePlayer();
  


  
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
 
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
  
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
       board[y][x] === currPlayer
    )
   
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      
        if (_win(horiz) ||_win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
        }
        
    
    }
  }
}

const checkForTie = () =>{
  const redPieces = document.querySelectorAll(".p1");
  const bluePieces = document.querySelectorAll(".p2");
  let redArr= Array.from(redPieces);
  let blueArr= Array.from(bluePieces);

  if(redArr.length === 21 && blueArr.length === 21){
    alert("Tie!");
  }
  
}




// let playedPiece =(y)=>{
//   let coord=[y.id];
//   if(count % 2 === 0){
//     return blueSet.push(coord)
    
//   }else{
//     return redSet.push(coord);
//   }
// }

makeBoard();
makeHtmlBoard();
