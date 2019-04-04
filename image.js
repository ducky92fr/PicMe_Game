const arrayImages =[];
const arrayImages1 =[];
const arrayImages2 =[];
const arrayImages3 =[];
const arrayImages4 =[];
const arrayImages5 =[];
let trackBestPlayer =[{name:"Duc",score:200},{name:"Duc",score:150}];


// const arrayImages1 
// const arrayImages2
// const arrayImages3
// const arrayImages4
// const arrayImages5
// const images
const arrayImagesLeft =[]

for(let i=1;i <= 33;i++){
  arrayImages[i-1] =`./images_bank/image${i}.png`
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// for(let i =0 ;i<9;i++){ arrayImages1[i] = arrayImages[getRandomInt(arrayImages.length)]}
  

export {arrayImages,arrayImages1,arrayImages2,arrayImages3,arrayImages4,arrayImages5,getRandomInt,trackBestPlayer}

