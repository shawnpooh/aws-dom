const shoppingBag = document.querySelector('#shopping-bag a'),
  shoppingList = document.querySelector('#shopping-bag-list'),
  btnAdd = document.querySelectorAll('#products-container .btn-add'),
  subtotal = document.querySelector('#subtotal'),
  indicator = document.querySelector('#indicator'),
  btnClear = document.querySelector('.btn-clear');

// * toggle shopping bag
shoppingBag.addEventListener('click', () => {
  if (getComputedStyle(shoppingList).display === 'none') {
    shoppingList.style.display = 'block';
  } else {
    shoppingList.style.display = 'none';
  }
});

function updateAll() {
  // * toggle indicator
  if (itemQuantity > 0) {
    indicator.classList.add('show');
  } else {
    indicator.classList.remove('show');
  }

  // * update quantity and total price

  const itemPrice = document.querySelectorAll('#price');

  let totalPrice = 0;
  for (let unitPrice of itemPrice) {
    let parsedPrice = parseInt(unitPrice.innerText.replace('€', ''));

    totalPrice += parsedPrice;
  }
  subtotal.children[0].innerText = `Subtotal: €${totalPrice} EUR`;

  indicator.innerText = itemQuantity;
}

// * fetch data
async function getData(idx) {
  try {
    const reponse = await fetch('./products.json');
    const data = await reponse.json();

    if (shoppingList.innerText.includes(data[idx].title)) {
      const quantity = document.querySelector(`.drs-${data[idx].id} #quantity`),
        price = document.querySelector(`.drs-${data[idx].id} #price`);

      let currentQuantity = parseInt(quantity.innerText.replace('x ', ''));
      quantity.innerText = `x ${currentQuantity + 1}`;
      price.innerText = `€${data[idx].price * (currentQuantity + 1)}`;
    } else {
      const li = document.createElement('li');
      li.classList.add(`drs-${data[idx].id}`, 'item');
      li.innerHTML = `
        <div>
          <img src="${data[idx].image}" alt="${data[idx].title}" />
          <p id="title">${data[idx].title}</p>
        </div>
        <div>
          <span id="quantity">x 1</span>
          <i id="delete" class="fas fa-trash-alt"></i>
        </div>
        <span id="price">€${data[idx].price}</span>
      `;
      subtotal.before(li);
    }

    updateAll();
  } catch (err) {
    console.log(err);
  }
}

let itemQuantity = 0;

btnAdd[0].addEventListener('click', (e) => {
  if (confirm('Are you sure you wanna add this item to the shopping bag?')) {
    itemQuantity++;
    getData(0);
    alert('Added to the shopping bag!');
  }
});

btnAdd[1].addEventListener('click', (e) => {
  if (confirm('Are you sure you wanna add this item to the shopping bag?')) {
    itemQuantity++;
    getData(1);
    alert('Added to the shopping bag!');
  }
});

btnAdd[2].addEventListener('click', (e) => {
  if (confirm('Are you sure you wanna add this item to the shopping bag?')) {
    itemQuantity++;
    getData(2);
    alert('Added to the shopping bag!');
  }
});

btnAdd[3].addEventListener('click', (e) => {
  if (confirm('Are you sure you wanna add this item to the shopping bag?')) {
    itemQuantity++;
    getData(3);
    alert('Added to the shopping bag!');
  }
});

btnAdd[4].addEventListener('click', (e) => {
  if (confirm('Are you sure you wanna add this item to the shopping bag?')) {
    itemQuantity++;
    getData(4);
    alert('Added to the shopping bag!');
  }
});

// * delete an item

shoppingList.addEventListener('click', (e) => {
  let currentQuantity = parseInt(
    e.target.previousElementSibling.innerText.replace('x ', '')
  );

  itemQuantity -= currentQuantity;
  if (e.target.id === 'delete') {
    e.target.parentElement.parentElement.remove();
    updateAll();
  }
});

// * clear all items
btnClear.addEventListener('click', (e) => {
  e.stopPropagation();
  const addedItems = document.querySelectorAll(
    '#shopping-bag-list li:not(#subtotal):not(#list-header)'
  );
  for (let addedItem of addedItems) {
    addedItem.remove();
  }

  itemQuantity = 0;
  updateAll();

  console.log(addedItems);
});
