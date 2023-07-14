document.getElementById('main-action-button').onclick = function () {
  document.getElementById('products').scrollIntoView({behavior: 'smooth'})
}

let links = document.querySelectorAll('.menu-item > a')
for (let link of links) {
  link.onclick = function () {
    document.getElementById(link.getAttribute('data-link')).scrollIntoView({behavior: 'smooth'})
  }
}

let buttons = document.getElementsByClassName('product-button');
for (let button of buttons) {
  button.onclick = function (event) {
    let productItem = event.target.closest('.products-item');
    let burgerName = productItem.querySelector('.products-item-title').textContent;
    let burgerPrice = productItem.querySelector('.products-item-price').textContent;
    let currentBurger = document.getElementById('burger').value;
    if (currentBurger) {
      document.getElementById('burger').value = `${currentBurger} + ${burgerName} (${burgerPrice})`;
    } else {
      document.getElementById('burger').value = `${burgerName} (${burgerPrice})`;
    }
    document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
  };
}

let burger = document.getElementById('burger')
let name = document.getElementById('name')
let phone = document.getElementById('phone')

document.getElementById('order-action').onclick = function () {
  let hasError = false;
  [burger, name, phone].forEach(item => {
    if (!item.value) {
      item.parentElement.style.background = 'red'
      hasError = true
    } else {
      item.parentElement.style.background = ''
    }
  })
  
  if (!hasError) {
    let phoneNumber = phone.value;
    let phoneRegex = /^\+\d{1,3}\d{2}\d{3}\d{3}\d{2}$/;
    if (!phoneRegex.test(phoneNumber)) {
      phone.parentElement.style.background = 'red';
      alert('Введите контактный номер телефона в формате +XXX XX XXX XXX XX');
      return;
    }
    [burger, name, phone].forEach(item => {
      item.value = ''
    })
    alert('Спасибо за заказ! Мы скоро свяжемся с вами!')
  }
}

let prices = document.getElementsByClassName('products-item-price')

document.getElementById('change-currency').onclick = function (event) {
  let currentCurrency = event.target.innerText

  let newCurrency = '$'
  let coefficient = '1'

  if (currentCurrency === '$') {
    newCurrency = '₽'
    coefficient = 80
  } else if (currentCurrency === '₽') {
    newCurrency = 'BYN'
    coefficient = 3
  } else if (currentCurrency === 'BYN') {
    newCurrency = '€'
    coefficient = 0.89
  } else if (currentCurrency === '€') {
    newCurrency = '¥'
    coefficient = 7.14
  }

  event.target.innerText = newCurrency

  for (let price of prices) {
    price.innerText = `${+(price.getAttribute('data-base-price') * coefficient).toFixed(1)} ${newCurrency}`
  }
}