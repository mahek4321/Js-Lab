// Cart state (multi-item)
const GST_RATE = 0.18;
let cart = []; // { productName, price, qty }

const PRODUCTS = [
  { id: 'p1', name: 'Bluetooth Headphones', price: 1499, imageSrc: 'images/bluetooth-headphones.svg' },
  { id: 'p2', name: 'Smart Watch', price: 2499, imageSrc: 'images/smart-watch.svg' },
  { id: 'p3', name: 'Wireless Mouse', price: 499, imageSrc: 'images/wireless-mouse.svg' },
  { id: 'p4', name: 'Mechanical Keyboard', price: 3299, imageSrc: 'images/mechanical-keyboard.svg' },
  { id: 'p5', name: 'Power Bank (10000mAh)', price: 1299, imageSrc: 'images/power-bank.svg' }
];


function formatINR(amount) {
  return `₹${Number(amount).toFixed(2)}`;
}

function findCartIndex(productId) {
  return cart.findIndex((x) => x.id === productId);
}

function addToCart(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  const qtyInput = document.getElementById(`qty_${productId}`);
  const qty = Number(qtyInput.value);

  if (!product) return;
  if (!Number.isFinite(qty) || qty <= 0) {
    alert('Please enter a valid quantity (greater than 0).');
    return;
  }

  const idx = findCartIndex(productId);
  if (idx === -1) {
    cart.push({ id: product.id, productName: product.name, price: product.price, qty });
  } else {
    cart[idx].qty += qty;
  }

  renderCart();
}

function clearCart() {
  cart = [];
  document.getElementById('output').innerHTML = '';
  renderCart();
}

function updateQty(productId, newQty) {
  const idx = findCartIndex(productId);
  if (idx === -1) return;

  const qty = Number(newQty);
  if (!Number.isFinite(qty) || qty <= 0) {
    // Remove item if qty is invalid/zero
    cart.splice(idx, 1);
  } else {
    cart[idx].qty = qty;
  }

  renderCart();
}

function removeItem(productId) {
  const idx = findCartIndex(productId);
  if (idx !== -1) cart.splice(idx, 1);
  renderCart();
}

function calcTotals() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const gstAmount = subtotal * GST_RATE;
  const total = subtotal + gstAmount;
  return { subtotal, gstAmount, total };
}

function renderProducts() {
  const container = document.getElementById('products');
  container.innerHTML = PRODUCTS.map((p) => {
    return `
      <article class="product-card">
        <div class="product-media" aria-hidden="true">
          <img class="product-img" src="${p.imageSrc}" alt="" loading="lazy" />
        </div>

        <h3>${p.name}</h3>
        <p class="price">Price: <strong>${formatINR(p.price)}</strong></p>

        <label class="mini-label" for="qty_${p.id}">Qty</label>
        <input class="qty-input" type="number" min="1" id="qty_${p.id}" value="1" />

        <button class="add-btn" onclick="addToCart('${p.id}')">Add to Cart</button>
      </article>
    `;
  }).join('');
}


function renderCart() {
  const cartBody = document.getElementById('cartBody');
  const { subtotal, gstAmount, total } = calcTotals();

  document.getElementById('subtotal').textContent = formatINR(subtotal);
  document.getElementById('gstAmount').textContent = formatINR(gstAmount);
  document.getElementById('total').textContent = formatINR(total);

  if (cart.length === 0) {
    cartBody.innerHTML = `<tr><td colspan="5" class="empty">Cart is empty. Add products →</td></tr>`;
    return;
  }

  cartBody.innerHTML = cart.map((item) => {
    return `
      <tr>
        <td>${item.productName}</td>
        <td class="right">${formatINR(item.price)}</td>
        <td class="right">
          <input class="cart-qty" type="number" min="1" value="${item.qty}" onchange="updateQty('${item.id}', this.value)" />
        </td>
        <td class="right">${formatINR(item.price * item.qty)}</td>
        <td class="right">
          <button class="remove-btn" onclick="removeItem('${item.id}')" aria-label="Remove item">✕</button>
        </td>
      </tr>
    `;
  }).join('');
}

function calculateBill() {
  const customerName = document.getElementById('name').value.trim();
  const phoneRaw = document.getElementById('phone').value.trim();
  const phoneDigits = phoneRaw.replace(/\D/g, '');

  if (!customerName) {
    alert('Please enter customer name.');
    return;
  }

  if (!phoneDigits || phoneDigits.length !== 10) {
    alert('Please enter a valid 10-digit phone number.');
    return;
  }

  if (cart.length === 0) {
    alert('Cart is empty. Add at least one product.');
    return;
  }

  const { subtotal, gstAmount, total } = calcTotals();

  // Object + destructuring (kept from original approach)
  const bill = { customerName, phoneDigits, items: cart, subtotal, gstAmount, total };
  const { customerName: name, phoneDigits: phone, items, subtotal: sub, gstAmount: gst, total: finalAmount } = bill;


  const itemsRows = items.map((item) => {
    return `
      <tr>
        <td>${item.productName}</td>
        <td class="right">${formatINR(item.price)}</td>
        <td class="right">${item.qty}</td>
        <td class="right">${formatINR(item.price * item.qty)}</td>
      </tr>
    `;
  }).join('');

  document.getElementById('output').innerHTML = `
    <div class="bill" role="region" aria-label="Bill Receipt">
      <h2>🧾 BILL RECEIPT</h2>
      <div class="billing-details">
        <p><strong>Customer :</strong> ${name}</p>
        <p><strong>Phone :</strong> ${phone}</p>
      </div>


      <div class="receipt-table-wrap">
        <table class="receipt-table">
          <thead>
            <tr>
              <th>Item</th>
              <th class="right">Price</th>
              <th class="right">Qty</th>
              <th class="right">Amount</th>
            </tr>
          </thead>
          <tbody>${itemsRows}</tbody>
        </table>
      </div>

      <hr />
      <div class="totals">
        <div class="summary-row"><span>Subtotal</span><span>${formatINR(sub)}</span></div>
        <div class="summary-row"><span>GST (18%)</span><span>${formatINR(gst)}</span></div>
        <div class="summary-row total-row"><span>Total</span><span>${formatINR(finalAmount)}</span></div>
      </div>
    </div>
  `;
}

// Init
renderProducts();
renderCart();
