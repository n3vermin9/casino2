const balance = document.querySelector('.balance');

const modal = document.querySelector('.modal');
const blurredBg = document.querySelector('.blurred-bg');

const rotate = document.querySelector('.rotate');
const input = document.querySelector('.input');

const btnsApple = document.querySelector('.btns-apple');
const btnApple = document.querySelectorAll('.btn-apple')

const gridItem = document.querySelectorAll('.grid-item')


let balanceValue = localStorage.getItem('balance')

window.onload = function() {
    input.value = ''
  if (!balanceValue || balanceValue === null || balanceValue === NaN) {
    localStorage.setItem('balance', 0)
    balance.innerText = balanceValue
} else {
    balance.innerText = balanceValue
}
};

balance.innerText = balanceValue

let btnPosition = 80

let currentPos = 20


btnApple.forEach(btn => {
  btn.addEventListener('click', () => {
    if (currentPos >= 0) {
      if (currentPos == 0) {
        btnApple.forEach(btnHide => {
          btnHide.style.display = 'none';
        });
      }
      let chances = Math.floor(Math.random() * 100)
      console.log(chances);
      let pressedBtnId = parseInt(btn.classList[1].slice(3, 4));
      btnsApple.style.bottom = `${btnPosition}px`;
      btnPosition += 80;
      let classesToCheck = [`item${currentPos}`, `item${currentPos + 1}`, `item${currentPos + 2}`, `item${currentPos + 3}`];
      currentPos -= 4;
      gridItem.forEach(item => {
        if (classesToCheck.some(className => item.classList.contains(className))) {

          if (chances > 50) {
            let newApplePng = document.createElement('img');
            newApplePng.src = '/png/apple.png';
            newApplePng.alt = '2';
  
            if (item.classList.contains(classesToCheck[pressedBtnId])) {
              item.appendChild(newApplePng);
            }
          } else {
            let newBadApplePng = document.createElement('img');
            newBadApplePng.src = '/png/bitten-apple.png';
            newBadApplePng.alt = '2';
  
            if (item.classList.contains(classesToCheck[pressedBtnId])) {
              item.appendChild(newBadApplePng);
          }
        }
      }});
    }
  });
});