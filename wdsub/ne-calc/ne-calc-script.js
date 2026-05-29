// to do: replace p1NumStrats & p2NumStrats  with query perameters

let queryParams = new URLSearchParams(window.location.search);
const P1_NUM_STRAT = queryParams.get("p1NumStrats");
const P2_NUM_STRAT = queryParams.get("p1NumStrats") ;
const PAYOFF_CONTENTS = "(<input type='number'>,<input type='number'>)";

buildMatrix();


function buildMatrix(){
  let matrix = document.getElementById("matrix");
  
  //loop through (P1_NUM_STRAT + 1) times. Each time make a row div.
  for (let i = 0; i < (P1_NUM_STRAT + 1); i++){
    //create new row div
    let newRow = document.createElement("div");
    newRow.classList.add("matrix-row");
    matrix.append(newRow);
    
   //loop through (P2_NUM_STRAT + 1) times. Each iteration make a cell. 
    for (let j = 0 ; j < (P2_NUM_STRAT + 1) ; j++){
      //create new cell
      let newCell = document.createElement("div");
      if( i == 0 && j == 0){
        newCell.classList.add("empty-cell");
      }else if(i == 0){
        newCell.classList.add("strat-cell");
        newCell.innerHTML = "t<sub>" + j + "</sub>";
      }else if(j == 0){
        newCell.classList.add("strat-cell");
        newCell.innerHTML = "s<sub>" + i + "</sub>";
      }else {
        newCell.classList.add("payoff-cell");     
        newCell.innerHTML =  PAYOFF_CONTENTS;
      }
      newRow.append(newCell);
      
    }
  }
   
}

function randomize(){
 let payoffArr = document.querySelectorAll(".payoff-cell input");
  const MIN =  -5 ;
  const MAX =  15 ;
 
  for(const elem of payoffArr){
    elem.value = Math.floor(Math.random() * (MAX + 1 - MIN) + MIN);
  }
}


function compute(){
 let p1PayArr = document.querySelectorAll(".payoff-cell input:first-child");
  let p2PayArr = document.querySelectorAll(".payoff-cell input:last-child"); 
  let payCellArr = document.querySelectorAll(".payoff-cell") ;
  
  for(const elem of payCellArr){
     if(elem.classList.contains("eliminated") == true) elem.classList.remove("eliminated");
     if(elem.classList.contains("ne") == true) elem.classList.add("ne");
  }
  
  //loop through every column, finding p1's highest payoff out of the rows
  for(let j = 0; j < P2_NUM_STRAT ; j++ ){
    let largest = -Infinity;
    
    //identify highest payoff in columns
    for (let i = 0; i < P1_NUM_STRAT; i++){
      if(Number(p1PayArr[P2_NUM_STRAT*i + j].value) > Number(largest)) largest = p1PayArr[P2_NUM_STRAT*i + j].value;
    }
    
    //eliminate any cells which aren't best response
      for (let i = 0; i < P1_NUM_STRAT; i++){
      if(Number(p1PayArr[P2_NUM_STRAT*i + j].value) != Number(largest)) payCellArr[P2_NUM_STRAT*i + j].classList.add("eliminated");
    
   }
  }
  
  // loop through every row, finding p2's highest payoff out of the colomns
  for(let i = 0; i < P1_NUM_STRAT ; i++ ){
    let largest = -Infinity;
    
    //identify highest payoff in columns
    for (let j = 0; j < P2_NUM_STRAT; j++){
      if(Number(p2PayArr[P2_NUM_STRAT*i + j].value) > Number(largest)) largest = p2PayArr[P2_NUM_STRAT*i + j].value;
    }
    
    //eliminate any cells which aren't best response
      for (let j = 0; j < P2_NUM_STRAT; j++){
      if(Number(p2PayArr[P2_NUM_STRAT*i + j].value) != Number(largest)) payCellArr[P2_NUM_STRAT*i + j].classList.add("eliminated");
    
   }
  }
 //give the ne class to any cells which are best responses for both players 
  for(const elem of payCellArr){
    if(elem.classList.contains("eliminated") == false) elem.classList.add("ne");
  }
  
  
}
