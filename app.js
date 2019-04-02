//Level 1
const butStart = document.querySelector('#btn_start');
const butDemo = document.querySelector('#btn_demo');
let imagePictureArea;
const timer = document.querySelector('#countdown');
const pageCover = document.querySelector(".Layout");
const name = document.querySelector("#inputName");
const labelInput = document.querySelector("#name");
const health = document.querySelector('#health');

const score = document.querySelector('#score');
const healthBar = document.getElementById("healthBar");
const board = document.getElementById("board");
import  {arrayImages,getRandomInt} from './image.js'
let trackImageClicked;
class Game {
  constructor(){
    this.scoreTrack = 0,
    this.health = 100,
    this.level = [3,4,5,6,7],
    this.currLevel = 1,
    this.durationTurn =[8000,7000,6000,5000,5000]
    this.intervalTapis ,
    this.intervalPictureArea,
    this.interval,
    this.upScoreHealth,
    this.interValTimer
  }
  //Phase preparation when click start button
  readyPhase =()=> {
    this.createGrid()
    imagePictureArea = document.querySelectorAll('.grid_image');
    for(let i =0; i < imagePictureArea.length; i++){imagePictureArea[i].onclick =this.playerSelectImage}
    setTimeout(()=>{
      pageCover.className ="Layout_hidden"
      timer.id ="countdown" },5000)

    butDemo.classList.add("hidden");
    butStart.classList.add("hidden");
    name.classList.add("hidden");
    labelInput.classList.add("hidden")
    timer.id ="countdown_unhidden"
    this.interValTimer = setInterval(this.countdown,1000)
    setTimeout(this.startGame,7000)
  }

  //Function start Game
  startGame =()=> {
    this.addImages()
    this.intervalTapis = setInterval(this.addImages,this.durationTurn[this.currLevel-1])
    this.intervalPictureArea=setInterval(this.changeSourcePictureArea,this.durationTurn[this.currLevel-1])
    this.upScoreHealth = setInterval(this.afterNSec,this.durationTurn[this.currLevel-1])
  }

  afterNSec =()=> {
    switch(this.currLevel){
      case 1: 
        this.scoreTrack +=5;
        this.health -= 5;
        break;
      case 2: 
        this.scoreTrack +=10;
        this.health -= 10;
        break;
      case 3:
        this.scoreTrack += 15;
        this.health -= 15;
        break;
      case 4:
        this.scoreTrack +=20;
        this.health -=15;
        break;
      case 5:
        this.scoreTrack +=25;
        this.health -=20;
        break; }
    this.updateInfors();
  }
  changeSourcePictureArea =()=> {
    imagePictureArea.forEach(el => {
      el.src =`${arrayImages[getRandomInt(arrayImages.length)]}`})
    // for(let i = 0; i < imagePictureArea.length; i++){ 
    //   imagePictureArea[i].src =`${arrayImages[getRandomInt(arrayImages.length)]}`
    // }
  }
  
  addImages =()=> {
    const markup =`
      <div class = "images_container">
      <img class = "image" src=${arrayImages[getRandomInt(arrayImages.length)]} alt="">
      </div>`
    const tapis = document.querySelector('#tapis')
    while (tapis.firstChild) { tapis.removeChild(tapis.firstChild);}
    tapis.insertAdjacentHTML('afterbegin',markup)
  }

  playerSelectImage =(event) => {
    trackImageClicked = event.target.src
    const srcImgGauche = document.querySelector('.image').src
    if(trackImageClicked === srcImgGauche) {
      this.health += 10;
      this.scoreTrack += 10;
      this.updateInfors();
      event.target.src ="./images_bank/X.png"
      }
    }

  countdown =()=> {
    if(timer.textContent >1){ timer.textContent = Number(timer.textContent) - 1}
    else {timer.textContent =  "READY"}
    }

  createGrid =()=> {
    const numberImg = this.level[this.currLevel-1]*this.level[this.currLevel-1]
    board.style.setProperty('grid-template-columns', 'repeat(' + this.level[this.currLevel-1] + ', 1fr)')
    board.style.setProperty('grid-template-rows', 'repeat(' + this.level[this.currLevel-1] + ', 1fr)')
    for (let i = 0; i < numberImg;i++) {
      const markup =`<img class = "grid_image cell images" src=${arrayImages[getRandomInt(arrayImages.length)]} alt="">`
      board.insertAdjacentHTML("afterbegin",markup)
      }
    }
  updateInfors =()=>{
    score.textContent = this.scoreTrack;
    health.textContent = this.health;
    healthBar.value = this.health;
    }
  }






const gameOfficial  = new Game()
butStart.onclick = gameOfficial.readyPhase;
// window.onclick = gameOfficial.createGrid
