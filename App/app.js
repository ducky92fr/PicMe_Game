import  {arrayImages,arrayImages1,arrayImages2,arrayImages3,getRandomInt,trackBestPlayer} from './image.js'
import {btnStart,btnPause,btnDemo,btnBack,btnMenu,btnQuit,btnQuitInGame,timer,pageCover,pagePause,pageEndGame,
        name,namePlayer,labelInput,score,healthBar,board,topPlayer,audioFalse,audioTrue,audioClick,allButton,yourStage} from './base.js'
let currArrayImages
let imagePictureArea
let trackImageClicked
let winTurn = false
location.reload();
class Game {
  constructor(){
    this.scoreTrack = 0,
    this.health = 100,
    this.level = [0,3,4,5],
    this.currLevel = 1,
    this.scoreControl=[0,15,30,40],
    this.healthControl =[0,15,20,30],
    this.allArrayImage =[0,arrayImages1,arrayImages2,arrayImages3],
    this.nextRound,
    this.timerCountdown
  }

  readyPhase =()=> {
    audioClick.play()
    this.demoNStart()
    setTimeout(this.startGame,7000)
  }

  startGame =()=> {
    clearInterval(this.timerCountdown)
    this.addImages()
    this.nextRound = setInterval(this.afterEachTurn,1800)
  }

  pauseGame =()=>{
    audioClick.play()
    pagePause.classList.remove('hidden')
    clearInterval(this.nextRound);
  }

  backGame =()=>{
    audioClick.play()
    this.arrayImageUpdate();
    this.createGrid();
    this.updateNodeList();
    pagePause.classList.add('hidden')
    this.startGame();
  }

  checkEndGame=()=>{
    this.trackBestPlayer()
    this.topPlayer()
    clearInterval(this.nextRound)
    pageEndGame.classList.remove('hidden')
  } 

  demoGame =()=>{
    audioClick.play()
    btnPause.classList.add('hidden')
    this.demoNStart();
    setTimeout(()=> {clearInterval(this.timer)},7000)
    setTimeout(this.addImages,7000)
    setTimeout(()=> {setInterval(this.arrayImageUpdate,4000)},7000);
    setTimeout(()=> {setInterval(this.changeSourcePictureArea,4000)},7000)
    setTimeout(()=> {setInterval(this.addImages,4000)},7000)
  }

  demoNStart=()=>{
    this.arrayImageUpdate()
    this.createGrid()
    this.updateNodeList()
    name.value == '' ? namePlayer.textContent = 'UnK' : namePlayer.textContent = name.value.toString().charAt(0)
    setTimeout(()=>{ pageCover.className ='layout_hidden' ; timer.id = 'countdown' },5000)
    this.timerCountdown = setInterval(this.countdown,1000)
    btnDemo.classList.add('hidden')
    btnStart.classList.add('hidden')
    name.classList.add('hidden')
    labelInput.classList.add('hidden')
    timer.id ='countdown_unhidden'
  }

  afterEachTurn =()=> {
    if(winTurn === false){
      if(this.health - this.healthControl[this.currLevel] <= 0){ 
        this.checkEndGame()
        } else{
          audioFalse.play()
          this.health -= this.healthControl[this.currLevel]}
      }
    this.levelControl()
    this.updateNodeList()
    this.updateUI()
    this.changeSourcePictureArea()
    winTurn = false
  }

  changeSourcePictureArea =()=> {
    for(let i = 0; i < imagePictureArea.length; i++){ imagePictureArea[i].src = currArrayImages[i] }
    this.addImages()
  }

  addImages =()=> {
    const markup =`
      <div class = 'images_container'>
      <img class = 'image' src=${currArrayImages[getRandomInt(currArrayImages.length-1)]} alt=''>
      </div>`
    const tapis = document.querySelector('#tapis')
    while (tapis.firstChild) { tapis.removeChild(tapis.firstChild);}
    tapis.insertAdjacentHTML('afterbegin',markup)
  }

