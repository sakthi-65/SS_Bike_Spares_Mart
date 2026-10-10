// "YOUR WISE" - Advanced 4K AI Motorcycle Spares & Diagnostic Chatbot
// Provides intelligent parts recommendations, mechanical troubleshooting, compatibility checks & order tracking

const YourWiseAI = {
  isOpen: false,
  soundEnabled: true,
  history: [],

  init() {
    this.createWidget();
    this.bindEvents();
    this.loadInitialGreeting();
  },

  createWidget() {
    if (document.getElementById('your-wise-widget')) return;

    const widget = document.createElement('div');
    widget.id = 'your-wise-widget';
    widget.innerHTML = `
      <!-- Launcher Button -->
      <button id="yourWiseLauncher" class="wise-launcher" aria-label="Chat with Your Wise AI">
        <span class="wise-pulse"></span>
        <div class="wise-avatar-icon">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="10" rx="3" stroke="#ff5500" fill="#131920"/>
            <circle cx="9" cy="16" r="2" fill="#00e5ff"/>
            <circle cx="15" cy="16" r="2" fill="#00e5ff"/>
            <path d="M12 2v5M8 7h8" stroke="#00e5ff"/>
            <path d="M2 15h1M21 15h1" stroke="#ff5500"/>
          </svg>
        </div>
        <div class="wise-badge-unread" id="wiseUnreadBadge">1</div>
        <div class="wise-tooltip">Need Spares Advice? Ask <b>Your Wise AI</b></div>
      </button>

      <!-- Chat Window -->
      <div id="yourWiseWindow" class="wise-window wise-closed">
        <!-- Header -->
        <div class="wise-header">
          <div class="wise-bot-info">
            <div class="wise-head-avatar">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#00e5ff" stroke-width="2">
                <rect x="3" y="11" width="18" height="10" rx="3" fill="#0d141d"/>
                <circle cx="8.5" cy="16" r="1.5" fill="#00e5ff"/>
                <circle cx="15.5" cy="16" r="1.5" fill="#00e5ff"/>
                <path d="M12 2v5M8 7h8"/>
              </svg>
              <span class="wise-status-dot"></span>
            </div>
            <div>
              <div class="wise-title">Your Wise <span class="wise-pill">AI MECHANIC</span></div>
              <div class="wise-sub">Motorcycle Spares & Diagnostic Specialist</div>
            </div>
          </div>
          <div class="wise-actions">
            <button id="wiseClearBtn" title="Reset Conversation" class="wise-icon-btn">↺</button>
            <button id="wiseCloseBtn" title="Close" class="wise-icon-btn">✕</button>
          </div>
        </div>

        <!-- Quick Action Chips -->
        <div class="wise-chips" id="wiseChips">
          <button onclick="YourWiseAI.sendQuick('Which brake pads fit Duke 390?')">🛑 Duke 390 Brake Pads</button>
          <button onclick="YourWiseAI.sendQuick('Best synthetic engine oil for 250cc-400cc?')">🛢️ Best Engine Oil</button>
          <button onclick="YourWiseAI.sendQuick('Troubleshoot clutch slipping')">⚙️ Clutch Slipping Fix</button>
          <button onclick="YourWiseAI.sendQuick('Track my current order')">📦 Track My Order</button>
          <button onclick="YourWiseAI.sendQuick('Recommend LED headlights')">💡 Bright LED Lights</button>
          <button onclick="YourWiseAI.sendQuick('Show spares for Yamaha R15 / MT-15')">🏍️ Yamaha R15 / MT-15 Spares</button>
        </div>

        <!-- Messages Area -->
        <div class="wise-messages" id="wiseMessages"></div>

        <!-- Typing Indicator -->
        <div class="wise-typing hide" id="wiseTyping">
          <span></span><span></span><span></span>
          <em>Your Wise is analyzing spares...</em>
        </div>

        <!-- Input Area -->
        <form class="wise-footer" id="wiseForm" onsubmit="event.preventDefault(); YourWiseAI.handleSubmit();">
          <input type="text" id="wiseInput" placeholder="Ask about bike parts, fitment, or issues..." autocomplete="off">
          <button type="submit" id="wiseSendBtn" aria-label="Send">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </form>
      </div>
    `;

    document.body.appendChild(widget);
  },

  bindEvents() {
    const launcher = document.getElementById('yourWiseLauncher');
    const closeBtn = document.getElementById('wiseCloseBtn');
    const clearBtn = document.getElementById('wiseClearBtn');

    launcher.addEventListener('click', () => this.toggle());
    closeBtn.addEventListener('click', () => this.toggle(false));
    clearBtn.addEventListener('click', () => this.clearChat());
  },

  toggle(forceState) {
    this.isOpen = forceState !== undefined ? forceState : !this.isOpen;
    const win = document.getElementById('yourWiseWindow');
    const badge = document.getElementById('wiseUnreadBadge');

    if (this.isOpen) {
      win.classList.remove('wise-closed');
      badge.style.display = 'none';
      setTimeout(() => document.getElementById('wiseInput').focus(), 150);
      this.scrollToBottom();
    } else {
      win.classList.add('wise-closed');
    }
  },

  loadInitialGreeting() {
    const currentUser = JSON.parse(localStorage.getItem('bsm_user') || 'null');
    const riderName = currentUser ? currentUser.name : (localStorage.user ? localStorage.user.split('@')[0] : 'Rider');
    const bike = currentUser && currentUser.bike ? currentUser.bike : 'your motorcycle';

    const greeting = `
      Hello <b>${riderName}</b>! 🏍️ I'm <b>Your Wise</b>, your personal AI motorcycle mechanic and spares expert.
      <br><br>
      Whether you need <b>OEM brake pads</b>, <b>chain sprocket kits</b>, <b>100% synthetic engine oil</b>, or help troubleshooting <b>${bike}</b>, I'm here 24/7 with instant 4K precision guidance.
      <br><br>
      What part or issue can I help you with right now?
    `;
    this.appendBotMessage(greeting);
  },

  clearChat() {
    const container = document.getElementById('wiseMessages');
    container.innerHTML = '';
    this.loadInitialGreeting();
  },

  sendQuick(text) {
    document.getElementById('wiseInput').value = text;
    this.handleSubmit();
  },

  handleSubmit() {
    const input = document.getElementById('wiseInput');
    const query = input.value.trim();
    if (!query) return;

    this.appendUserMessage(query);
    input.value = '';

    // Show typing
    const typing = document.getElementById('wiseTyping');
    typing.classList.remove('hide');
    this.scrollToBottom();

    setTimeout(() => {
      typing.classList.add('hide');
      const response = this.generateResponse(query);
      this.appendBotMessage(response.text, response.products);
      this.scrollToBottom();
    }, 600 + Math.random() * 400);
  },

  generateResponse(query) {
    const q = query.toLowerCase();

    // 1. Order Tracking
    if (q.includes('order') || q.includes('track') || q.includes('status') || q.includes('delivery')) {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      if (!orders.length) {
        return {
          text: `📦 <b>No Active Orders Found:</b> You haven't placed an order yet in this session. Add any of our 25+ 4K bike spares to your cart or use <b>⚡ Buy Now</b> for instant checkout! Once ordered, I can track your live dispatch stage here.`
        };
      }
      const latest = orders[0];
      const itemsList = latest.items.map(it => `• <b>${it.name}</b> (Qty: ${it.q})`).join('<br>');
      return {
        text: `📦 <b>Live Order Status for #${latest.id}</b><br>
          <b>Recipient:</b> ${latest.name}<br>
          <b>Destination:</b> ${latest.city} (${latest.pin})<br>
          <b>Amount:</b> ₹${Number(latest.total).toLocaleString('en-IN')}<br>
          <b>Status:</b> <span style="color:#00e5ff;font-weight:bold;">● In Transit - Dispatch Hub Bangalore</span><br>
          <b>Estimated Delivery:</b> Within 2 to 3 Business Days via BlueDart Priority<br><br>
          <b>Package Contents:</b><br>${itemsList}<br><br>
          <a href="order-success.html?orderId=${latest.id}" target="_blank" style="color:#ff5500;font-weight:bold;text-decoration:underline;">View 4K Printable Tax Invoice & Live GPS Tracker →</a>`
      };
    }

    // 2. Mechanical Troubleshooting: Spongy Brakes
    if (q.includes('spong') || (q.includes('brake') && (q.includes('soft') || q.includes('lever') || q.includes('squishy')))) {
      const brakeProducts = products.filter(p => p.cat === 'Brakes').slice(0, 2);
      return {
        text: `🛑 <b>Diagnostic: Spongy Brake Lever</b><br>
          A squishy or spongy lever typically indicates <b>air bubbles in the hydraulic brake fluid line</b> or factory rubber hose expansion under pressure.<br><br>
          <b>Recommended Solution:</b><br>
          1. <b>Bleed Hydraulic Line:</b> Flush fresh DOT 4 or DOT 5.1 brake fluid to eliminate micro-bubbles.<br>
          2. <b>Upgrade to Steel Braided Lines:</b> Stock rubber hoses expand when hot. Stainless braided hoses deliver direct hydraulic bite.<br>
          3. <b>Check Sintered Pads:</b> Ensure friction material is at least 2mm thick.`,
        products: brakeProducts
      };
    }

    // 3. Mechanical Troubleshooting: Clutch Slipping
    if (q.includes('clutch') && (q.includes('slip') || q.includes('hard') || q.includes('gear'))) {
      const clutchProds = products.filter(p => p.id === 8 || p.id === 9);
      return {
        text: `⚙️ <b>Diagnostic: Motorcycle Clutch Slippage</b><br>
          If your engine revs spike without proportional road acceleration in 4th/5th gear, your friction plates are glazed or springs fatigued.<br><br>
          <b>Expert Tips:</b><br>
          • Check clutch cable free-play: Ensure 2-3mm play at the lever pivot.<br>
          • Avoid car engine oils: Car oils have friction modifiers that cause wet motorcycle clutches to slip instantly.<br>
          • Upgrade to <b>Kevlar-Reinforced Friction Plates</b> or an <b>Assist & Slipper Kit</b>.`,
        products: clutchProds
      };
    }

    // 4. Engine Oil questions
    if (q.includes('oil') || q.includes('motul') || q.includes('synthetic') || q.includes('lubricant') || q.includes('10w')) {
      const oilProds = products.filter(p => p.id === 16 || p.id === 17);
      return {
        text: `🛢️ <b>Engine Oil Recommendation for High-RPM Bikes</b><br>
          For Indian climate and spirited highway rides, we strongly recommend <b>Motul 7100 10W-50 100% Synthetic Ester</b>.<br><br>
          <b>Why it's superior:</b><br>
          • Ester technology creates a protective magnetic oil film that resists redline thermal breakdown.<br>
          • Certified <b>JASO MA2</b> ensuring zero wet clutch slip.<br>
          • Extends engine life and smoothens clunky gear shifts. Always pair with a high-flow oil filter!`,
        products: oilProds
      };
    }

    // 5. LED Headlight questions
    if (q.includes('light') || q.includes('headlight') || q.includes('led') || q.includes('indicator') || q.includes('bulb')) {
      const lightProds = products.filter(p => p.cat === 'Electrical').slice(0, 3);
      return {
        text: `💡 <b>Lighting & Electrical Upgrade</b><br>
          Upgrade your night visibility with our top-tier automotive electrical components. 6000K crisp cool white illuminates up to 180 meters ahead with proper low-beam cutoff.`,
        products: lightProds
      };
    }

    // 6. Chain & Sprocket questions
    if (q.includes('chain') || q.includes('sprocket') || q.includes('slack') || q.includes('drive')) {
      const chainProds = products.filter(p => p.cat === 'Drive & Chain').slice(0, 3);
      return {
        text: `⛓️ <b>Chain & Sprocket Maintenance Guide</b><br>
          Maintain 25-30mm slack on street bikes. If your chain makes clicking sounds or links are kinked, the O-rings are dried out.<br><br>
          We stock genuine <b>D.I.D Japan Gold O-Ring 520</b> and <b>Rolon Brass Heavy-Duty Sprocket Kits</b> with 10,000 km warranty.`,
        products: chainProds
      };
    }

    // 7. Bike Model Specific: KTM Duke / RC
    if (q.includes('duke') || q.includes('ktm') || q.includes('rc 390') || q.includes('390')) {
      const ktmProds = products.filter(p => p.compatibility.some(c => c.toLowerCase().includes('ktm'))).slice(0, 4);
      return {
        text: `🏍️ <b>Genuine Performance Spares for KTM Duke / RC Series:</b><br>
          Here are top-tier matching upgrades for your KTM. These parts eliminate nose-dive, improve low-end launch, and provide high-heat braking confidence:`,
        products: ktmProds
      };
    }

    // 8. Bike Model Specific: Yamaha R15 / MT-15
    if (q.includes('yamaha') || q.includes('r15') || q.includes('mt-15') || q.includes('mt 15')) {
      const yamahaProds = products.filter(p => p.compatibility.some(c => c.toLowerCase().includes('yamaha'))).slice(0, 4);
      return {
        text: `🏍️ <b>Precision Spares for Yamaha R15 V3/V4 & MT-15:</b><br>
          Engineered for Yamaha's high-revving 155cc VVA engine. Here are exact-fit chain kits, quickshifters, and brake upgrades:`,
        products: yamahaProds
      };
    }

    // 9. Bike Model Specific: Royal Enfield
    if (q.includes('enfield') || q.includes('bullet') || q.includes('classic') || q.includes('hunter') || q.includes('meteor') || q.includes('himalayan')) {
      const reProds = products.filter(p => p.compatibility.some(c => c.toLowerCase().includes('royal enfield') || c.toLowerCase().includes('himalayan'))).slice(0, 4);
      return {
        text: `👑 <b>Touring & Performance Spares for Royal Enfield:</b><br>
          Heavy-duty upgrades engineered for the J-series 350 and Himalayan 411/450 platforms. Includes 300mm floating rotors, tapered head bearings, and bash plates:`,
        products: reProds
      };
    }

    // 10. Tyres & Handling
    if (q.includes('tyre') || q.includes('tire') || q.includes('grip') || q.includes('michelin') || q.includes('pirelli')) {
      const tyreProds = products.filter(p => p.cat === 'Tyres & Wheels').slice(0, 3);
      return {
        text: `🛞 <b>Superbike Compound Tyres & Wheels</b><br>
          Maximize cornering grip and monsoon safety with radial soft-compound tyres:`,
        products: tyreProds
      };
    }

    // 11. Generic Product Search match
    const matchingProds = products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.cat.toLowerCase().includes(q) || 
      p.desc.toLowerCase().includes(q)
    ).slice(0, 3);

    if (matchingProds.length > 0) {
      return {
        text: `🔍 I found <b>${matchingProds.length} high-spec spares</b> matching your query:`,
        products: matchingProds
      };
    }

    // Default intelligent fallback
    return {
      text: `🤖 <b>Your Wise Advice:</b><br>
        I specialize in all <b>25+ bike spares categories</b>, vehicle fitments (Yamaha, KTM, Royal Enfield, Bajaj, TVS, Honda), and mechanical diagnostics.<br><br>
        You can ask me things like:<br>
        • <i>"Which brake pads fit Duke 390?"</i><br>
        • <i>"Best engine oil for high revving engines"</i><br>
        • <i>"Track my order"</i><br>
        • <i>"Recommend suspension upgrades"</i>`,
      products: products.slice(0, 2)
    };
  },

  appendUserMessage(text) {
    const container = document.getElementById('wiseMessages');
    const msg = document.createElement('div');
    msg.className = 'wise-msg wise-msg-user';
    msg.innerHTML = `<div class="wise-bubble">${this.escapeHtml(text)}</div>`;
    container.appendChild(msg);
  },

  appendBotMessage(html, prods = []) {
    const container = document.getElementById('wiseMessages');
    const msg = document.createElement('div');
    msg.className = 'wise-msg wise-msg-bot';

    let prodsHtml = '';
    if (prods && prods.length > 0) {
      prodsHtml = `
        <div class="wise-prods-grid">
          ${prods.map(p => `
            <div class="wise-prod-card">
              <img src="${p.img}" onerror="this.src='${p.fallbackSvg}'" alt="${p.name}">
              <div class="wise-prod-details">
                <span class="wise-prod-cat">${p.cat}</span>
                <div class="wise-prod-name">${p.name}</div>
                <div class="wise-prod-pricing">
                  <b>₹${p.price.toLocaleString('en-IN')}</b>
                  <del>₹${p.mrp.toLocaleString('en-IN')}</del>
                  <span class="wise-prod-rate">★ ${p.rating}</span>
                </div>
                <div class="wise-prod-btns">
                  <button class="wise-btn-view" onclick="openProductQuickView(${p.id})">Details</button>
                  <button class="wise-btn-add" onclick="add(${p.id}); toast('Added ${p.name.replace(/'/g, "\\'")} to cart!')">Add to Cart</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    msg.innerHTML = `
      <div class="wise-bot-avatar">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#00e5ff" stroke-width="2">
          <rect x="3" y="11" width="18" height="10" rx="3" fill="#141c24"/>
          <circle cx="8.5" cy="16" r="1.5" fill="#00e5ff"/>
          <circle cx="15.5" cy="16" r="1.5" fill="#00e5ff"/>
          <path d="M12 2v5M8 7h8"/>
        </svg>
      </div>
      <div class="wise-bubble">
        ${html}
        ${prodsHtml}
      </div>
    `;

    container.appendChild(msg);
  },

  scrollToBottom() {
    const container = document.getElementById('wiseMessages');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  },

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
};

// Auto-initialize when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => YourWiseAI.init());
} else {
  YourWiseAI.init();
}
