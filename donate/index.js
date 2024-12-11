const balance = document.querySelector('.balance');
const increase = document.querySelectorAll('.increase');

let balanceValue = localStorage.getItem('balance')

window.onload = function() {
  if (!balanceValue || balanceValue === null || balanceValue === NaN) {
    localStorage.setItem('balance', 0)
  }
};

balance.innerText = balanceValue

increase.forEach(element => {
  element.addEventListener('click', ()=>{
    balanceValue = parseInt(balanceValue, 10);
    balanceValue += parseInt(element.innerText, 10);
    localStorage.setItem('balance', balanceValue);
    balance.innerText = balanceValue
  })
});