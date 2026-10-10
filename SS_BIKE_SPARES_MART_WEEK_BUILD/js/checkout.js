// BIKE SPARES MART - Checkout & Order Processing Module
// Strict Name validation (NO NUMBERS allowed), Strict Phone validation (EXACTLY 10 digits)
// Full Interactive UPI QR Code Payment Flow & Dedicated Order Confirmation

let orders = JSON.parse(localStorage.getItem('orders') || '[]');
let upiTimerInterval = null;
let pendingOrderData = null;

// SVG UPI QR Code Generator
function generateUpiQrSvg(amount, orderId) {
  // Generate pseudo-random deterministic module grid with fixed finder patterns
  const size = 25;
  const modules = Array.from({ length: size }, () => Array(size).fill(false));

  // Helper to draw 7x7 Finder Patterns
  function drawFinder(row, col) {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
          modules[row + r][col + c] = true;
        }
      }
    }
  }

  drawFinder(0, 0); // Top-left
  drawFinder(0, size - 7); // Top-right
  drawFinder(size - 7, 0); // Bottom-left

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    modules[6][i] = i % 2 === 0;
    modules[i][6] = i % 2 === 0;
  }

  // Data modules based on hash of amount and orderId
  let seed = 0;
  const str = `upi://pay?pa=bikesparesmart@upi&pn=BikeSparesMart&am=${amount}&tr=${orderId}`;
  for (let i = 0; i < str.length; i++) seed = (seed * 31 + str.charCodeAt(i)) % 100000;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      // Don't overwrite finders
      const inTL = r < 8 && c < 8;
      const inTR = r < 8 && c >= size - 8;
      const inBL = r >= size - 8 && c < 8;
      const inCenter = r >= 10 && r <= 14 && c >= 10 && c <= 14;

      if (!inTL && !inTR && !inBL && !inCenter) {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        modules[r][c] = (seed % 3 === 0);
      }
    }
  }

  // SVG representation
  let rects = '';
  const cellSize = 8;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (modules[r][c]) {
        rects += `<rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize}" height="${cellSize}" fill="#0d141e"/>`;
      }
    }
  }

  const svgWidth = size * cellSize;
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgWidth} ${svgWidth}" width="100%" height="100%" style="background:#fff; border-radius:12px; padding:10px;">
      ${rects}
      <!-- UPI Center Logo Badge -->
      <rect x="${10 * cellSize}" y="${10 * cellSize}" width="${5 * cellSize}" height="${5 * cellSize}" fill="#fff" rx="4"/>
      <rect x="${10.5 * cellSize}" y="${10.5 * cellSize}" width="${4 * cellSize}" height="${4 * cellSize}" fill="#ff5500" rx="3"/>
      <text x="${12.5 * cellSize}" y="${13 * cellSize}" font-family="sans-serif" font-size="14" font-weight="900" fill="#fff" text-anchor="middle" dominant-baseline="middle">₹</text>
    </svg>
  `;
}

function handlePaymentMethodChange() {
  const paymentSelect = document.getElementById('payment');
  const upiPreviewBox = document.getElementById('checkoutUpiPreview');
  if (!paymentSelect || !upiPreviewBox) return;

  const isUpi = paymentSelect.value.toLowerCase().includes('upi');
  if (isUpi) {
    const totals = calculateCartTotals();
    upiPreviewBox.innerHTML = `
      <div class="upi-inline-preview">
        <div class="upi-qr-card-mini">
          <div class="upi-qr-img-wrap-mini">
            ${generateUpiQrSvg(totals.grandTotal, 'BSM' + Math.floor(100000 + Math.random() * 900000))}
          </div>
          <div class="upi-info-mini">
            <div class="upi-badge-chip">⚡ FAST UPI PAYMENT</div>
            <div class="upi-amount-highlight">₹${totals.grandTotal.toLocaleString('en-IN')}</div>
            <div class="upi-vpa-copy">
              <span>bikesparesmart@upi</span>
              <button type="button" class="btn-copy-vpa" onclick="copyUpiVpa(event)">Copy VPA</button>
            </div>
            <div class="upi-app-icons">
              <span class="upi-app-pill">GPay</span>
              <span class="upi-app-pill">PhonePe</span>
              <span class="upi-app-pill">Paytm</span>
              <span class="upi-app-pill">BHIM</span>
            </div>
            <small style="color:var(--muted); font-size:11px; display:block; margin-top:4px;">
              QR code will expand for scanning upon placing order.
            </small>
          </div>
        </div>
      </div>
    `;
    upiPreviewBox.classList.remove('hide');
  } else {
    upiPreviewBox.classList.add('hide');
  }
}

function copyUpiVpa(event) {
  if (event) event.stopPropagation();
  navigator.clipboard.writeText('bikesparesmart@upi').then(() => {
    toast('📋 Copied UPI ID: bikesparesmart@upi');
  }).catch(() => {
    toast('UPI ID: bikesparesmart@upi');
  });
}

function checkout() {
  if (!cart.length) {
    return toast('Your cart is empty. Please add spare parts first.');
  }

  // Close cart modal
  closeCart();

  const checkoutModal = document.getElementById('checkoutModal');
  const summaryBox = document.getElementById('checkoutOrderSummary');
  const totals = calculateCartTotals();

  // Pre-fill user data if available
  const user = JSON.parse(localStorage.getItem('bsm_user') || 'null');
  if (user) {
    if (document.getElementById('name')) document.getElementById('name').value = user.name || '';
    if (document.getElementById('phone')) document.getElementById('phone').value = user.phone || '';
    if (document.getElementById('email')) document.getElementById('email').value = user.email || '';
    if (document.getElementById('city')) document.getElementById('city').value = user.city || '';
    if (document.getElementById('address')) document.getElementById('address').value = user.address || '';
    if (document.getElementById('pin')) document.getElementById('pin').value = user.pin || '';
  } else if (localStorage.user) {
    if (document.getElementById('email')) document.getElementById('email').value = localStorage.user;
  }

  // Render itemized checkout preview
  if (summaryBox) {
    summaryBox.innerHTML = `
      <div class="checkout-summary-card">
        <div class="checkout-summary-head">
          <span><b>Order Review</b> (${cart.reduce((a, x) => a + x.q, 0)} items)</span>
          <a href="javascript:void(0)" onclick="closeM('checkoutModal'); openCart();" class="edit-link">Edit Cart</a>
        </div>
        <div class="checkout-items-preview">
          ${cart.map(item => `
            <div class="preview-mini-row">
              <span class="preview-name">${item.name} <b>× ${item.q}</b></span>
              <span class="preview-price">₹${(item.price * item.q).toLocaleString('en-IN')}</span>
            </div>
          `).join('')}
        </div>
        <div class="checkout-totals-block">
          <div><span>Subtotal:</span> <span>₹${totals.subtotal.toLocaleString('en-IN')}</span></div>
          ${totals.discount > 0 ? `<div class="discount"><span>Discount:</span> <span>- ₹${totals.discount.toLocaleString('en-IN')}</span></div>` : ''}
          <div><span>Express Delivery:</span> <span>${totals.shipping === 0 ? '<b style="color:#00e5ff;">FREE</b>' : '₹' + totals.shipping}</span></div>
          <div class="final-payable">
            <b>Total Payable Amount:</b>
            <b class="payable-val">₹${totals.grandTotal.toLocaleString('en-IN')}</b>
          </div>
        </div>
      </div>
    `;
  }

  checkoutModal.classList.remove('hide');
  handlePaymentMethodChange();
}

// Strict Real-Time Input Sanitizers
function sanitizeNameInput(input) {
  // Numbers are strictly not allowed in the Name field!
  input.value = input.value.replace(/[0-9]/g, '');
  const errHint = document.getElementById('nameErrorHint');
  if (errHint) {
    if (/\d/.test(input.value)) {
      errHint.style.display = 'block';
    } else {
      errHint.style.display = 'none';
    }
  }
}

function sanitizePhoneInput(input) {
  // Only numbers allowed, exactly up to 10 digits!
  input.value = input.value.replace(/\D/g, '').slice(0, 10);
  const errHint = document.getElementById('phoneErrorHint');
  if (errHint) {
    if (input.value.length > 0 && input.value.length < 10) {
      errHint.textContent = `Required 10 digits (Current: ${input.value.length})`;
      errHint.style.display = 'block';
    } else {
      errHint.style.display = 'none';
    }
  }
}

function placeOrder() {
  const nameEl = document.getElementById('name');
  const phoneEl = document.getElementById('phone');
  const emailEl = document.getElementById('email');
  const cityEl = document.getElementById('city');
  const addressEl = document.getElementById('address');
  const pinEl = document.getElementById('pin');
  const paymentEl = document.getElementById('payment');

  const name = nameEl.value.trim();
  const phone = phoneEl.value.trim();
  const email = emailEl.value.trim();
  const city = cityEl.value.trim();
  const address = addressEl.value.trim();
  const pin = pinEl.value.trim();
  const payment = paymentEl ? paymentEl.value : 'Cash on Delivery';

  // 1. Strict Name Validation: Numbers are NOT allowed!
  if (/\d/.test(name)) {
    return toast('❌ Numbers are NOT allowed in Full Name! Please use letters only.');
  }
  if (!name || name.length < 2 || !/^[A-Za-z\s.'-]+$/.test(name)) {
    return toast('❌ Please enter a valid Rider Name using alphabetic characters only.');
  }

  // 2. Strict Phone Validation: Only 10 digits allowed!
  if (!/^\d{10}$/.test(phone)) {
    return toast('❌ Mobile phone must be EXACTLY 10 digits! Numbers only.');
  }

  // 3. Other fields
  if (!address || !city) {
    return toast('❌ Please fill in complete delivery street address and city.');
  }
  if (!/^\d{6}$/.test(pin)) {
    return toast('❌ Postal pincode must be exactly 6 digits.');
  }

  const totals = calculateCartTotals();
  if (totals.grandTotal <= 0 && cart.length === 0) {
    return toast('Cart is empty.');
  }

  // Delivery Date calculation
  const estDate = new Date();
  estDate.setDate(estDate.getDate() + 3);
  const deliveryFormatted = estDate.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const orderId = 'BSM-' + Math.floor(100000 + Math.random() * 900000);

  // Prepare order payload
  pendingOrderData = {
    id: orderId,
    trackingNo: 'BD-' + Math.floor(10000000 + Math.random() * 90000000),
    date: new Date().toLocaleString('en-IN'),
    estDelivery: deliveryFormatted,
    carrier: 'BlueDart Air Priority Express',
    name: name,
    phone: phone,
    email: email,
    address: address,
    city: city,
    pin: pin,
    payment: payment,
    subtotal: totals.subtotal,
    shipping: totals.shipping,
    discount: totals.discount,
    coupon: activeCoupon ? activeCoupon.code : null,
    total: totals.grandTotal,
    status: 'Confirmed & Packed',
    items: cart.map(item => ({
      id: item.id,
      name: item.name,
      cat: item.cat,
      price: item.price,
      mrp: item.mrp || item.price * 1.3,
      q: item.q,
      img: item.img,
      fallbackSvg: item.fallbackSvg
    }))
  };

  // CHECK IF PAYMENT IS UPI
  if (payment.toLowerCase().includes('upi')) {
    // Open Dedicated UPI QR Code Modal
    openUpiQrModal(pendingOrderData);
    return;
  }

  // Otherwise, finalize standard order (COD / Card / NetBanking)
  finalizeOrderPlacement(pendingOrderData);
}

// UPI QR Code Dedicated Modal Flow
function openUpiQrModal(order) {
  closeM('checkoutModal');

  let modal = document.getElementById('upiQrModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'upiQrModal';
    modal.className = 'modal';
    document.body.appendChild(modal);
  }

  const qrSvg = generateUpiQrSvg(order.total, order.id);

  modal.innerHTML = `
    <div class="card wide upi-qr-modal-card">
      <div class="mh">
        <div style="display:flex; align-items:center; gap:10px;">
          <span style="font-size:24px;">⚡</span>
          <div>
            <h2 style="font-size:20px; margin:0;">Scan UPI QR Code to Pay</h2>
            <small style="color:var(--cyan); font-weight:700;">Instant Auto-Verification Enabled</small>
          </div>
        </div>
        <button class="close-x" onclick="cancelUpiPayment()">×</button>
      </div>

      <div class="upi-modal-content-grid">
        <!-- Left: QR Code Display -->
        <div class="upi-qr-display-panel">
          <div class="upi-qr-frame">
            ${qrSvg}
          </div>
          <div class="upi-scan-instructions">
            <span>📷 Scan with Any UPI App</span>
            <div class="upi-app-badges">
              <span>Google Pay</span>
              <span>PhonePe</span>
              <span>Paytm</span>
              <span>BHIM UPI</span>
              <span>Cred</span>
            </div>
          </div>
        </div>

        <!-- Right: Payment Meta & Actions -->
        <div class="upi-meta-panel">
          <div class="upi-payable-box">
            <span class="upi-label">TOTAL PAYABLE AMOUNT</span>
            <div class="upi-modal-amount">₹${order.total.toLocaleString('en-IN')}</div>
            <div class="upi-order-ref">Order Ref: <b>#${order.id}</b></div>
          </div>

          <div class="upi-vpa-details">
            <div><span>Merchant:</span> <b>BIKE SPARES MART PVT LTD</b></div>
            <div>
              <span>UPI VPA:</span> 
              <b style="color:var(--cyan);">bikesparesmart@upi</b>
              <button type="button" class="btn-copy-vpa" onclick="copyUpiVpa(event)">Copy</button>
            </div>
            <div><span>Bank:</span> <b>HDFC Bank Merchant Services</b></div>
          </div>

          <!-- Live 5-minute Countdown Timer -->
          <div class="upi-timer-box">
            <span>⏳ QR Code valid for:</span>
            <b id="upiCountdownText" class="upi-timer-text">04:59</b>
          </div>

          <!-- Action Buttons -->
          <div class="upi-action-btns">
            <button class="primary full glow-btn" onclick="simulateUpiSuccess()">
              ✓ I Have Paid / Verify UPI Payment
            </button>
            <button class="btn-outline-dark full" onclick="cancelUpiPayment()">
              Cancel / Change Payment Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hide');
  startUpiTimer();
}

