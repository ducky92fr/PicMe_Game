//Level 1
import  {arrayImages,getRandomInt} from './image.js'
const butStart = document.querySelector('#btn_start')
const imagePictureArea = document.querySelectorAll('.grid_image');
const timer = document.querySelector('#countdown');
const pageCover = document.querySelector(".Layout");
console.log(pageCover)
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
  readyPhase =() => {
    setTimeout(()=>{
      butStart.id ="btn_start_hidden"
      pageCover.className ="Layout_hidden"
      // this.startGame();
    },4000)
    for(let i =0; i < imagePictureArea.length; i++){imagePictureArea[i].onclick =this.playerSelectImage}
    this.interValTimer = setInterval(this.countdown,1000)
    
  }
  startGame = () => {
    this.intervalTapis = setInterval(this.addImages,7000)
    this.intervalPictureArea=setInterval(this.changeSourcePictureArea,7000)
    this.upScoreHealth = setInterval(this.afterNSec,7000)
  }

  afterNSec = () => {
    const health = document.querySelector('#health');
    const score = document.querySelector('#score');
    this.scoreTrack +=5
    this.health -= 10
    score.textContent = this.scoreTrack
    health.textContent =this.health
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
      console.log(trackImageClicked)
    };
 countdown = () => {
      if(timer.textContent >1){
      timer.textContent = Number(timer.textContent) - 1}
      else {timer.textContent = "READY"}}
  }






const gameOfficial  = new Game()
butStart.onclick = gameOfficial.readyPhase;



// console.dir(timer)