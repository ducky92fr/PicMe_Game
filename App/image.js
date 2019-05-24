const arrayImages = [];
const arrayImages1 = [];
const arrayImages2 = [];
const arrayImages3 = [];
let trackBestPlayer = [
  { name: "Duc", score: 200 },
  { name: "Duc", score: 150 }
];

for (let i = 1; i <= 33; i++) {
  arrayImages[i - 1] = `./images_bank/image${i}.png`;
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
export {
  arrayImages,
  arrayImages1,
  arrayImages2,
  arrayImages3,
  getRandomInt,
  trackBestPlayer
};
