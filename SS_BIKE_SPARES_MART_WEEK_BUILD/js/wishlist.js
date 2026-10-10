// BIKE SPARES MART - Wishlist Management Module
let wishlist = JSON.parse(localStorage.getItem('bsm_wishlist') || '[]');

function saveWishlist() {
  localStorage.setItem('bsm_wishlist', JSON.stringify(wishlist));
  updateWishlistBadge();
}

function updateWishlistBadge() {
  const badge = document.getElementById('wishlistCount');
  if (badge) {
    badge.textContent = wishlist.length;
    badge.style.display = wishlist.length > 0 ? 'inline-block' : 'none';
  }
}

function isInWishlist(id) {
  return wishlist.includes(Number(id));
}

function toggleWishlist(id, event) {
  if (event) event.stopPropagation();
  const numId = Number(id);
  const p = products.find(x => x.id === numId);
  const index = wishlist.indexOf(numId);

  if (index > -1) {
    wishlist.splice(index, 1);
    toast(`Removed ${p ? p.name : 'part'} from wishlist`);
  } else {
    wishlist.push(numId);
    toast(`❤️ Added ${p ? p.name : 'part'} to wishlist!`);
  }

  saveWishlist();
  updateWishlistHearts();
  if (!document.getElementById('wishlistModal').classList.contains('hide')) {
    renderWishlist();
  }
}

function updateWishlistHearts() {
  document.querySelectorAll('.wishlist-toggle-btn').forEach(btn => {
    const id = Number(btn.getAttribute('data-id'));
    if (isInWishlist(id)) {
      btn.classList.add('active');
      btn.innerHTML = '❤️';
    } else {
      btn.classList.remove('active');
      btn.innerHTML = '🤍';
    }
  });
}

function openWishlist() {
  renderWishlist();
  document.getElementById('wishlistModal').classList.remove('hide');
}

function closeWishlist() {
  document.getElementById('wishlistModal').classList.add('hide');
}

function renderWishlist() {
  const container = document.getElementById('wishlistItems');
  const countSpan = document.getElementById('wishlistModalCount');
  if (countSpan) countSpan.textContent = wishlist.length;

  if (!wishlist.length) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🤍</div>
        <h3>Your Wishlist is Empty</h3>
        <p>Save spare parts you want to monitor, compare, or buy later.</p>
        <button class="primary" onclick="closeWishlist(); productsView();">Explore 25+ Spare Parts</button>
      </div>
    `;
    return;
  }

  const items = wishlist.map(id => products.find(p => p.id === id)).filter(Boolean);

  container.innerHTML = `
    <div class="wishlist-actions-bar">
      <span><b>${items.length}</b> saved item(s)</span>
      <button class="btn-outline-sm" onclick="moveAllWishlistToCart()">Move All to Cart 🛒</button>
    </div>
    <div class="wishlist-list">
      ${items.map(p => `
        <div class="wishlist-row">
          <img src="${p.img}" onerror="this.src='${p.fallbackSvg}'" alt="${p.name}">
          <div class="wishlist-info">
            <span class="badge-cat">${p.cat}</span>
            <h4>${p.name}</h4>
            <div class="rating-stars">★ ${p.rating} <small>(${p.reviewsCount} reviews)</small></div>
            <div class="price-row">
              <span class="price">₹${p.price.toLocaleString('en-IN')}</span>
              <del class="mrp">₹${p.mrp.toLocaleString('en-IN')}</del>
              <span class="stock-tag ${p.inStock ? 'in-stock' : 'out-stock'}">
                ${p.inStock ? '● In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
          <div class="wishlist-btns">
            <button class="primary btn-sm" onclick="moveToCart(${p.id})">Move to Cart</button>
            <button class="btn-danger-sm" onclick="toggleWishlist(${p.id})">Remove</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function moveToCart(id) {
  add(id);
  const index = wishlist.indexOf(Number(id));
  if (index > -1) {
    wishlist.splice(index, 1);
    saveWishlist();
    updateWishlistHearts();
    renderWishlist();
  }
}

function moveAllWishlistToCart() {
  if (!wishlist.length) return;
  wishlist.forEach(id => add(id));
  wishlist = [];
  saveWishlist();
  updateWishlistHearts();
  renderWishlist();
  toast('All wishlist items moved to cart!');
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  updateWishlistBadge();
});
