let gameseq = [];
let userseq = [];
let btns = ["yellow","red","purple","green"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let startBtn = document.getElementById("startBtn");

// Desktop: start on keypress
document.addEventListener("keypress", function() {
  if (!started) {
    startGame();
  }
});

// Mobile: start on button click
startBtn.addEventListener("click", function() {
  if (!started) {
    startGame();
  }
});

function startGame() {
  console.log("Game Started");
  started = true;
  level = 0;
  gameseq = [];
  userseq = [];
  levelup();
}

function gameFlash(btn){
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 200);
}

function userFlash(btn){
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 200);
}

function levelup(){
  userseq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * btns.length);
  let randColor = btns[randIdx];
  let randbtn = document.querySelector(`.${randColor}`);
  gameseq.push(randColor);

  gameFlash(randbtn);
}

function checkAns(idx){
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length === gameseq.length) {
      setTimeout(levelup, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press Start to Play Again`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => document.body.style.backgroundColor = "white", 150);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userseq.push(userColor);
  checkAns(userseq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns){
  btn.addEventListener("click", btnPress);
}

function reset(){
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;
}
