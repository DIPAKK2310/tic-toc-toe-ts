let boxes = document.querySelectorAll(".box") as NodeListOf<HTMLButtonElement>
let resetBtn = document.querySelector("#reset-btn")! as HTMLButtonElement;
let newGameBtn = document.querySelector("#start-btn")! as HTMLButtonElement;
let msgContainer = document.querySelector(".msg-container") as HTMLElement;
let msg = document.querySelector("#msg") as HTMLElement;
const clickSound = new Audio("./sounds/click.mp3")
const drawSound = new Audio("./sounds/draw.mp3")
const winSound = new Audio("./sounds/win.mp3")


let turnO:boolean = true;//playerX,playerO

// 2d Arrays
const winPattern:number[][] = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
    
]

const resetGame = ():void => {
    turnO = true;
        
  // Stop and reset all sounds
  clickSound.pause();
  clickSound.currentTime = 0;

  drawSound.pause();
  drawSound.currentTime = 0;

  winSound.pause();
  winSound.currentTime = 0;
  enableBoxes();
  msgContainer.classList.add("hide")
} 


boxes.forEach((box) => {
box.addEventListener("click",()=>{
    clickSound.play();//Sound Play
    if (turnO) {
     box.innerText="O"
     box.style.color="blue"
     turnO = false;   
    }else{
        box.innerText="X"
        box.style.color="red"
        turnO = true;
    }

    checkWinner();
    box.disabled = true;
        // Draw logic
        let isDraw = true;
        boxes.forEach((box)=>{
            if (box.innerText === ""){
                isDraw = false;
            }
        })

        if (isDraw) {
            drawSound.play();//play draw sound
            msg.innerText = "😅 It's a draw!"
            msgContainer.classList.remove("hide");
            disableBoxes();
        }
})
})


const disableBoxes = ():void =>{
    for(let box of boxes){
        box.disabled = true;
    }
}
const enableBoxes = ():void =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}
const showWinner = (winner:string):void =>{
    winSound.play();//play win sound
msg.innerText = `🎉 Congratulation, Winner is ${winner}`;
msgContainer.classList.remove("hide")
msg.classList.add("winner");
setTimeout(() => msg.classList.remove("winner"), 1000);


disableBoxes();
}
const checkWinner = ():void => {
    for(let pattern of winPattern){
       
        let pos1Val = boxes[pattern[0]].innerText
        let pos2Val = boxes[pattern[1]].innerText
        let pos3Val = boxes[pattern[2]].innerText
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
          if (pos1Val == pos2Val && pos2Val == pos3Val) {
            showWinner(pos1Val);
          }   
        }
    }
}



newGameBtn.addEventListener("click",resetGame)
resetBtn.addEventListener("click",resetGame)
