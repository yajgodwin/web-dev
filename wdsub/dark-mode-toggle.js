let todDiv = document.getElementById("tod-div");
let botDiv = document.getElementById("bot-div");

let isLight = true;

function mngChange(event){
  
  //change background color to black if light mode, other wise to white
  
 if (isLight) document.body.style.backgroundColor = "black" ;
  else document.body.style.backgroundColor = "white";
  
 //change text color to white if light mode, else black 
   if (isLight)  document.body.style.color = "white";
  else  document.body.style.color = "black";
  
  
  //change text to dark mode on if light mode, else dark mode off
 if (isLight) botDiv.innerHTML = "<p> Dark mode on</p>" ;
  else botDiv.innerHTML = "<p> Dark mode off</p>";
  
  
  //flip the isLight switch
 isLight = !isLight;
}


