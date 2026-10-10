// BIKE SPARES MART - Master Application Controller
// Handles 4K catalog rendering, search, multi-faceted filtering, sorting, product quick-view modal & reviews

let activeQuickViewId = null;
let currentSort = 'featured';

function toast(message) {
  let toastBox = document.getElementById("toast");
  if (!toastBox) {
    toastBox = document.createElement("div");
    toastBox.id = "toast";
    document.body.appendChild(toastBox);
  }
  toastBox.innerHTML = `<span>🏍️</span> <div>${message}</div>`;
  toastBox.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toastBox.classList.remove("show"), 2600);
}

function closeM(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add("hide");
}

function render() {
  const searchInput = document.getElementById("search");
  const categorySelect = document.getElementById("category");
  const bikeSelect = document.getElementById("bikeFilter");
  const sortSelect = document.getElementById("sortFilter");
  const inStockCheckbox = document.getElementById("inStockOnly");
  const grid = document.getElementById("grid");
  const resultCount = document.getElementById("catalogCount");

  const q = searchInput ? searchInput.value.toLowerCase().trim() : "";
  const cat = categorySelect ? categorySelect.value : "all";
  const bike = bikeSelect ? bikeSelect.value : "all";
  const sortVal = sortSelect ? sortSelect.value : currentSort;
  const inStockOnly = inStockCheckbox ? inStockCheckbox.checked : false;

  let filtered = products.filter(p => {
    // Category match
    const matchCat = cat === "all" || p.cat === cat;

    // Search query match (name, cat, desc, specs)
    const matchQuery = !q || 
      p.name.toLowerCase().includes(q) || 
      p.cat.toLowerCase().includes(q) || 
      p.desc.toLowerCase().includes(q) ||
      (p.compatibility && p.compatibility.some(c => c.toLowerCase().includes(q)));

    // Bike compatibility match
    const matchBike = bike === "all" || 
      (p.compatibility && p.compatibility.some(c => c.toLowerCase().includes(bike.toLowerCase()) || c === "All Bikes" || c.includes("Universal")));

    // Stock match
    const matchStock = !inStockOnly || p.inStock;

    return matchCat && matchQuery && matchBike && matchStock;
  });

  // Sorting
  if (sortVal === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortVal === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortVal === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortVal === "reviews") {
    filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
  }

  if (resultCount) {
    resultCount.textContent = `${filtered.length} Genuine 4K Spares`;
  }

  if (!filtered.length) {
    grid.innerHTML = `
      <div class="empty-state grid-span-all">
        <div class="empty-icon">🔍</div>
        <h3>No Matching Bike Spares Found</h3>
        <p>Try clearing filters or search for another keyword like "Brake", "Chain", "LED", or "Oil".</p>
        <button class="primary" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const isWished = isInWishlist ? isInWishlist(p.id) : false;
    const discountPct = Math.round(((p.mrp - p.price) / p.mrp) * 100);

    return `
      <article class="prod-card" data-id="${p.id}">
        <!-- Top Media Wrap -->
        <div class="card-media">
          <img src="${p.img}" onerror="this.src='${p.fallbackSvg}'" alt="${p.name}" loading="lazy">
          
          <!-- Badges -->
          <div class="badge-tag-wrap">
            <span class="prod-badge ${p.badge.toLowerCase().replace(/\s+/g, '-')}">${p.badge}</span>
            ${discountPct > 0 ? `<span class="discount-badge">-${discountPct}%</span>` : ''}
          </div>

          <!-- Wishlist Heart Button -->
          <button class="wishlist-toggle-btn ${isWished ? 'active' : ''}" 
                  data-id="${p.id}" 
                  onclick="toggleWishlist(${p.id}, event)" 
                  title="${isWished ? 'Remove from Wishlist' : 'Add to Wishlist'}">
            ${isWished ? '❤️' : '🤍'}
          </button>
        </div>

        <!-- Body Details -->
        <div class="card-body">
          <div class="cat-stock-row">
            <span class="card-cat">${p.cat}</span>
            <span class="card-stock-status ${p.inStock ? 'in-stock' : 'out-stock'}">
              ${p.inStock ? `● In Stock (${p.stockCount})` : 'Out of Stock'}
            </span>
          </div>

          <h3 class="card-title" title="${p.name}" onclick="openProductQuickView(${p.id})">
            ${p.name}
          </h3>

          <!-- Rating & Reviews Bar -->
          <div class="card-rating-bar" onclick="openProductQuickView(${p.id})">
            <span class="stars-val">★ ${p.rating.toFixed(1)}</span>
            <span class="reviews-count">(${p.reviewsCount} reviews)</span>
          </div>

          <!-- Compatibility Pill -->
          <div class="compat-snippet">
            <span>Fits:</span> <em>${p.compatibility ? p.compatibility[0] : 'Universal'}</em>
          </div>

          <!-- Price Row -->
          <div class="card-price-row">
            <div class="prices">
              <span class="curr-price">₹${p.price.toLocaleString("en-IN")}</span>
              <del class="mrp-price">₹${p.mrp.toLocaleString("en-IN")}</del>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="card-actions">
            <button class="btn-quick-view" onclick="openProductQuickView(${p.id})" title="View Specs & Reviews">
              Specs & Reviews
            </button>
            <button class="btn-rate-card" onclick="openReviewFormDirect(${p.id})" title="Submit Rating & Review">
              ⭐ Rate & Review Part
            </button>
            <button class="btn-add-cart" onclick="add(${p.id})">
              🛒 Add
            </button>
            <button class="btn-buy-now" onclick="buy(${p.id})">
              ⚡ Buy Now
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function resetFilters() {
  if (document.getElementById("search")) document.getElementById("search").value = "";
  if (document.getElementById("category")) document.getElementById("category").value = "all";
  if (document.getElementById("bikeFilter")) document.getElementById("bikeFilter").value = "all";
  if (document.getElementById("sortFilter")) document.getElementById("sortFilter").value = "featured";
  if (document.getElementById("inStockOnly")) document.getElementById("inStockOnly").checked = false;
  render();
}

// Product Quick View & Reviews Modal
function openProductQuickView(id) {
  const p = products.find(x => x.id === Number(id));
  if (!p) return;

  activeQuickViewId = p.id;
  const modal = document.getElementById("productModal");
  if (!modal) return;

  const allReviews = getProductReviews(p.id);
  const avgStats = calculateAverageRating(p.id);
  const discountPct = Math.round(((p.mrp - p.price) / p.mrp) * 100);

  // Specifications table HTML
  const specsRows = p.specs ? Object.entries(p.specs).map(([k, v]) => `
    <tr>
      <th>${k}</th>
      <td>${v}</td>
    </tr>
  `).join("") : "";

  // Compatibility badges HTML
  const compatBadges = (p.compatibility || []).map(b => `
    <span class="compat-pill">✓ ${b}</span>
  `).join("");

  // Customer Reviews list HTML
  const reviewsListHtml = allReviews.length ? allReviews.map(r => `
    <div class="review-item">
      <div class="review-head">
        <div>
          <b>${r.author}</b>
          ${r.verified ? '<span class="verified-pill">✓ Verified Rider</span>' : ''}
          ${r.bike ? `<span class="review-bike-tag">🏍️ ${r.bike}</span>` : ''}
        </div>
        <div class="review-date-stars">
          <span class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
          <small>${r.date}</small>
        </div>
      </div>
      <div class="review-title"><b>${r.title || ''}</b></div>
      <p class="review-text">${r.text}</p>
    </div>
  `).join("") : `<div class="empty-reviews">No reviews written yet. Be the first rider to review!</div>`;

  modal.innerHTML = `
    <div class="modal-backdrop" onclick="closeM('productModal')"></div>
    <div class="modal-dialog-4k">
      <div class="modal-header-bar">
        <span class="badge-cat">${p.cat}</span>
        <button class="btn-close-modal" onclick="closeM('productModal')">✕</button>
      </div>

      <div class="modal-body-split">
        <!-- Left: Image Gallery & Highlights -->
        <div class="modal-gallery-col">
          <div class="modal-main-img-wrap">
            <img id="quickViewMainImg" src="${p.img}" onerror="this.src='${p.fallbackSvg}'" alt="${p.name}">
            <span class="prod-badge ${p.badge.toLowerCase().replace(/\s+/g, '-')}">${p.badge}</span>
          </div>
          
          <div class="modal-trust-pills">
            <div>🛡️ 100% OEM Tested</div>
            <div>⚡ Express Dispatched</div>
            <div>🔄 7-Day Replacement</div>
          </div>
        </div>

        <!-- Right: Info, Specs, Actions -->
        <div class="modal-info-col">
          <h2 class="modal-prod-title">${p.name}</h2>
          
          <!-- Rating Summary -->
          <div class="modal-rating-summary">
            <div class="big-rating-number">★ ${avgStats.rating}</div>
            <div>
              <div class="rating-stars">${'★'.repeat(Math.round(avgStats.rating))}${'☆'.repeat(5 - Math.round(avgStats.rating))}</div>
              <small>Based on ${avgStats.count} verified rider ratings</small>
            </div>
          </div>

          <!-- Pricing -->
          <div class="modal-price-box">
            <div class="prices">
              <span class="curr-price">₹${p.price.toLocaleString("en-IN")}</span>
              <del class="mrp-price">₹${p.mrp.toLocaleString("en-IN")}</del>
              <span class="discount-badge">Save ${discountPct}%</span>
            </div>
            <div class="tax-info">Price includes all taxes & GST (18%)</div>
          </div>

          <p class="modal-desc">${p.desc}</p>

          <!-- Specifications Table -->
          <div class="modal-specs-block">
            <h4>Technical Specifications</h4>
            <table class="specs-table">
              <tbody>
                ${specsRows}
              </tbody>
            </table>
          </div>

          <!-- Compatible Bikes -->
          <div class="modal-compat-block">
            <h4>Compatible Motorcycle Models</h4>
            <div class="compat-tags-container">
              ${compatBadges}
            </div>
          </div>

          <!-- Purchase Action Buttons -->
          <div class="modal-action-row">
            <button class="primary full" onclick="add(${p.id}); closeM('productModal');">
              🛒 Add to Cart
            </button>
            <button class="buy-now-btn full" onclick="buy(${p.id}); closeM('productModal');">
              ⚡ Buy Now
            </button>
            <button class="wishlist-btn-large" onclick="toggleWishlist(${p.id})">
              ${isInWishlist(p.id) ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>

      <!-- Reviews & Ratings Section -->
      <div class="modal-reviews-section">
        <div class="reviews-section-header">
          <div>
            <h3>Rider Reviews & Verified Ratings</h3>
            <p>Real-world feedback from motorcyclists who installed this part.</p>
          </div>
          <button class="btn-outline-sm" onclick="toggleReviewForm()">
            ✍️ Write a Review
          </button>
        </div>

        <!-- Add Review Form (collapsible) -->
        <div id="addReviewFormContainer" class="add-review-box hide">
          <h4>Submit Your Review for ${p.name}</h4>
          <form onsubmit="handleReviewSubmit(event, ${p.id})">
            <div class="form-row-2">
              <div>
                <label>Your Name *</label>
                <input id="newRevAuthor" type="text" placeholder="e.g. Arjun K." required>
              </div>
              <div>
                <label>Your Bike Model *</label>
                <input id="newRevBike" type="text" placeholder="e.g. KTM Duke 390 / Yamaha MT-15" required>
              </div>
            </div>

            <div class="form-row-2">
              <div>
                <label>Rating *</label>
                <select id="newRevRating">
                  <option value="5">★★★★★ 5 Stars - Exceptional</option>
                  <option value="4">★★★★☆ 4 Stars - Very Good</option>
                  <option value="3">★★★☆☆ 3 Stars - Average</option>
                  <option value="2">★★☆☆☆ 2 Stars - Below Expectations</option>
                  <option value="1">★☆☆☆☆ 1 Star - Poor</option>
                </select>
              </div>
              <div>
                <label>Review Headline *</label>
                <input id="newRevTitle" type="text" placeholder="e.g. Outstanding bite and fitment!" required>
              </div>
            </div>

            <div>
              <label>Detailed Experience *</label>
              <textarea id="newRevText" rows="3" placeholder="Tell other riders how this part performs on the road..." required></textarea>
            </div>

            <div class="form-btns">
              <button type="submit" class="primary">Submit Review</button>
              <button type="button" class="btn-outline-sm" onclick="toggleReviewForm()">Cancel</button>
            </div>
          </form>
        </div>

        <!-- Reviews List -->
        <div class="modal-reviews-list">
          ${reviewsListHtml}
        </div>
      </div>
    </div>
  `;

  modal.classList.remove("hide");
}

function toggleReviewForm() {
  const formBox = document.getElementById("addReviewFormContainer");
  if (formBox) {
    formBox.classList.toggle("hide");
  }
}

function openReviewFormDirect(productId) {
  openProductQuickView(productId);
  setTimeout(() => {
    const formBox = document.getElementById("addReviewFormContainer");
    if (formBox) {
      formBox.classList.remove("hide");
      formBox.scrollIntoView({ behavior: "smooth" });
      const authorInput = document.getElementById("newRevAuthor");
      if (authorInput) authorInput.focus();
    }
  }, 100);
}

function handleReviewSubmit(e, productId) {
  e.preventDefault();
  const author = document.getElementById("newRevAuthor").value.trim();
  const bike = document.getElementById("newRevBike").value.trim();
  const rating = Number(document.getElementById("newRevRating").value);
  const title = document.getElementById("newRevTitle").value.trim();
  const text = document.getElementById("newRevText").value.trim();

  if (!author || !text) {
    return toast("Please fill all mandatory fields.");
  }

  addProductReview(productId, {
    author,
    bike,
    rating,
    title,
    text
  });

  toast("🎉 Review & rating submitted! Thank you for helping fellow riders.");
  openProductQuickView(productId);
  render(); // update card stars
}

// Navigation Views
function home() {
  const loginPage = document.getElementById("loginPage");
  if (loginPage) loginPage.classList.add("hide");
  const app = document.getElementById("app");
  if (app) app.classList.remove("hide");
  document.getElementById("hero").classList.remove("hide");
  document.getElementById("catalog").classList.remove("hide");
  const orders = document.getElementById("orders");
  if (orders) orders.classList.add("hide");
  const dash = document.getElementById("dashboardSection");
  if (dash) dash.classList.add("hide");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function loginView(tab = 'login') {
  const loginPage = document.getElementById("loginPage");
  const app = document.getElementById("app");
  if (loginPage && app) {
    loginPage.classList.remove("hide");
    app.classList.add("hide");
    if (typeof switchAuthTab === "function") switchAuthTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function productsView() {
  home();
  setTimeout(() => {
    document.getElementById("catalog").scrollIntoView({ behavior: "smooth" });
  }, 50);
}

function ordersView() {
  document.getElementById("hero").classList.add("hide");
  document.getElementById("catalog").classList.add("hide");
  const dash = document.getElementById("dashboardSection");
  if (dash) dash.classList.add("hide");
  const orders = document.getElementById("orders");
  if (orders) {
    orders.classList.remove("hide");
    renderOrders();
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Initialization
function boot() {
  // Populate category filter options
  const catSelect = document.getElementById("category");
  if (catSelect) {
    const cats = [...new Set(products.map(p => p.cat))].sort();
    cats.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      catSelect.appendChild(opt);
    });
  }

  // Populate bike filter options
  const bikeSelect = document.getElementById("bikeFilter");
  if (bikeSelect) {
    const defaultBikes = [
      "Yamaha R15 / MT-15",
      "KTM Duke / RC",
      "Royal Enfield Classic / Hunter / Himalayan",
      "Bajaj Pulsar / Dominar",
      "TVS Apache RTR",
      "Honda CB350"
    ];
    defaultBikes.forEach(b => {
      const opt = document.createElement("option");
      opt.value = b.split(" ")[0]; // Main keyword
      opt.textContent = b;
      bikeSelect.appendChild(opt);
    });
  }

  render();
  save();
  updateWishlistBadge();

  // If user is already logged in, show app
  if (localStorage.user || localStorage.getItem('bsm_user')) {
    const loginPage = document.getElementById("loginPage");
    if (loginPage) loginPage.classList.add("hide");
    const app = document.getElementById("app");
    if (app) app.classList.remove("hide");
  }
}

document.addEventListener("DOMContentLoaded", boot);