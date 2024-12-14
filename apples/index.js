const balance = document.querySelector('.balance');

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

let btnPosition = 80

let currentPos = 20

function resetGame() {
  currentPos = 20; // Reset current position
  btnPosition = 80; // Reset button position
  // Clear the grid items, you can use a loop here
  gridItem.forEach(item => item.innerHTML = '');
  take.style.display = 'none';
  btnApple.forEach(btn => btn.style.display = 'block'); // Show buttons again
  btnsApple.style.bottom = '0px'
  input.style.display = 'block'; // Show input
}

// Call this function when necessary, for instance, on losing a game


btnApple.forEach(btn => {
  btn.addEventListener('click', () => {
    if (currentPos >= 0) {

      if (currentPos == 0) {
        btnApple.forEach(btnHide => {
          btnHide.style.display = 'none';
        });
      }

      if (currentPos < 20) {
        take.style.display = 'block'
      }

      input.style.display = 'none'
      let chances = Math.floor(Math.random() * 100)
      // console.log(chances);
      let pressedBtnId = parseInt(btn.classList[1].slice(3, 4));
      btnsApple.style.bottom = `${btnPosition}px`;
      btnPosition += 80;
      let classesToCheck = [`item${currentPos}`, `item${currentPos + 1}`, `item${currentPos + 2}`, `item${currentPos + 3}`];
      currentPos -= 4;
      gridItem.forEach(item => {
        if (classesToCheck.some(className => item.classList.contains(className))) {
          // win
          if (chances > 50) {
            let newApplePng = document.createElement('img');
            newApplePng.src = '/png/apple.png';
            newApplePng.alt = '2';
  
            if (item.classList.contains(classesToCheck[pressedBtnId])) {
              item.appendChild(newApplePng);
            }
            // lose
          } else {
            let newBadApplePng = document.createElement('img');
            newBadApplePng.src = '/png/bitten-apple.png';
            newBadApplePng.alt = '2';
  
            if (item.classList.contains(classesToCheck[pressedBtnId])) {
              item.appendChild(newBadApplePng);
                modal.innerText = 'You lost'
                modal.classList.add('is-active');
                blurredBg.classList.add('is-active');
                setTimeout(() => {
                  modal.classList.remove('is-active');
                  blurredBg.classList.remove('is-active');
                  resetGame()
              }, 3000);
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



// take.addEventListener('click', )