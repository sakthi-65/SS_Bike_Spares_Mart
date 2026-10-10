// BIKE SPARES MART - Comprehensive Rider Dashboard Module
// Overview statistics, order history, digital garage bike selector & address management

function openDashboard(defaultTab = 'overview') {
  // Hide main store views and show dashboard
  document.getElementById('hero').classList.add('hide');
  document.getElementById('catalog').classList.add('hide');
  const ordersSec = document.getElementById('orders');
  if (ordersSec) ordersSec.classList.add('hide');

  const dashSec = document.getElementById('dashboardSection');
  if (dashSec) dashSec.classList.remove('hide');

  switchDashboardTab(defaultTab);
  renderDashboardData();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeDashboard() {
  const dashSec = document.getElementById('dashboardSection');
  if (dashSec) dashSec.classList.add('hide');
  home();
}

function switchDashboardTab(tabId) {
  document.querySelectorAll('.dash-nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.dash-tab-pane').forEach(p => p.classList.add('hide'));

  const activeBtn = document.getElementById(`dashBtn_${tabId}`);
  const activePane = document.getElementById(`dashPane_${tabId}`);

  if (activeBtn) activeBtn.classList.add('active');
  if (activePane) activePane.classList.remove('hide');
}

function renderDashboardData() {
  const user = JSON.parse(localStorage.getItem('bsm_user') || 'null') || {
    name: 'Vikram Rider',
    email: 'rider@gmail.com',
    bike: 'Yamaha MT-15 V2',
    phone: '9845123456',
    city: 'Bangalore',
    address: 'Plot 88, 100ft Road, Koramangala',
    pin: '560034',
    martCoins: 500
  };

  const userOrders = JSON.parse(localStorage.getItem('orders') || '[]');
  const userWishlist = JSON.parse(localStorage.getItem('bsm_wishlist') || '[]');

  // Metrics
  const totalSpent = userOrders.reduce((sum, o) => sum + Number(o.total || 0), 0);
  const totalItemsOrdered = userOrders.reduce((sum, o) => sum + (o.items ? o.items.length : 1), 0);

  // Update UI Elements
  const elName = document.getElementById('dashRiderName');
  const elEmail = document.getElementById('dashRiderEmail');
  const elActiveBike = document.getElementById('dashActiveBikeName');
  const elOrdersCount = document.getElementById('dashStatOrders');
  const elWishlistCount = document.getElementById('dashStatWishlist');
  const elSpent = document.getElementById('dashStatSpent');
  const elCoins = document.getElementById('dashStatCoins');

  if (elName) elName.textContent = user.name;
  if (elEmail) elEmail.textContent = user.email;
  if (elActiveBike) elActiveBike.textContent = user.bike || 'Yamaha MT-15 V2';
  if (elOrdersCount) elOrdersCount.textContent = userOrders.length;
  if (elWishlistCount) elWishlistCount.textContent = userWishlist.length;
  if (elSpent) elSpent.textContent = `₹${totalSpent.toLocaleString('en-IN')}`;
  if (elCoins) elCoins.textContent = user.martCoins || 500;

  // Render Dashboard Orders Pane
  const ordersContainer = document.getElementById('dashOrdersList');
  if (ordersContainer) {
    if (!userOrders.length) {
      ordersContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📦</div>
          <h3>No Orders Yet</h3>
          <p>You haven't placed any bike spares orders yet.</p>
          <button class="primary" onclick="closeDashboard(); productsView();">Explore 25+ Spare Parts</button>
        </div>
      `;
    } else {
      ordersContainer.innerHTML = userOrders.map(o => `
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
              <div><b>Ship To:</b> ${o.name} (${o.phone})</div>
              <div><b>Address:</b> ${o.address}, ${o.city} - ${o.pin}</div>
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
              <span>Total:</span>
              <b>₹${Number(o.total).toLocaleString('en-IN')}</b>
            </div>
            <div class="order-action-links">
              <a href="order-success.html?orderId=${o.id}" class="btn-primary-sm" target="_blank">
                📄 View 4K Invoice & Live Map
              </a>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  // Render Garage Pane
  renderGarageVehicles();

  // Pre-fill profile settings
  if (document.getElementById('profName')) document.getElementById('profName').value = user.name || '';
  if (document.getElementById('profEmail')) document.getElementById('profEmail').value = user.email || '';
  if (document.getElementById('profPhone')) document.getElementById('profPhone').value = user.phone || '';
  if (document.getElementById('profCity')) document.getElementById('profCity').value = user.city || '';
  if (document.getElementById('profAddress')) document.getElementById('profAddress').value = user.address || '';
  if (document.getElementById('profPin')) document.getElementById('profPin').value = user.pin || '';
}

function renderGarageVehicles() {
  const container = document.getElementById('garageVehiclesList');
  if (!container) return;

  const user = JSON.parse(localStorage.getItem('bsm_user') || 'null');
  const userBikes = JSON.parse(localStorage.getItem('bsm_garage_bikes') || '[]');

  // Ensure primary bike exists
  if (!userBikes.length && user && user.bike) {
    userBikes.push({
      id: 1,
      model: user.bike,
      year: '2023',
      regNo: 'KA-05-EX-7821',
      engine: '155cc VVA Liquid Cooled',
      active: true
    });
    localStorage.setItem('bsm_garage_bikes', JSON.stringify(userBikes));
  }

  container.innerHTML = `
    <div class="garage-grid">
      ${userBikes.map(b => `
        <div class="garage-bike-card ${b.active ? 'active-bike' : ''}">
          <div class="bike-card-head">
            <span class="bike-icon">🏍️</span>
            <div>
              <span class="badge-cat-sm">${b.active ? 'ACTIVE RIDE' : 'SAVED BIKE'}</span>
              <h4>${b.model}</h4>
            </div>
          </div>
          <div class="bike-specs-list">
            <div><span>Year:</span> <b>${b.year || '2023'}</b></div>
            <div><span>Reg No:</span> <b>${b.regNo || 'KA-01-AB-1234'}</b></div>
            <div><span>Engine:</span> <b>${b.engine || 'High-RPM'}</b></div>
          </div>
          <div class="bike-actions">
            <button class="btn-primary-sm" onclick="filterByBikeModel('${b.model}')">
              🔍 Show Parts That Fit This Bike
            </button>
            ${!b.active ? `<button class="btn-outline-sm" onclick="setActiveGarageBike(${b.id})">Set as Active</button>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function filterByBikeModel(bikeModel) {
  closeDashboard();
  const bikeSelect = document.getElementById('bikeFilter');
  if (bikeSelect) {
    // Find matching option
    for (let opt of bikeSelect.options) {
      if (bikeModel.toLowerCase().includes(opt.value.toLowerCase()) || opt.value.toLowerCase().includes(bikeModel.toLowerCase())) {
        bikeSelect.value = opt.value;
        break;
      }
    }
  }
  render();
  setTimeout(() => {
    document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
    toast(`Filtered spares compatible with ${bikeModel}!`);
  }, 100);
}

function addGarageBike(event) {
  if (event) event.preventDefault();
  const model = document.getElementById('newBikeModel').value.trim();
  const year = document.getElementById('newBikeYear').value.trim();
  const regNo = document.getElementById('newBikeReg').value.trim();

  if (!model) return toast('Please specify motorcycle model.');

  const bikes = JSON.parse(localStorage.getItem('bsm_garage_bikes') || '[]');
  bikes.push({
    id: Date.now(),
    model,
    year: year || '2024',
    regNo: regNo || 'KA-01-XX-9999',
    engine: 'Single Cylinder Performance',
    active: bikes.length === 0
  });

  localStorage.setItem('bsm_garage_bikes', JSON.stringify(bikes));
  renderGarageVehicles();
  toast(`Added ${model} to your Digital Garage! 🏍️`);

  // Clear inputs
  document.getElementById('newBikeModel').value = '';
  document.getElementById('newBikeYear').value = '';
  document.getElementById('newBikeReg').value = '';
}

function saveProfileChanges(event) {
  if (event) event.preventDefault();
  const user = JSON.parse(localStorage.getItem('bsm_user') || 'null') || {};

  user.name = document.getElementById('profName').value.trim();
  user.email = document.getElementById('profEmail').value.trim();
  user.phone = document.getElementById('profPhone').value.trim();
  user.city = document.getElementById('profCity').value.trim();
  user.address = document.getElementById('profAddress').value.trim();
  user.pin = document.getElementById('profPin').value.trim();

  localStorage.setItem('bsm_user', JSON.stringify(user));
  updateAuthUI();
  toast('Profile and delivery preferences updated!');
  renderDashboardData();
}
