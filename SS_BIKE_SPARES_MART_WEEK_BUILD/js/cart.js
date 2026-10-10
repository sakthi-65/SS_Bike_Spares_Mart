// BIKE SPARES MART - High-End 4K Cart System
// Includes promo coupons, free-delivery meter, quantity controls, Buy Now flow & badge sync

let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let activeCoupon = JSON.parse(localStorage.getItem('bsm_active_coupon') || 'null');

const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 99;

function save() {
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('bsm_active_coupon', JSON.stringify(activeCoupon));
  updateCartBadge();
}

function updateCartBadge() {
  const badge = document.getElementById('cartCount');
  if (badge) {
    const totalQty = cart.reduce((acc, it) => acc + (it.q || 1), 0);
    badge.textContent = totalQty;
    badge.style.display = totalQty > 0 ? 'inline-block' : 'none';
  }
}

function add(id, quantity = 1) {
  const p = products.find(x => x.id === Number(id));
  if (!p) return;

  const existing = cart.find(x => x.id === Number(id));
  if (existing) {
    existing.q += quantity;
  } else {
    cart.push({
      id: p.id,
      name: p.name,
      cat: p.cat,
      price: p.price,
      mrp: p.mrp,
      img: p.img,
      fallbackSvg: p.fallbackSvg,
      q: quantity
    });
  }

  save();
  toast(`🛒 Added to cart: ${p.name}`);
}

function buy(id) {
  const numId = Number(id);
  const p = products.find(x => x.id === numId);
  if (!p) return;

  // Ensure product is in cart
  const existing = cart.find(x => x.id === numId);
  if (!existing) {
    cart.push({
      id: p.id,
      name: p.name,
      cat: p.cat,
      price: p.price,
      mrp: p.mrp,
      img: p.img,
      fallbackSvg: p.fallbackSvg,
      q: 1
    });
    save();
  }

  // Open checkout directly
  checkout();
}

function openCart() {
  renderCart();
  const modal = document.getElementById('cartModal');
  if (modal) modal.classList.remove('hide');
}

function closeCart() {
  const modal = document.getElementById('cartModal');
  if (modal) modal.classList.add('hide');
}

function chg(index, delta) {
  if (!cart[index]) return;
  cart[index].q += delta;
  if (cart[index].q < 1) {
    cart.splice(index, 1);
  }
  save();
  renderCart();
}

function removeCartItem(index) {
  if (cart[index]) {
    const name = cart[index].name;
    cart.splice(index, 1);
    save();
    renderCart();
    toast(`Removed ${name} from cart`);
  }
}

function clearCart() {
  cart = [];
  activeCoupon = null;
  save();
  renderCart();
  toast('Cart cleared.');
}

function applyCouponCode() {
  const input = document.getElementById('couponInput');
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (!code) {
    return toast('Please enter a coupon code.');
  }

  if (code === 'RIDER10') {
    activeCoupon = { code: 'RIDER10', type: 'percent', val: 10, label: '10% RIDER DISCOUNT' };
    toast('🎉 Coupon RIDER10 applied! 10% OFF');
  } else if (code === 'BIKEMART') {
    activeCoupon = { code: 'BIKEMART', type: 'flat', val: 200, label: '₹200 Mart Special' };
    toast('🎉 Coupon BIKEMART applied! ₹200 OFF');
  } else if (code === 'FREESHIP') {
    activeCoupon = { code: 'FREESHIP', type: 'shipping', val: 0, label: 'Free Shipping Voucher' };
    toast('🎉 Coupon FREESHIP applied! Free Delivery');
  } else {
    return toast('Invalid coupon code. Try RIDER10 or BIKEMART');
  }

  save();
  renderCart();
}

function removeCoupon() {
  activeCoupon = null;
  save();
  renderCart();
  toast('Coupon removed.');
}

