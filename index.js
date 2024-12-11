const balance = document.querySelector('.balance');

let balanceValue = localStorage.getItem('balance')

window.onload = function() {
  if (!balanceValue || balanceValue === null || balanceValue === NaN) {
    localStorage.setItem('balance', 0)
  }
};

balance.innerText = balanceValue