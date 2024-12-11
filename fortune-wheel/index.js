const balance = document.querySelector('.balance');

const btnRotate = document.querySelector('.rotate');
const wheel = document.querySelector('.wheel');

const modal = document.querySelector('.modal');
const blurredBg = document.querySelector('.blurred-bg');

const input = document.querySelector('.input');


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

btnRotate.addEventListener('click', () => {
    if (input.value > 0 && !isStarted && parseInt(balance.innerText) >= input.value) {
        isStarted = true
        let current = Math.floor(Math.random() * -345)
        current -= 720
        wheel.style.transform = `rotate(${current}deg)`;
        current += 720
        balanceValue = localStorage.getItem('balance')
        localStorage.setItem('balance', parseInt(balanceValue) - parseInt(input.value));
        balance.innerText = localStorage.getItem('balance')
        setTimeout(() => {
            modal.classList.add('is-active');
            blurredBg.classList.add('is-active');
            setTimeout(() => {
              modal.classList.remove('is-active');
              blurredBg.classList.remove('is-active');
              isStarted = false  
          }, 2500);
            switch (true) {
                case (current <= 14 && current >= -15):
                  modal.innerText = 'money back'
                  localStorage.setItem('balance', balanceValue);
                  balance.innerText = localStorage.getItem('balance')
                    break;

                case (current <= -46 && current >= -75 || current <= -226 && current >= -255):
                    modal.innerText = `you won $${input.value * 2}`
                    localStorage.setItem('balance', parseInt(balanceValue) + parseInt(input.value));
                    localStorage.setItem('balance', input.value * 1 + parseInt(balanceValue));
                    balance.innerText = localStorage.getItem('balance')
                    break;
                    
                case (current <= -105 && current >= -135):
                    modal.innerText = `you won $${input.value * 4}`
                    localStorage.setItem('balance', parseInt(balanceValue) + parseInt(input.value));
                    localStorage.setItem('balance', input.value * 3 + parseInt(balanceValue));
                    balance.innerText = localStorage.getItem('balance')
                    break;  

                case (current <= -165 && current >= -195):
                    modal.innerText = `you won $${input.value * 10}`
                    localStorage.setItem('balance', parseInt(balanceValue) + parseInt(input.value));
                    localStorage.setItem('balance', input.value * 9 + parseInt(balanceValue));
                    balance.innerText = localStorage.getItem('balance')
                    break;

                case (current <= -286 && current >= -315):
                    modal.innerText = `you won $${input.value * 3}`
                    localStorage.setItem('balance', parseInt(balanceValue) + parseInt(input.value));
                    localStorage.setItem('balance', input.value * 2 + parseInt(balanceValue));
                    balance.innerText = localStorage.getItem('balance')
                    break;

                case (current <= -16 && current >= -45 || current <= -76 && current >= -104 || current <= -136 && current >= -164 || current <= -196 && current >= -225 || current <= -256 && current >= -285 || current <= -316 && current >= -345):
                    modal.innerText = 'you lost'
                    balance.innerText = localStorage.getItem('balance')
                    break; 
            }
          wheel.style.transform = `rotate(${0}deg)`;
      }, 4000);
    }
})


input.addEventListener("input", function() {
    this.value = this.value.replace(/[^0-9]/g, '');

    if (this.value.length > 0 && this.value[0] === '0') {
        this.value = this.value.substring(1);
    }
    if (this.value > parseInt(balance.innerText)) {
        this.value = balance.innerText;
    }
});