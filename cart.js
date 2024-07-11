let label = document.getElementById("label");
let shoppingcart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("data")) || [];
let calculation = () => {
  let amount = document.getElementById("cartAmount");
  amount.innerHTML = basket.reduce((total, x) => total + x.item, 0).toString();
};
calculation();
let generateItems = () => {
  if (basket.length !== 0) {
    return (shoppingcart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return `
          <div class="cart-item">
          <img width="100"src=${search.img} alt=""/>
          <div class="details">
            <div class="title-price-x">
              <h4 class="title-price">
               <p>${search.name}</p>
               <p class="cart-items-price">$ ${search.price}</p>
              </h4>
              <i onclick="removeItems('${id}')" class="bi bi-x-lg"></i>
           </div>
           <div class="buttons">
              <i onclick="decreament(${id})" class="bi bi-dash"></i>
              <div id="${id}" class="quantity">${item}</div>
              <i onclick="increament('${id}')" class="bi bi-plus"></i>
            </div> 
            
            <h3>$${item * search.price}</h3>
             </div>
          </div>
          `;
      })
      .join(""));
  } else {
    shoppingcart.innerHTML = ``;
    label.innerHTML = `
     <h2>Cart is Empty</h2>
     <a href="index.html">
        <button class="HomeBtn">Back to Home</button>
     </a>
    `;
  }
};
generateItems();
let increament = (id) => {
  let selectItem = shopItemsData.find((item) => item.id === id);
  let search = basket.find((x) => x.id === selectItem.id);
  if (search === undefined) {
    basket.push({
      id: selectItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  generateItems();
  update(selectItem);
  localStorage.setItem("data", JSON.stringify(basket));
};
let decreament = (id) => {
  let selectItem = shopItemsData.find((item) => item.id === id);
  let search = basket.find((x) => x.id === selectItem.id);
  if (search === undefined || search.item === 0) {
    return;
  } else {
    search.item -= 1;
  }
  /* if (search.item === 0) {
    basket = basket.filter((x) => x.id !== selectItem.id);
  } */
  update(selectItem);
  basket = basket.filter((x) => x.item != 0);
  generateItems();
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id.id);
  document.getElementById(id.id).innerHTML = search.item;
  calculation();
  Totalamount();
};
let removeItems = (id) => {
  let selectItem = id;
  basket = basket.filter((x) => x.id !== selectItem);
  generateItems();
  Totalamount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let cleaecart = () => {
  basket = [];
  generateItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let Totalamount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    label.innerHTML = `
      <h2>Total Bill: $ ${amount}</h2>
      <button class="checkout">Checkout</button>
      <button onclick="cleaecart()" class="removeAll">Clear Cart</button>
    `;
  } else return;
};
Totalamount();