function calculateCartTotals() {
  const subtotal = cart.reduce((acc, it) => acc + (it.price * it.q), 0);
  const totalMrp = cart.reduce((acc, it) => acc + ((it.mrp || it.price * 1.3) * it.q), 0);
  const savings = Math.max(0, totalMrp - subtotal);

  let shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING_FEE;
  if (activeCoupon && activeCoupon.type === 'shipping') {
    shipping = 0;
  }

  let discount = 0;
  if (activeCoupon) {
    if (activeCoupon.type === 'percent') {
      discount = Math.round(subtotal * (activeCoupon.val / 100));
    } else if (activeCoupon.type === 'flat') {
      discount = Math.min(subtotal, activeCoupon.val);
    }
  }

  const grandTotal = Math.max(0, subtotal - discount + shipping);

  return {
    subtotal,
    totalMrp,
    savings,
    shipping,
    discount,
    grandTotal,
    freeShipRemaining: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  };
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const totalSpan = document.getElementById('cartTotal');
  const totals = calculateCartTotals();

  if (!cart.length) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🛒</div>
        <h3>Your Cart is Empty</h3>
        <p>Explore 25+ genuine 4K OEM motorcycle spares and accessories.</p>
        <button class="primary" onclick="closeCart(); productsView();">Start Shopping</button>
      </div>
    `;
    if (totalSpan) totalSpan.textContent = '0';
    return;
  }

  // Free shipping progress calculation
  const progressPercent = Math.min(100, Math.round((totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const freeShipText = totals.freeShipRemaining === 0 
    ? '🎉 You unlocked <b>FREE Express Delivery</b>!'
    : `Add <b>₹${totals.freeShipRemaining.toLocaleString('en-IN')}</b> more to get <b>FREE Express Delivery!</b>`;

  container.innerHTML = `
    <!-- Free Shipping Progress -->
    <div class="free-shipping-card">
      <div class="free-ship-header">
        <span>🚚 ${freeShipText}</span>
        <span class="pct">${progressPercent}%</span>
      </div>
      <div class="free-ship-bar">
        <div class="free-ship-fill" style="width: ${progressPercent}%"></div>
      </div>
    </div>

    <!-- Items List -->
    <div class="cart-items-list">
      ${cart.map((item, i) => `
        <div class="cartrow-modern">
          <img src="${item.img}" onerror="this.src='${item.fallbackSvg}'" alt="${item.name}">
          <div class="cart-info">
            <span class="badge-cat-sm">${item.cat || 'Bike Spare'}</span>
            <h5>${item.name}</h5>
            <div class="cart-price">
              <b>₹${(item.price * item.q).toLocaleString('en-IN')}</b>
              <small>(₹${item.price.toLocaleString('en-IN')} each)</small>
            </div>
          </div>
          <div class="cart-qty-ctrl">
            <button onclick="chg(${i}, -1)">−</button>
            <span>${item.q}</span>
            <button onclick="chg(${i}, 1)">+</button>
          </div>
          <button class="cart-del-btn" title="Remove" onclick="removeCartItem(${i})">🗑️</button>
        </div>
      `).join('')}
    </div>

    <!-- Promo Coupon Section -->
    <div class="coupon-section">
      <div class="coupon-input-group">
        <input type="text" id="couponInput" placeholder="Try promo RIDER10 or BIKEMART" value="${activeCoupon ? activeCoupon.code : ''}">
        <button type="button" class="btn-outline-sm" onclick="applyCouponCode()">Apply</button>
      </div>
      ${activeCoupon ? `
        <div class="active-coupon-tag">
          <span>🏷️ ${activeCoupon.label}</span>
          <button type="button" onclick="removeCoupon()">✕</button>
        </div>
      ` : ''}
    </div>

    <!-- Price Breakdown Summary -->
    <div class="cart-summary-breakdown">
      <div class="breakdown-row">
        <span>Item Subtotal (${cart.reduce((a, x) => a + x.q, 0)} items)</span>
        <span>₹${totals.subtotal.toLocaleString('en-IN')}</span>
      </div>
      ${totals.discount > 0 ? `
        <div class="breakdown-row discount">
          <span>Coupon Discount</span>
          <span>- ₹${totals.discount.toLocaleString('en-IN')}</span>
        </div>
      ` : ''}
      <div class="breakdown-row">
        <span>Delivery Charges</span>
        <span>${totals.shipping === 0 ? '<b style="color:#00e5ff;">FREE</b>' : '₹' + totals.shipping}</span>
      </div>
      <div class="breakdown-row total-highlight">
        <b>Grand Total</b>
        <b class="highlight-price">₹${totals.grandTotal.toLocaleString('en-IN')}</b>
      </div>
      <div class="savings-note">
        ✨ You saved <b>₹${(totals.savings + totals.discount).toLocaleString('en-IN')}</b> on this order!
      </div>
    </div>
  `;

  if (totalSpan) {
    totalSpan.textContent = totals.grandTotal.toLocaleString('en-IN');
  }
}

// Initial badge update
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
});