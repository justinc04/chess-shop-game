import { shopItems } from "./shop.js";
import { renderStartTime, runTimer, stopTimer, toggleTimer } from "./timer.js";

const earnOneCutoff = 25;
const moneyCap = 35;

let whiteMoney = 0;
let blackMoney = 1;
let currentTurn = 1; // 1 for White, 2 for Black

let whitePurchasedItems = [];
let blackPurchasedItems = [];

let currentShopItems = [];

function updateTurnIndicator() {
  const whitePlayer = document.getElementById('white');
  const blackPlayer = document.getElementById('black');

  whitePlayer.disabled = !whitePlayer.disabled;
  blackPlayer.disabled = !blackPlayer.disabled;
}

export function endTurn() {
  const currentMoney = currentTurn === 1 ? whiteMoney : blackMoney;
  const gain = currentMoney < earnOneCutoff ? 2 : 1;

  if (currentMoney < moneyCap) {
    updatePlayerMoney(currentTurn, gain);
  }

  stopTimer(currentTurn);
  currentTurn = currentTurn === 1 ? 2 : 1;
  runTimer(currentTurn);
  updateTurnIndicator();
  renderShop();
}

function updatePlayerMoney(player, amount) {
  if (player === 1) {
    whiteMoney += amount;
  }
  else {
    blackMoney += amount;
  }

  renderPlayerMoney();
}

function buyItem(itemName) {
  let item = null;

  shopItems.forEach((shopItem) => {
    if (shopItem.name === itemName) {
      item = shopItem;
    }
  });
  
  if (currentTurn === 1 && whiteMoney >= item.price || currentTurn === 2 && blackMoney >= item.price) {
    purchaseItem(item);
    return true;
  } 
  
  alert("Not enough money!");
  return false;
}

function purchaseItem(item) {
  updatePlayerMoney(currentTurn, -item.price);

  if (item.type === 'permanent') {
    if (currentTurn === 1) {
      whitePurchasedItems.push(item);
    }
    else {
      blackPurchasedItems.push(item);
    }
  }

  eval(item.function)?.();
}

function renderPlayerMoney() {
  document.getElementById('money1').innerText = `$${whiteMoney}`;
  document.getElementById('money2').innerText = `$${blackMoney}`;
}

function renderShop() {
  currentShopItems = [...shopItems];
  let purchasedItems = currentTurn === 1 ? whitePurchasedItems : blackPurchasedItems;

  purchasedItems.forEach((item) => {
    const index = currentShopItems.findIndex(i => i.name === item.name);
    currentShopItems.splice(index, 1);
  });

  currentShopItems.sort((a, b) => a.price - b.price);

  let shopHTML = ``;

  currentShopItems.forEach((item) => {
    let restrictionsHTML = ``;
    item.restrictions?.forEach((restriction) => {
      restrictionsHTML += `
      <p class="item-restriction">
        <span class="item-restriction-icon">&#10006</span> ${restriction}
      </p>`;
    });

    shopHTML += `
      <button id="${item.name}" class="item">
        <div class="item-header">
          <h3>${item.name}</h3>
          <h3>$${item.price}</h3>
        </div>
        <p class="item-description">${item.description}</p>
        <div class="item-restriction-grid">${restrictionsHTML}</div>
      </button>
    `
  });

  document.querySelector('.shop').innerHTML = shopHTML;

  document.querySelectorAll('.item').forEach((button) => {
    button.addEventListener('click', () => {
      if (buyItem(button.id)) {
        button.disabled = true;
      }
    });
  });
}

document.body.addEventListener('keydown', (key) => {
  if (key.code === 'Space') {
    key.preventDefault();
    endTurn();
  }
});

document.querySelectorAll('.player').forEach((button) => {
  button.addEventListener('click', () => {
    endTurn();
  });
});

document.getElementById('play').addEventListener('click', () => {
  toggleTimer(currentTurn);
});

document.body.addEventListener('click', () => {
  document.activeElement.blur();
});

renderPlayerMoney();
renderShop();
renderStartTime();
