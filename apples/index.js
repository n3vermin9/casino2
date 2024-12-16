const balance = document.querySelector('.balance');

const possibleWin = document.querySelector('.possible-win')

const modal = document.querySelector('.modal');
const blurredBg = document.querySelector('.blurred-bg');

const take = document.querySelector('.take');
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

let isStarted = false

let btnPosition = 80

let currentPos = 20

let coefficients = [1.2, 1.6, 2.1, 3.5, 6, 13]
let coefficientsStep = 0

gridItem.forEach(item => item.style.setProperty('--before-opacity', '.2'))

function resetGame() {
  currentPos = 20;
  btnPosition = 80;

  gridItem.forEach(item => item.innerHTML = '');
  take.style.display = 'none';
  btnApple.forEach(btn => btn.style.display = 'block');
  btnsApple.style.bottom = '0px'
  input.style.display = 'block';
  isStarted = false

  coefficientsStep = 0
  possibleWin.style.opacity = 0
  possibleWin.innerText = `0`
}

function handleModal(result) {
  modal.innerText = result
  modal.classList.add('is-active');
  blurredBg.classList.add('is-active');
  setTimeout(() => {
    modal.classList.remove('is-active');
    blurredBg.classList.remove('is-active');

    resetGame()
  }, 1000);
}


btnApple.forEach(btn => {
  btn.addEventListener('click', () => {
    if (currentPos >= 0 && input.value > 0) {
      if (currentPos == 0) {
        btnApple.forEach(btnHide => {
          btnHide.style.display = 'none';
          handleModal(`You won $${input.value * coefficients[coefficientsStep]}`)

          localStorage.setItem('balance', parseInt(balanceValue) + parseInt(input.value));
          localStorage.setItem('balance', Math.floor(input.value * coefficients[coefficientsStep] + parseInt(balanceValue) - parseInt(input.value)));
          balance.innerText = localStorage.getItem('balance')
        });
      }

      if (!isStarted) {
        balanceValue = localStorage.getItem('balance')
        localStorage.setItem('balance', parseInt(balanceValue) - parseInt(input.value));
        balance.innerText = localStorage.getItem('balance')
      }

      isStarted = true
      possibleWin.style.opacity = 1

      input.style.display = 'none'
      let chances = Math.floor(Math.random() * 100)
      console.log(chances);

      let pressedBtnId = parseInt(btn.classList[1].slice(3, 4));
      btnsApple.style.bottom = `${btnPosition}px`;
      btnPosition += 80;

      coefficientsStep++

      let classesToCheck = [`item${currentPos}`, `item${currentPos + 1}`, `item${currentPos + 2}`, `item${currentPos + 3}`];
      currentPos -= 4;


      gridItem.forEach(item => {
        if (classesToCheck.some(className => item.classList.contains(className))) {
          // win
          if (chances < 80) { // <- int - percent to win
            let newApplePng = document.createElement('img');
            newApplePng.src = '/png/apple.png';
  
            if (item.classList.contains(classesToCheck[pressedBtnId])) {
              item.appendChild(newApplePng);
            }

            possibleWin.innerText = Math.floor(input.value * coefficients[coefficientsStep - 1])

            if (currentPos < 20) {
              take.style.display = 'block'
            }
          } else {
            // lose
            let newBadApplePng = document.createElement('img');
            newBadApplePng.src = '/png/bitten-apple.png';
  
            if (item.classList.contains(classesToCheck[pressedBtnId])) {
              item.appendChild(newBadApplePng);
              handleModal('You lost')
          }
        }
      }});
    }
  });
});

input.addEventListener("input", function() {
  this.value = this.value.replace(/[^0-9]/g, '');

  if (this.value.length > 0 && this.value[0] === '0') {
      this.value = this.value.substring(1);
  }
  if (this.value > parseInt(balance.innerText)) {
      this.value = balance.innerText;
  }
});



take.addEventListener('click', () => {
  handleModal(`You won $${Math.floor(input.value * coefficients[coefficientsStep - 1])}`)

  localStorage.setItem('balance', Math.floor(input.value * coefficients[coefficientsStep - 1] + parseInt(balanceValue) - parseInt(input.value)));
  balance.innerText = localStorage.getItem('balance')

})