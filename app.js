//Level 1
import  {arrayImages,getRandomInt} from './image.js'
const butStart = document.querySelector('#btn_start')
const butDemo = document.querySelector('#btn_demo')
const imagePictureArea = document.querySelectorAll('.grid_image');
const timer = document.querySelector('#countdown');
const pageCover = document.querySelector(".Layout");
const name = document.querySelector("#inputName")
const labelInput = document.querySelector("#name")
const health = document.querySelector('#health');
const score = document.querySelector('#score');
let healthBar = document.getElementById("healthBar")
console.log(healthBar)
let trackImageClicked;

class Game {
  constructor(){
    this.scoreTrack = 0,
    this.health = 100,
    this.intervalTapis ,
    this.intervalPictureArea,
    this.interval,
    this.upScoreHealth,
    this.interValTimer
    
  }
  //Phase preparation when click start button
  readyPhase =() => {
    setTimeout(()=>{
      pageCover.className ="Layout_hidden"
      timer.id ="countdown"
    },5000)
    butDemo.classList.add("hidden");
    butStart.classList.add("hidden");
    name.classList.add("hidden");
    labelInput.classList.add("hidden")
    timer.id ="countdown_unhidden"
    for(let i =0; i < imagePictureArea.length; i++){imagePictureArea[i].onclick =this.playerSelectImage}
    this.interValTimer = setInterval(this.countdown,1000)
    this.startGame()
  }

  //Function start Game
  startGame = () => {
    this.intervalTapis = setInterval(this.addImages,7000)
    this.intervalPictureArea=setInterval(this.changeSourcePictureArea,7000)
    this.upScoreHealth = setInterval(this.afterNSec,7000)
  }

  afterNSec = () => {
    this.scoreTrack +=5
    this.health -= 10
    score.textContent = this.scoreTrack
    health.textContent =this.health
    healthBar.value = this.health;
    
  }

  changeSourcePictureArea=() => {
    for(let i = 0; i < imagePictureArea.length; i++){ 
      imagePictureArea[i].src =`${arrayImages[getRandomInt(arrayImages.length)]}`
    }
  }
  addImages =()=> {
    const markup =`
    <div class = "images_container">
      <img class = "image" src=${arrayImages[getRandomInt(arrayImages.length)]} alt="">
    </div>`
  
    const tapis = document.querySelector('#tapis')
    while (tapis.firstChild) {
      tapis.removeChild(tapis.firstChild);
    }
    tapis.insertAdjacentHTML('afterbegin',markup)
  }

  playerSelectImage =(event) => {
      trackImageClicked = event.target.src
      const srcImgGauche = document.querySelector('.image').src
      if(trackImageClicked === srcImgGauche) {
        this.health += 20;
        this.scoreTrack += 10;
        score.textContent = this.scoreTrack;
        health.textContent = this.health;
      event.target.src ="./images_bank/X.png"
      }

    };

 countdown = () => {
      if(timer.textContent >1){
      timer.textContent = Number(timer.textContent) - 1}
      else {timer.textContent =  "READY"}}
  }






const gameOfficial  = new Game()
butStart.onclick = gameOfficial.readyPhase;