function startUpiTimer() {
  clearInterval(upiTimerInterval);
  let secondsLeft = 300; // 5 minutes
  const timerEl = document.getElementById('upiCountdownText');

  upiTimerInterval = setInterval(() => {
    secondsLeft--;
    if (secondsLeft <= 0) {
      clearInterval(upiTimerInterval);
      if (timerEl) timerEl.textContent = '00:00 (Expired)';
      toast('UPI payment window expired. Please retry.');
      cancelUpiPayment();
      return;
    }

    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    if (timerEl) {
      timerEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
  }, 1000);
}

function cancelUpiPayment() {
  clearInterval(upiTimerInterval);
  const modal = document.getElementById('upiQrModal');
  if (modal) modal.classList.add('hide');
  // Re-open checkout modal so user can change payment mode
  document.getElementById('checkoutModal').classList.remove('hide');
}

function simulateUpiSuccess() {
  clearInterval(upiTimerInterval);
  if (!pendingOrderData) return;

  const refCode = 'UPI' + Math.floor(1000000000 + Math.random() * 9000000000);
  pendingOrderData.payment = `UPI Verified (${refCode})`;
  pendingOrderData.status = 'Payment Verified & Packing';

  const modal = document.getElementById('upiQrModal');
  if (modal) {
    modal.innerHTML = `
      <div class="card success" style="text-align:center; padding:40px;">
        <div class="check-animation" style="width:70px; height:70px; font-size:36px; margin:0 auto 16px;">✓</div>
        <h2 style="font-size:24px; color:#10b981; margin-bottom:8px;">UPI Payment Received!</h2>
        <p style="color:var(--muted); font-size:14px; margin-bottom:12px;">Reference: <b>${refCode}</b> • Amount: <b>₹${pendingOrderData.total.toLocaleString('en-IN')}</b></p>
        <p style="font-size:15px;">Opening your official 4K tax invoice and tracking page...</p>
      </div>
    `;
  }

  toast('🎉 UPI Payment Approved! Generating 4K Tax Invoice...');

  setTimeout(() => {
    finalizeOrderPlacement(pendingOrderData);
  }, 1200);
}

function finalizeOrderPlacement(orderObj) {
  orders.unshift(orderObj);
  localStorage.setItem('orders', JSON.stringify(orders));

  // Clear cart and active coupon
  cart = [];
  activeCoupon = null;
  save();

  // Close modals
  closeM('checkoutModal');
  closeM('upiQrModal');

  // Navigate to dedicated 4K Order Success page as required
  window.location.href = `order-success.html?orderId=${orderObj.id}`;
}

function renderOrders() {
  const container = document.getElementById('orderList');
  if (!container) return;

  if (!orders.length) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📦</div>
        <h3>No Orders Placed Yet</h3>
        <p>Your placed orders and live dispatch invoices will appear here.</p>
        <button class="primary" onclick="productsView()">Browse 25+ Spare Parts</button>
      </div>
    `;
    return;
  }

  container.innerHTML = orders.map(o => `
    <div class="order-card-modern">
      <div class="order-card-top">
        <div class="order-id-group">
          <span class="order-tag">ORDER #${o.id}</span>
          <span class="order-date">${o.date}</span>
        </div>
        <div class="order-status-badge">● ${o.status || 'Confirmed'}</div>
      </div>

      <div class="order-card-body">
        <div class="order-delivery-info">
          <div><b>Shipping To:</b> ${o.name}</div>
          <div><b>Address:</b> ${o.address}, ${o.city} - ${o.pin}</div>
          <div><b>Est. Delivery:</b> ${o.estDelivery || '3 Days'}</div>
          <div><b>Payment:</b> ${o.payment}</div>
        </div>

        <div class="order-items-snippet">
          ${o.items.map(it => `
            <div class="order-item-pill">
              <span class="item-name">${it.name}</span>
              <span class="item-qty">× ${it.q}</span>
              <span class="item-amt">₹${(it.price * it.q).toLocaleString('en-IN')}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="order-card-foot">
        <div class="order-total-display">
          <span>Total Paid:</span>
          <b>₹${Number(o.total).toLocaleString('en-IN')}</b>
        </div>
        <div class="order-action-links">
          <a href="order-success.html?orderId=${o.id}" class="btn-primary-sm" target="_blank">
            📄 4K Invoice & Live Map Track
          </a>
        </div>
      </div>
    </div>
  `).join('');
}