  playerSelectImage =(event) => {
    trackImageClicked = event.target.src
    const srcImgGauche = document.querySelector('.image').src
    if(trackImageClicked === srcImgGauche) {
      (this.health + 10) > 100 ? this.health = 100 : this.health +=10
      this.scoreTrack += 10
      winTurn =true
      this.updateUI()
      event.target.src ='https://www.onlygfx.com/wp-content/uploads/2018/09/4-comic-check-mark-1.png'
      audioTrue.play()

      } else {audioFalse.play()}
    console.log(trackImageClicked)
    }

  createGrid =()=> {
    if(board.innerHTML != ''){board.innerHTML = ''}
    const numberImg = this.level[this.currLevel]*this.level[this.currLevel]
    board.style.setProperty('grid-template-columns', 'repeat(' + this.level[this.currLevel] + ', 1fr)')
    board.style.setProperty('grid-template-rows', 'repeat(' + this.level[this.currLevel] + ', 1fr)')
    for (let i = 0; i < numberImg;i++) {
      const markup =`<img class = 'grid_image cell images' 
      src=${currArrayImages[i]} alt=''>`
      board.insertAdjacentHTML('afterbegin',markup)
      }
    }

  updateUI =()=>{
    score.textContent = this.scoreTrack
    healthBar.value = this.health
    yourStage.textContent=this.currLevel
    }

  levelControl =()=>{
    if(this.scoreTrack <70){this.arrayImageUpdate()}
    if(this.scoreTrack >= 70){this.currLevel =2;this.arrayImageUpdate(); this.createGrid()}
    if(this.scoreTrack >=120){this.currLevel =3;this.arrayImageUpdate(); this.createGrid()}
    }

  arrayImageUpdate =()=>{
    const numberImg = this.level[this.currLevel]*this.level[this.currLevel]
    currArrayImages = this.allArrayImage[this.currLevel]
    for(let i =0 ;i<numberImg;i++){
      currArrayImages[i]= arrayImages[getRandomInt(arrayImages.length)]
      }
    }

  updateNodeList=()=>{
    imagePictureArea = document.querySelectorAll('.grid_image')
    for(let i =0; i < imagePictureArea.length; i++){imagePictureArea[i].onclick =this.playerSelectImage}
  }
  trackBestPlayer=()=>{
    const player ={
      name: `${name.value === '' ? 'Unknown': name.value}`,
      score: this.scoreTrack
    }
    
    let UpdatedArrayBestPlayer = JSON.parse(localStorage.getItem('trackBestPlayer'))
    if(UpdatedArrayBestPlayer == null) UpdatedArrayBestPlayer =[];
    UpdatedArrayBestPlayer.push(player)
    const newArrayBestPlayer = UpdatedArrayBestPlayer.sort((a,b)=>{
      if(a.score > b.score) return -1
      if(a.score < b.score) return 1
      if(a.score = b.score) return 0
    })
    localStorage.setItem('trackBestPlayer',JSON.stringify(newArrayBestPlayer))
  }

  topPlayer =()=>{
    const arrayTopPlayer =JSON.parse(localStorage.getItem('trackBestPlayer'));
    if(arrayTopPlayer != null){
    for(let i=0;i<topPlayer.length;i++) {
      topPlayer[i].textContent = `
      ${arrayTopPlayer[i].name.charAt(0)} ${arrayTopPlayer[i].score}
       `
      }}
  }

  countdown =()=> {
      if(timer.textContent >1){ timer.textContent = Number(timer.textContent) - 1}
      else {timer.textContent =  'READY'}
      }
}

const gameOfficial  = new Game()
function reloadPage(){ 
  audioClick.play()
  setTimeout(()=>{window.location.reload.bind(window.location)()},100)}
btnStart.onclick = gameOfficial.readyPhase
btnPause.onclick = gameOfficial.pauseGame
btnBack.onclick = gameOfficial.backGame
btnDemo.onclick = gameOfficial.demoGame
btnQuitInGame.onclick = reloadPage
btnMenu.onclick = reloadPage
btnQuit.onclick = reloadPage