const balance = document.querySelector('.balance');
const gameScreen = document.querySelector('.game-screen');

let balanceValue = localStorage.getItem('balance')

window.onload = function() {
  if (!balanceValue || balanceValue === null || balanceValue === NaN) {
    localStorage.setItem('balance', 10)
  }
};

balance.innerText = balanceValue

let btnsArr = [
  [],
  [],
  [],
  [],
  [1],
]


function createBtn(num) {
  let appleBtn = document.createElement('button')
  appleBtn.classList.add('appleGuess')
  appleBtn.classList.add(`appleBtn${num}`)
  gameScreen.appendChild(appleBtn)
}

function createNoBtn() {
  let noBtn = document.createElement('div')
  noBtn.classList.add('noBtn')
  noBtn.classList.add(`noBtn`)
  gameScreen.appendChild(noBtn)
}

for (let i = 0; i < btnsArr.length; i++) {
  if (btnsArr[i].length == 0) {
    createNoBtn()
    createNoBtn()
    createNoBtn()
    createNoBtn()
  }
  else {
    for (let j = 0; j < 4; j++) {
      createBtn(j)
    }
  }
}

const appleGuess = document.querySelectorAll('.appleGuess')

const appleBtn0 = document.querySelector('.appleBtn0');
const appleBtn1 = document.querySelector('.appleBtn1');
const appleBtn2 = document.querySelector('.appleBtn2');
const appleBtn3 = document.querySelector('.appleBtn3');

let currentRow = 0

let appleImg = document.createElement('img')
appleImg.src = 'apples/png/apple.png'

gameScreen.addEventListener('click', (event) => {
  if (event.target.classList.contains('appleGuess')) {
    gameScreen.innerHTML = '';
    btnsArr.shift();
    btnsArr.push([]);
    renderButtons();
    gameScreen.children[currentRow].appendChild(appleImg)
    currentRow++
  }
});
function renderButtons() {
  for (let i = 0; i < btnsArr.length; i++) {
    if (btnsArr[i].length == 0) {
      createNoBtn();
      createNoBtn();
      createNoBtn();
      createNoBtn();
    } else {
      for (let j = 0; j < 4; j++) {
        createBtn(j);
      }
    }
  }
}