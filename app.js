//Level 1
import  {arrayImages,arrayImages1,arrayImages2,arrayImages3,arrayImages4,arrayImages5,getRandomInt} from './image.js'
const btnStart = document.querySelector('#btn_start');
const btnPause = document.querySelector('#btn_pause')
const btnDemo = document.querySelector('#btn_demo');
// const btnRestart = document.querySelector('#btn_restart')
const btnMenu = document.querySelector('#btn_menu')
const btnQuit = document.querySelector('#btn_quit')
const timer = document.querySelector('#countdown');
const pageCover = document.querySelector('.Layout');
const pagePause =document.querySelector('#Layout2')
const pageEndGame =document.querySelector('#Layout1')
const name = document.querySelector('#inputName');
const labelInput = document.querySelector('#name');
const score = document.querySelector('#score');
const healthBar = document.querySelector('#healthBar');
const board = document.querySelector('#board');
const yourStage = document.querySelector('#your_stage')
let currArrayImages=[];
let imagePictureArea;
let trackImageClicked;
let winTurn = false;

class Game {
  constructor(){
    this.scoreTrack = 0,
    this.health = 100,
    this.level = [3,4,5,6,6],
    this.currLevel = 1,
    this.durationTurn =[6000,5000,3500,3000,2000]
    this.scoreControl=[5,10,15,20,25],
    this.healthControl =[5,10,15,15,20],
    this.allArrayImage =[arrayImages1,arrayImages2,arrayImages3,arrayImages4,arrayImages5],
    this.nextRound,
    this.timerCountdown
  }
  //Phase preparation when click start button
  readyPhase =()=> {
    this.arrayImageUpdate();
    this.createGrid();
    this.updateNodeList();

    setTimeout(()=>{ pageCover.className ="Layout_hidden" ; timer.id ="countdown" },5000);

    btnDemo.classList.add("hidden");
    btnStart.classList.add("hidden");
    name.classList.add("hidden");
    labelInput.classList.add("hidden");
    timer.id ="countdown_unhidden";
    this.timerCountdown = setInterval(this.countdown,1000);
    setTimeout(this.startGame,7000);
  }

  //Function start Game
  startGame =()=> {
    clearInterval(this.timerCountdown)
    this.addImages()
    this.nextRound = setInterval(this.afterEachTurn,this.durationTurn[this.currLevel-1])
  }
  pauseGame =()=>{
    pagePause.classList.remove("hidden")
  }

  afterEachTurn =()=> {
    this.levelControl();
    this.updateNodeList();
    // this.scoreTrack += this.scoreControl[this.currLevel-1];
    if(winTurn === false){
      if(this.health - this.healthControl[this.currLevel-1] <= 0){ 
        this.health = 0
        } else(this.health -= this.healthControl[this.currLevel-1])
      }
    const imgContainer = document.querySelector('.images_container');
    if(this.health <25){this.checkEndGame()};
    this.updateUI();
    this.addImages();
    this.changeSourcePictureArea();
    winTurn = false;
  }
  changeSourcePictureArea =()=> {
    for(let i = 0; i < imagePictureArea.length; i++){ imagePictureArea[i].src = currArrayImages[i] }
  }
  
  addImages =()=> {
    const markup =`
      <div class = "images_container">
      <img class = "image" src=${currArrayImages[getRandomInt(currArrayImages.length-1)]} alt="">
      </div>`
    const tapis = document.querySelector('#tapis')
    while (tapis.firstChild) { tapis.removeChild(tapis.firstChild);}
    tapis.insertAdjacentHTML('afterbegin',markup)
    const durationAnimation = (this.durationTurn[this.currLevel-1]/1000).toString()+"s"
    document.querySelector('.images_container').style.animationDuration =durationAnimation;
  }

  playerSelectImage =(event) => {
    trackImageClicked = event.target.src
    const srcImgGauche = document.querySelector('.image').src
    if(trackImageClicked === srcImgGauche) {
      (this.health + 10) > 100 ? this.health = 100 : this.health +=10;
      this.scoreTrack += 10;
      winTurn =true;
      this.updateUI();
      event.target.src ="./online-booking-checkpoint-choice-accept-512.png"
      }
    console.log(trackImageClicked)
    }

  countdown =()=> {
    if(timer.textContent >1){ timer.textContent = Number(timer.textContent) - 1}
    else {timer.textContent =  "READY"}
    }
  checkEndGame=()=>{
    setInterval(()=>{
      if(this.health === 0){
        clearInterval(this.nextRound);
        pageEndGame.classList.remove('hidden')
      }
    },50);
  }

  createGrid =()=> {
    if(board.innerHTML != ""){board.innerHTML = ""}
    const numberImg = this.level[this.currLevel-1]*this.level[this.currLevel-1]
    board.style.setProperty('grid-template-columns', 'repeat(' + this.level[this.currLevel-1] + ', 1fr)')
    board.style.setProperty('grid-template-rows', 'repeat(' + this.level[this.currLevel-1] + ', 1fr)')
    for (let i = 0; i < numberImg;i++) {
      const markup =`<img class = "grid_image cell images" 
      src=${currArrayImages[i]} alt="">`
      console.log(currArrayImages[i])
      board.insertAdjacentHTML("afterbegin",markup)
      }
    }

  updateUI =()=>{
    score.textContent = this.scoreTrack;
    healthBar.value = this.health;
    yourStage.textContent=this.currLevel;
    }

  levelControl =()=>{
    if(this.scoreTrack <50){this.arrayImageUpdate()}
    if(this.scoreTrack >= 50){this.currLevel =2;this.arrayImageUpdate(); this.createGrid()}
    if(this.scoreTrack >=100){this.currLevel =3;this.arrayImageUpdate();this.createGrid()}
    if(this.scoreTrack >=150){this.currLevel =4;this.arrayImageUpdate();this.createGrid()}
    if(this.scoreTrack >=200){this.currLevel =5;this.arrayImageUpdate();this.createGrid()}
    }

  arrayImageUpdate =()=>{
    const numberImg = this.level[this.currLevel-1]*this.level[this.currLevel-1]
    currArrayImages = this.allArrayImage[this.currLevel-1];
    for(let i =0 ;i<numberImg;i++){
      currArrayImages[i]= arrayImages[getRandomInt(arrayImages.length)]
      }
    }

  updateNodeList=()=>{
    imagePictureArea = document.querySelectorAll('.grid_image');
    for(let i =0; i < imagePictureArea.length; i++){imagePictureArea[i].onclick =this.playerSelectImage}
  }
}


const gameOfficial  = new Game()
btnStart.onclick = gameOfficial.readyPhase;
// btnRestart.onclick = gameOfficial.readyPhase;
btnPause.onclick = gameOfficial.pauseGame;
btnMenu.onclick = window.location.reload.bind(window.location);
btnQuit.onclick = window.location.reload.bind(window.location)
