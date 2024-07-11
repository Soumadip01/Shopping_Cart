let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
        <div id="product-id-${id}" class="item">
        <img width="220" src="${img}" />
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price_quantity">
            <h2>$ ${price}</h2>
            <div class="buttons">
              <i onclick="decreament('${id}')" class="bi bi-dash"></i>
              <div id="${id}" class="quantity">
              ${search.item === undefined ? 0 : search.item}</div>
              <i onclick="increament('${id}')" class="bi bi-plus"></i>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join(""));
};
generateShop();

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
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id.id);
  document.getElementById(id.id).innerHTML = search.item;
  calculation(id);
};
let calculation = () => {
  let amount = document.getElementById("cartAmount");
  amount.innerHTML = basket.reduce((total, x) => total + x.item, 0).toString();
};
calculation();
