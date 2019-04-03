//Level 1
import  {arrayImages,arrayImages1,arrayImages2,arrayImages3,arrayImages4,arrayImages5,getRandomInt} from './image.js'
const butStart = document.querySelector('#btn_start');
const butDemo = document.querySelector('#btn_demo');
const timer = document.querySelector('#countdown');
const pageCover = document.querySelector(".Layout");
const name = document.querySelector("#inputName");
const labelInput = document.querySelector("#name");
const health = document.querySelector('#health');
const score = document.querySelector('#score');
const healthBar = document.querySelector("#healthBar");
const board = document.querySelector("#board");
const btntest = document.querySelector('#btn_test');
let currArrayImages=[];
let imagePictureArea;
let trackImageClicked;

class Game {
  constructor(){
    this.scoreTrack = 0,
    this.health = 100,
    this.level = [3,4,5,6,6],
    this.currLevel = 1,
    this.durationTurn =[8000,7000,6000,5000,2000]
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

    setTimeout(()=>{ pageCover.className ="Layout_hidden" ; timer.id ="countdown" },5000)

    butDemo.classList.add("hidden");
    butStart.classList.add("hidden");
    name.classList.add("hidden");
    labelInput.classList.add("hidden")
    timer.id ="countdown_unhidden"
    this.timerCountdown = setInterval(this.countdown,1000)
    setTimeout(this.startGame,7000)
  }

  //Function start Game
  startGame =()=> {
    this.addImages()
    // this.nextRound = setInterval(this.afterEachTurn,this.durationTurn[this.currLevel-1])
  }

  afterEachTurn =()=> {
    this.levelControl();
    this.updateNodeList();
    this.scoreTrack += this.scoreControl[this.currLevel-1];
    if(this.health - this.healthControl[this.currLevel-1] <= 0){ this.health = 0} 
    else(this.health -= this.healthControl[this.currLevel-1])
    const imgContainer = document.querySelector('.images_container');
    imgContainer.style.animationDuration = this.durationTurn[this.currLevel-1].toString().replace('0','s');
    console.log(this.currLevel)
    console.dir(this.durationTurn[this.currLevel-1].toString().replace('000','s') )
    console.dir(imgContainer)
    this.updateUI();
    this.addImages();
    this.changeSourcePictureArea();
    console.log(this.currLevel)
  }
  changeSourcePictureArea =()=> {
    // imagePictureArea.forEach(el => {
    //   el.src =`${arrayImages[getRandomInt(arrayImages.length)]}`})
    for(let i = 0; i < imagePictureArea.length; i++){ 
      imagePictureArea[i].src = currArrayImages[i]
      }
  }
  
  addImages =()=> {
    console.log(currArrayImages)
    console.log(getRandomInt(currArrayImages.length-1))
    const markup =`
      <div class = "images_container">
      <img class = "image" src=${currArrayImages[getRandomInt(currArrayImages.length-1)]} alt="">
      </div>`
    const tapis = document.querySelector('#tapis')
    while (tapis.firstChild) { tapis.removeChild(tapis.firstChild);}
    tapis.insertAdjacentHTML('afterbegin',markup)
  }

  playerSelectImage =(event) => {
    trackImageClicked = event.target.src
    const srcImgGauche = document.querySelector('.image').src
    if(trackImageClicked === srcImgGauche) {
      (this.health + 10) > 100 ? this.health = 100 : this.health +=10;
      this.scoreTrack += 10;
      this.updateUI();
      event.target.src ="./online-booking-checkpoint-choice-accept-512.png"
      }
    console.log(trackImageClicked)
    }

  countdown =()=> {
    if(timer.textContent >1){ timer.textContent = Number(timer.textContent) - 1}
    else {timer.textContent =  "READY"}
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
    health.textContent = this.health;
    healthBar.value = this.health;
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
butStart.onclick = gameOfficial.readyPhase;
// window.onclick = gameOfficial.createGrid
btn_test.onclick = gameOfficial.afterEachTurn;