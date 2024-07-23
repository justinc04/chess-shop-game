import { shopItems } from "./shop.js";

let whiteMoney = 4;
let blackMoney = 5;
let currentTurn = 1; // 1 for White, 2 for Black

let whiteMoneyGain = 1;
let blackMoneyGain = 1;

let whitePurchasedItems = [];
let blackPurchasedItems = [];

let currentShopItems = [];

function updateTurnIndicator() {
  const whitePlayer = document.getElementById('white');
  const blackPlayer = document.getElementById('black');

  if (currentTurn === 1) {
    whitePlayer.classList.add('current');
    blackPlayer.classList.remove('current');
  } else {
    blackPlayer.classList.add('current');
    whitePlayer.classList.remove('current');
  }
}

export function endTurn() {
  const gain = currentTurn === 1 ? whiteMoneyGain : blackMoneyGain;
  updatePlayerMoney(currentTurn, gain);
  currentTurn = currentTurn === 1 ? 2 : 1;
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

function royalMint() {
  if (currentTurn === 1) {
    whiteMoneyGain++;
  }
  else {
    blackMoneyGain++;
  }
}

function renderPlayerMoney() {
  document.getElementById('money1').innerText = `$${whiteMoney}`;
  document.getElementById('money2').innerText = `$${blackMoney}`;
}

function renderShop() {
  let shopHTML = ``;
  currentShopItems = [...shopItems];
  let purchasedItems = currentTurn === 1 ? whitePurchasedItems : blackPurchasedItems;

  purchasedItems.forEach((item) => {
    const index = currentShopItems.findIndex(i => i.name === item.name);
    currentShopItems.splice(index, 1);
  });

  currentShopItems.sort((a, b) => a.price - b.price);

  currentShopItems.forEach((item, index) => {
    shopHTML += `
      <div class="item">
        <h3>${item.name}</h3>
        <h4>$${item.price}</h4>
        <p class="item-description">${item.description}</p>
          <button id="${item.name}" class="buy-button">
            Buy <span class="hotkey">[${index + 1}]</span>
          </button>
        
      </div>
    `
  });

  document.querySelector('.shop').innerHTML = shopHTML;

  document.querySelectorAll('.buy-button').forEach((button) => {
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
    return;
  }

  currentShopItems.forEach((item, index) => {
    if (key.code === `Digit${index + 1}`) {
      if (buyItem(item.name)) {
        document.getElementById(item.name).disabled = true;
      }
    }
  });
});

document.getElementById('endTurn').addEventListener('click', () => {
  endTurn();
});

document.body.addEventListener('click', () => {
  document.activeElement.blur();
});

updateTurnIndicator();
renderPlayerMoney();
renderShop();
