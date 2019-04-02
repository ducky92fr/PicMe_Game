const arrayImages =[]

for(let i=1;i <= 27;i++){
  arrayImages[i-1] =`./images_bank/image${i}.png`
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
export {arrayImages,getRandomInt}
