//Level 1
import  {arrayImages,getRandomInt} from './image.js'
const score = document.querySelector('#score');
const health = document.querySelector('#health');
console.log(score)
console.log(health)
const butStart = document.querySelector('#btn_start')

class Game {
  constructor(){
    this.scoreTrack = 0,
    this.health = 100,
    this.intervalImage ,
    this.interval,
    this.upScoreHealth
  }
  startGame = () => {
    // this.addImages();
    this.intervalImage = setInterval(this.addImages,2000)
    this.upScoreHealth = setInterval(this.after3Sec,4000)
  }

  after3Sec = () => {
    this.scoreTrack +=5
    this.health -= 10
    score.textContent = this.scoreTrack
    health.textContent =this.health
    console.log(this.scoreTrack)
  }

  addImages(){
    const markupTapis =`
    <div class = "images_container">
      <img class = "image" src=${arrayImages[getRandomInt(arrayImages.length)]} alt="">
    </div>`
    const markupPictureArea =`
    <div class="cell"> <img class ="image" src=${arrayImages[getRandomInt(arrayImages.length)]} alt=""></div>
    <div class="cell"><img class ="image" src=${arrayImages[getRandomInt(arrayImages.length)]} alt=""></div>
    <div class="cell"><img class ="image" src=${arrayImages[getRandomInt(arrayImages.length)]} alt=""></div>
    <div class="cell"><img class ="image" src=${arrayImages[getRandomInt(arrayImages.length)]} alt=""></div>
    <div class="cell"><img class ="image" src=${arrayImages[getRandomInt(arrayImages.length)]} alt=""></div>
    <div class="cell"><img class ="image" src=${arrayImages[getRandomInt(arrayImages.length)]} alt=""></div>
    <div class="cell"><img class ="image" src=${arrayImages[getRandomInt(arrayImages.length)]} alt=""></div>
    <div class="cell"><img class ="image" src=${arrayImages[getRandomInt(arrayImages.length)]} alt=""></div>
    <div class="cell"><img class ="image" src=${arrayImages[getRandomInt(arrayImages.length)]} alt=""></div>
    <div class="cell"><img class ="image" src=${arrayImages[getRandomInt(arrayImages.length)]} alt=""></div>
    <div class="cell"><img class ="image" src=${arrayImages[getRandomInt(arrayImages.length)]} alt=""></div>
    <div class="cell"><img class ="image" src=${arrayImages[getRandomInt(arrayImages.length)]}alt=""></div>
    <div class="cell"><img class ="image" src=${arrayImages[getRandomInt(arrayImages.length)]} alt=""></div>
    <div class="cell"><img class ="image" src=${arrayImages[getRandomInt(arrayImages.length)]} alt=""></div>
    <div class="cell"><img class ="image" src=${arrayImages[getRandomInt(arrayImages.length)]} alt=""></div>
    `

    const tapis = document.querySelector('#tapis')
    while (tapis.firstChild) {
      tapis.removeChild(tapis.firstChild);
  }
    tapis.insertAdjacentHTML('afterbegin',markuptapis)
  }

}




const gameOfficial  = new Game()
// butStart.onclick = gameOfficial.startGame;

function changeSource(){
const test = document.querySelector('.grid_image');
test.src = `${arrayImages[getRandomInt(arrayImages.length)]}`
}
butStart.onclick = changeSource;