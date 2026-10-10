// SHANJAY'S BIKE SPARES MART - 30 Comprehensive 4K Quality Products Catalog
// Includes specifications, bike compatibility, stock status, ratings and customer reviews

// Robust SVG icon generator for 100% reliable 4K graphic fallbacks
function makePartSvg(title, color = '#ff5500', iconType = 'gear') {
  let iconSvg = '';
  if (iconType === 'disc') {
    iconSvg = `<circle cx="100" cy="100" r="70" fill="none" stroke="${color}" stroke-width="8" stroke-dasharray="14 10"/>
               <circle cx="100" cy="100" r="35" fill="#161e26" stroke="${color}" stroke-width="5"/>
               <circle cx="100" cy="100" r="12" fill="${color}"/>
               <circle cx="100" cy="45" r="5" fill="#fff"/><circle cx="100" cy="155" r="5" fill="#fff"/>
               <circle cx="45" cy="100" r="5" fill="#fff"/><circle cx="155" cy="100" r="5" fill="#fff"/>`;
  } else if (iconType === 'chain') {
    iconSvg = `<rect x="35" y="85" width="40" height="30" rx="10" fill="none" stroke="${color}" stroke-width="6"/>
               <rect x="75" y="85" width="45" height="30" rx="10" fill="#1c242e" stroke="#00e5ff" stroke-width="6"/>
               <rect x="120" y="85" width="40" height="30" rx="10" fill="none" stroke="${color}" stroke-width="6"/>
               <circle cx="55" cy="100" r="6" fill="#fff"/><circle cx="95" cy="100" r="6" fill="#fff"/><circle cx="140" cy="100" r="6" fill="#fff"/>`;
  } else if (iconType === 'light') {
    iconSvg = `<circle cx="100" cy="100" r="50" fill="#131920" stroke="${color}" stroke-width="6"/>
               <path d="M100 45 L100 25 M140 60 L155 45 M155 100 L175 100 M140 140 L155 155 M100 155 L100 175 M60 140 L45 155 M45 100 L25 100 M60 60 L45 45" stroke="#00e5ff" stroke-width="4"/>
               <circle cx="100" cy="100" r="28" fill="${color}" opacity="0.8"/>
               <polygon points="95,85 108,100 96,102 104,118 90,103 100,100" fill="#fff"/>`;
  } else if (iconType === 'oil') {
    iconSvg = `<path d="M70 60 L130 60 L145 155 L55 155 Z" fill="#161e27" stroke="${color}" stroke-width="6"/>
               <rect x="85" y="40" width="30" height="20" fill="${color}" rx="4"/>
               <path d="M100 85 C85 105 85 125 100 135 C115 125 115 105 100 85 Z" fill="#ffb703"/>`;
  } else if (iconType === 'shock') {
    iconSvg = `<rect x="90" y="30" width="20" height="40" fill="${color}" rx="5"/>
               <path d="M85 70 Q115 78 85 86 Q115 94 85 102 Q115 110 85 118 Q115 126 85 134" fill="none" stroke="#00e5ff" stroke-width="8"/>
               <rect x="90" y="135" width="20" height="35" fill="${color}" rx="5"/>
               <circle cx="100" cy="170" r="8" fill="#fff"/>`;
  } else if (iconType === 'tyre') {
    iconSvg = `<circle cx="100" cy="100" r="65" fill="#11161d" stroke="#222b35" stroke-width="26"/>
               <circle cx="100" cy="100" r="40" fill="#0d1117" stroke="${color}" stroke-width="6"/>
               <circle cx="100" cy="100" r="18" fill="${color}"/>
               <path d="M90 35 L110 35 M90 165 L110 165 M35 90 L35 110 M165 90 L165 110" stroke="#ff8800" stroke-width="4"/>`;
  } else {
    iconSvg = `<circle cx="100" cy="100" r="45" fill="#161e27" stroke="${color}" stroke-width="6"/>
               <path d="M100 40 L100 50 M100 150 L100 160 M40 100 L50 100 M150 100 L160 100 M58 58 L65 65 M135 135 L142 142 M58 142 L65 135 M135 65 L142 58" stroke="${color}" stroke-width="12" stroke-linecap="round"/>
               <circle cx="100" cy="100" r="20" fill="#0d1117" stroke="#00e5ff" stroke-width="4"/>`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <defs>
      <linearGradient id="bgGrad_${iconType}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0a0e14"/>
        <stop offset="100%" stop-color="#141c24"/>
      </linearGradient>
    </defs>
    <rect width="200" height="200" fill="url(#bgGrad_${iconType})"/>
    <rect x="5" y="5" width="190" height="190" rx="12" fill="none" stroke="#232f3e" stroke-width="2"/>
    ${iconSvg}
    <text x="100" y="185" fill="#8899a6" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle" letter-spacing="1">GENUINE 4K OEM</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

const products = [
  // 1-4: BRAKING SYSTEMS
  {
    id: 1,
    name: "Brembo Ceramic Performance Front Brake Pads",
    cat: "Brakes",
    price: 1299,
    mrp: 1899,
    rating: 4.9,
    reviewsCount: 184,
    badge: "Best Seller",
    inStock: true,
    stockCount: 24,
    img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Brake Pads", "#ff5500", "disc"),
    compatibility: ["Yamaha R15 V3/V4", "Yamaha MT-15", "KTM Duke 200/250/390", "Bajaj Pulsar NS200", "TVS Apache RTR 200"],
    specs: { "Compound": "Sintered Ceramic Matrix", "Friction Coeff": "0.48 HH Grade", "Position": "Front Caliper", "Fade Temp": "Up to 650°C", "Warranty": "6 Months OEM" },
    desc: "Race-derived sintered ceramic brake pads providing sharp bite, zero brake fade under aggressive braking, and extended rotor longevity.",
    reviews: [
      { id: 101, author: "Vikram R.", bike: "Yamaha MT-15", rating: 5, date: "2026-03-12", title: "Phenomenal Stopping Power!", text: "Night and day difference compared to stock pads. Zero squeal and stops on a dime from 90 km/h.", verified: true },
      { id: 102, author: "Aditya S.", bike: "KTM Duke 390", rating: 5, date: "2026-02-28", title: "Worth every rupee", text: "Great initial bite without being overly grabby. Installed in 15 minutes.", verified: true },
      { id: 103, author: "Rahul Menon", bike: "Bajaj Pulsar NS200", rating: 4, date: "2026-01-14", title: "Solid upgrade", text: "Dust is minimal. Excellent wet weather performance.", verified: true }
    ]
  },
  {
    id: 2,
    name: "Steel Braided Front & Rear Brake Line Hose Kit",
    cat: "Brakes",
    price: 1499,
    mrp: 2199,
    rating: 4.8,
    reviewsCount: 92,
    badge: "Racing Spec",
    inStock: true,
    stockCount: 15,
    img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Brake Lines", "#00e5ff", "disc"),
    compatibility: ["KTM Duke 200/250/390", "KTM RC 390", "Yamaha R15 V4", "Bajaj Dominar 400"],
    specs: { "Core": "PTFE Teflon Inner", "Sheath": "304 Stainless Steel Braid", "Banjo Bolts": "Anodized Red Aluminum", "Burst Pressure": "12,000 PSI", "Warranty": "1 Year" },
    desc: "Eliminates lever sponginess by preventing hydraulic hose expansion under high pressure. Delivers direct tactile brake feel.",
    reviews: [
      { id: 104, author: "Karthik N.", bike: "KTM Duke 390", rating: 5, date: "2026-03-05", title: "Completely eliminated spongy lever", text: "Firm lever feedback during high-speed highway braking. Premium finish on the banjo fittings.", verified: true },
      { id: 105, author: "Suresh P.", bike: "Yamaha R15 V4", rating: 4, date: "2026-02-10", title: "Good quality lines", text: "Fitment is precise. Make sure to bleed thoroughly.", verified: true }
    ]
  },
  {
    id: 3,
    name: "300mm Oversized Wave Floating Front Brake Rotor",
    cat: "Brakes",
    price: 2899,
    mrp: 3999,
    rating: 4.9,
    reviewsCount: 67,
    badge: "Top Rated",
    inStock: true,
    stockCount: 8,
    img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Floating Rotor", "#ff5500", "disc"),
    compatibility: ["Royal Enfield Classic 350", "Royal Enfield Hunter 350", "Royal Enfield Meteor 350", "Himalayan 411/450"],
    specs: { "Outer Ring": "SUS420 High Carbon Stainless", "Carrier": "CNC 6061-T6 Billet", "Float Pins": "Titanium Rivets", "Diameter": "300mm (5mm Thk)", "Warranty": "1 Year" },
    desc: "Full floating disc rotor dissipates heat faster and prevents rotor warping during aggressive mountain descents or touring.",
    reviews: [
      { id: 106, author: "Manish Joshi", bike: "Royal Enfield Classic 350", rating: 5, date: "2026-03-18", title: "Massive improvement over stock disc", text: "Transformed braking on my heavy Classic 350. Looks stunning with the black carrier hub.", verified: true }
    ]
  },
  {
    id: 4,
    name: "Radial Master Brake Cylinder with Reservoir",
    cat: "Brakes",
    price: 2199,
    mrp: 3100,
    rating: 4.7,
    reviewsCount: 115,
    badge: "Pro Tuning",
    inStock: true,
    stockCount: 18,
    img: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Master Cylinder", "#00e5ff", "disc"),
    compatibility: ["All Bikes with 22mm (7/8\") Handlebars", "KTM Duke", "Yamaha MT-15", "Pulsar NS200", "Apache RTR 200"],
    specs: { "Piston Size": "17.5mm Forged Radial", "Lever": "Foldable CNC Alloy with Reach Dial", "Reservoir": "Smoked Polycarbonate 45ml", "Mirror Mount": "M10 Clockwise", "Warranty": "6 Months" },
    desc: "True radial pump design translates your fingers' hydraulic effort straight into caliper clamping pressure with adjustable span.",
    reviews: [
      { id: 107, author: "Deepak Chawla", bike: "Apache RTR 200", rating: 5, date: "2026-02-20", title: "Incredible modulation", text: "Gives one-finger braking confidence on the track and in traffic.", verified: true }
    ]
  },

  // 5-8: DRIVE CHAIN & TRANSMISSION
  {
    id: 5,
    name: "D.I.D 520 Professional O-Ring Gold Drive Chain (120L)",
    cat: "Drive & Chain",
    price: 2499,
    mrp: 3499,
    rating: 4.9,
    reviewsCount: 210,
    badge: "Best Seller",
    inStock: true,
    stockCount: 30,
    img: "https://images.unsplash.com/photo-1558981854-399676c8c495?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Gold Chain", "#ffb703", "chain"),
    compatibility: ["KTM Duke 200/250/390", "Bajaj Dominar 400", "Yamaha R15 V3/V4", "Suzuki Gixxer 250"],
    specs: { "Pitch": "520", "Link Count": "120 Links (Pre-greased)", "Seal Type": "Patented X-Ring/O-Ring", "Plate Finish": "Triple Gold Plated", "Tensile Strength": "8,210 lbs" },
    desc: "Japanese engineering built for high-torque motorcycles. Retains factory lubrication 4x longer than non-sealed chains.",
    reviews: [
      { id: 108, author: "Gaurav Verma", bike: "KTM Duke 250", rating: 5, date: "2026-03-24", title: "Gold finish looks royal!", text: "Super quiet operation. Didn't need slack adjustment even after 1,500 km.", verified: true },
      { id: 109, author: "Naveen K.", bike: "Bajaj Dominar 400", rating: 5, date: "2026-01-30", title: "Handles heavy touring effortlessly", text: "Best chain in the market. The master link is easy to rivet.", verified: true }
    ]
  },
  {
    id: 6,
    name: "Rolon Brass-Coated Chain & Sprocket Heavy-Duty Kit",
    cat: "Drive & Chain",
    price: 1899,
    mrp: 2599,
    rating: 4.8,
    reviewsCount: 340,
    badge: "OEM Genuine",
    inStock: true,
    stockCount: 42,
    img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Sprocket Kit", "#ff5500", "chain"),
    compatibility: ["Yamaha R15 V3/V4", "Yamaha MT-15 V1/V2", "Yamaha FZ-25"],
    specs: { "Front Sprocket": "14T SCM420 Chromoly", "Rear Sprocket": "48T High Carbon Steel", "Chain Type": "Brass Plated O-Ring 428-128L", "Warranty": "10,000 KM Warranty" },
    desc: "Complete matched gearing set manufactured to exact OEM tolerances. Ensures smooth throttle roll-on and reduced drivetrain lash.",
    reviews: [
      { id: 110, author: "Praveen Kumar", bike: "Yamaha R15 V4", rating: 5, date: "2026-03-01", title: "Original Rolon kit, smooth like butter", text: "Vibrations reduced significantly. Genuine packaging with hologram.", verified: true }
    ]
  },
  {
    id: 7,
    name: "CNC Billet Lightweight Racing Rear Sprocket 45T",
    cat: "Drive & Chain",
    price: 1699,
    mrp: 2399,
    rating: 4.7,
    reviewsCount: 58,
    badge: "Racing Spec",
    inStock: true,
    stockCount: 11,
    img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Rear Sprocket", "#00e5ff", "chain"),
    compatibility: ["KTM Duke 390", "KTM RC 390", "KTM Adventure 390"],
    specs: { "Teeth": "45T", "Material": "7075-T6 Aerospace Aluminum", "Weight Savings": "66% Lighter than OEM steel", "Anodizing": "Hard Anodized Orange", "Pitch": "520" },
    desc: "Cuts rotational unsprung mass on the rear wheel, enhancing instantaneous acceleration and suspension compliance.",
    reviews: [
      { id: 111, author: "Mohit Tanwar", bike: "KTM Duke 390", rating: 5, date: "2026-02-14", title: "Noticeable boost in low end pickup", text: "Shaves substantial weight off the wheel. The orange match with Duke frame is 10/10.", verified: true }
    ]
  },
  {
    id: 8,
    name: "FCC Kevlar Reinforced Performance Clutch Plate Set",
    cat: "Drive & Chain",
    price: 1599,
    mrp: 2200,
    rating: 4.8,
    reviewsCount: 142,
    badge: "High Endurance",
    inStock: true,
    stockCount: 20,
    img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Clutch Plates", "#ff5500", "gear"),
    compatibility: ["Bajaj Pulsar NS200", "Bajaj RS200", "Bajaj Dominar 400", "KTM Duke 200"],
    specs: { "Friction Material": "DuPont Kevlar Infused Composite", "Number of Plates": "6 Friction + 5 Steel Drive Plates", "Oil Compatibility": "JASO MA / MA2 Wet Clutch", "Warranty": "6 Months" },
    desc: "High-friction Kevlar blend resists glazing and slip under hard launches and spirited downshifts without overheating.",
    reviews: [
      { id: 112, author: "Sanjay Dev", bike: "Bajaj Pulsar NS200", rating: 5, date: "2026-03-10", title: "Clutch slippage gone completely!", text: "My bike was slipping in 5th and 6th gear. This set fixed it completely, launch feels super punchy.", verified: true }
    ]
  },
  {
    id: 9,
    name: "Assist & Slipper Clutch Hub & Spring Conversion Kit",
    cat: "Drive & Chain",
    price: 4499,
    mrp: 5999,
    rating: 4.9,
    reviewsCount: 43,
    badge: "Pro Upgrade",
    inStock: true,
    stockCount: 6,
    img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Slipper Clutch", "#00e5ff", "gear"),
    compatibility: ["Yamaha R15 V2/V3", "Yamaha MT-15 V1", "FZ25"],
    specs: { "Mechanism": "Assist Ramps with Back-Torque Limiter", "Lever Effort": "35% Lighter Pull", "Springs": "Heavy Duty Progressive", "Hardware": "Case-Hardened Hub & Pressure Plate" },
    desc: "Prevents aggressive rear-wheel lockups and wheel hop during emergency multi-gear downshifts, giving track-grade control.",
    reviews: [
      { id: 113, author: "Chetan Rao", bike: "Yamaha R15 V3", rating: 5, date: "2026-01-22", title: "No more wheel hop during hard downshifts!", text: "Very easy to modulate in traffic and corner entries feel rock stable.", verified: true }
    ]
  },

  // 10-14: ELECTRICAL & LIGHTING
  {
    id: 10,
    name: "Philips Ultinon 6000K Dual Beam LED Headlamp H4",
    cat: "Electrical",
    price: 1399,
    mrp: 1999,
    rating: 4.9,
    reviewsCount: 520,
    badge: "Best Seller",
    inStock: true,
    stockCount: 55,
    img: "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("LED Headlight", "#00e5ff", "light"),
    compatibility: ["Royal Enfield Classic/Bullet 350", "Bajaj Pulsar 150/180/220", "TVS Apache RTR", "Honda CB350", "All H4 Base Bikes"],
    specs: { "Color Temp": "6000K Crisp Cool White", "Lumen Output": "4,500 Lumens / Bulb", "Cooling": "AirFlux Active Copper Fan", "Lifespan": "30,000+ Hours", "Voltage": "12V DC" },
    desc: "Ultra-sharp cut-off beam pattern lights up dark highways up to 180 meters ahead without blinding oncoming traffic.",
    reviews: [
      { id: 114, author: "Anand M.", bike: "Royal Enfield Bullet 350", rating: 5, date: "2026-03-21", title: "Insane night illumination!", text: "Stock halogen was like a candle. This Philips LED is like daytime on mountain roads.", verified: true },
      { id: 115, author: "Vignesh K.", bike: "TVS Apache RTR 160", rating: 5, date: "2026-02-15", title: "Plug and play, sharp cutoff line", text: "Zero battery drain issues. Excellent cooling fan.", verified: true }
    ]
  },
  {
    id: 11,
    name: "Sequential Matrix Flowing LED Indicator Turn Signals (4 Pcs)",
    cat: "Electrical",
    price: 899,
    mrp: 1499,
    rating: 4.7,
    reviewsCount: 312,
    badge: "Top Rated",
    inStock: true,
    stockCount: 40,
    img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Flowing Indicators", "#ff5500", "light"),
    compatibility: ["All Motorcycles (10mm Universal Stud Mount)", "KTM Duke", "Yamaha MT-15", "Pulsar NS200", "Royal Enfield Hunter"],
    specs: { "Lighting Effect": "Dynamic Flowing Amber Scan", "Waterproof Rating": "IP68 Submersible Sealed", "Material": "Flexible High-Elasticity Rubber Stem", "Chips": "12 SMD High-Brightness LEDs per unit" },
    desc: "Audi-style flowing amber sequential LED indicators with vibration-absorbing bendable rubber mounts that resist accidental snaps.",
    reviews: [
      { id: 116, author: "Harish Pillai", bike: "Yamaha MT-15", rating: 5, date: "2026-03-08", title: "Looks super premium", text: "Bright daylight visibility and the flowing animation looks high-tech.", verified: true }
    ]
  },
  {
    id: 12,
    name: "Amaron Pro Rider 12V 9Ah VRLA Maintenance-Free Battery",
    cat: "Electrical",
    price: 2299,
    mrp: 2999,
    rating: 4.9,
    reviewsCount: 410,
    badge: "OEM Genuine",
    inStock: true,
    stockCount: 22,
    img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("12V Battery", "#10b981", "light"),
    compatibility: ["Royal Enfield Classic/Hunter/Meteor 350", "Bajaj Dominar 400", "KTM 390 Adventure", "Himalayan 411"],
    specs: { "Capacity": "12V 9Ah (ETZ-9R)", "Technology": "Silver X-Alloy Plate Technology", "Cold Cranking Amps": "140 CCA", "Warranty": "48 Months (24M Replacement + 24M Pro-rata)" },
    desc: "Factory sealed zero-maintenance motorcycle battery with high cranking amps for instant self-starts in freezing winter mornings.",
    reviews: [
      { id: 117, author: "Suraj Balan", bike: "Royal Enfield Classic 350", rating: 5, date: "2026-03-02", title: "Starts on the very first crank!", text: "Old battery died on cold mornings. Amaron cranked the heavy 350 engine effortlessly.", verified: true }
    ]
  },
  {
    id: 13,
    name: "NGK Laser Iridium High-Performance Spark Plug CR9EIX",
    cat: "Electrical",
    price: 699,
    mrp: 999,
    rating: 4.8,
    reviewsCount: 630,
    badge: "Best Seller",
    inStock: true,
    stockCount: 60,
    img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Spark Plug", "#00e5ff", "light"),
    compatibility: ["Yamaha R15 V3/V4", "Yamaha MT-15", "KTM Duke 200/250/390", "Suzuki Gixxer SF 250"],
    specs: { "Electrode": "0.6mm Ultra-Fine Laser Welded Iridium", "Trivalent Plating": "Anti-Corrosion / Anti-Seize", "Heat Range": "9", "Lifespan": "40,000 KM" },
    desc: "Ultra-thin iridium center tip concentrates electrical voltage, providing clean flame kernel propagation and crisper throttle response.",
    reviews: [
      { id: 118, author: "Tanmay B.", bike: "Yamaha MT-15", rating: 5, date: "2026-02-18", title: "Idle stabilized immediately", text: "Cold start hesitation vanished and mileage improved by roughly 2 kmpl.", verified: true }
    ]
  },
  {
    id: 14,
    name: "Denso Twin Tone Waterproof Snail Horn Set 12V",
    cat: "Electrical",
    price: 799,
    mrp: 1199,
    rating: 4.8,
    reviewsCount: 280,
    badge: "Safety Spec",
    inStock: true,
    stockCount: 35,
    img: "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Twin Horn", "#ff5500", "light"),
    compatibility: ["Universal for all 12V Motorcycle Models", "Royal Enfield", "KTM", "Bajaj", "Honda", "TVS"],
    specs: { "Sound Level": "110 dB Dual Tone (400Hz + 480Hz)", "Current Draw": "4A per horn", "Water Resistance": "Hydrophobic Filter Mesh", "Includes": "Mounting Brackets & Relay Harness" },
    desc: "Commanding twin-tone harmonic sound creates authoritative presence on highways and busy city traffic without deafening vibration.",
    reviews: [
      { id: 119, author: "Sunil Nair", bike: "Honda H'ness CB350", rating: 5, date: "2026-03-14", title: "Loud, clear and authoritative", text: "Drivers actually pay attention when this sounds. High quality build.", verified: true }
    ]
  },

  // 15-19: ENGINE, SERVICE & PERFORMANCE
  {
    id: 15,
    name: "BMC Washable Multi-Layer Cotton Air Filter",
    cat: "Engine & Service",
    price: 2999,
    mrp: 3999,
    rating: 4.9,
    reviewsCount: 195,
    badge: "Italian Race Tech",
    inStock: true,
    stockCount: 14,
    img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Air Filter", "#ff5500", "oil"),
    compatibility: ["KTM Duke 390 (2017-2024)", "KTM RC 390", "KTM Adventure 390"],
    specs: { "Material": "Epoxy-Coated Alloy Mesh + Oiled Cotton Gauze", "Filtration": "Down to 7 Microns", "Airflow Gain": "+42% Higher CFM than paper", "Maintenance": "Clean and re-oil every 15,000 KM" },
    desc: "Italian championship proven filter. Improves intake velocity and intake growl without letting hazardous dust particles into cylinders.",
    reviews: [
      { id: 120, author: "Rajesh S.", bike: "KTM Duke 390", rating: 5, date: "2026-03-25", title: "Rev climbs much faster past 6000 RPM", text: "Dramatically improves intake sound and top-end punch. Reusable forever.", verified: true }
    ]
  },
  {
    id: 16,
    name: "Motul 7100 10W-50 4T 100% Synthetic Ester Engine Oil (1.5L)",
    cat: "Engine & Service",
    price: 1450,
    mrp: 1850,
    rating: 5.0,
    reviewsCount: 890,
    badge: "Best Seller",
    inStock: true,
    stockCount: 48,
    img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Motul 7100", "#ff0033", "oil"),
    compatibility: ["All 4-Stroke High Performance Motorcycles", "KTM Duke/RC", "Yamaha R15/MT15", "Bajaj Dominar", "Royal Enfield 350/650"],
    specs: { "Viscosity": "10W-50", "Base Stock": "100% Synthetic with Ester Technology", "Standards": "API SN / JASO MA2 Certified", "Volume": "1.5 Liters Sealed Bottle" },
    desc: "Ester core formulation provides superior shear resistance, velvet-smooth gearbox shifting, and maximum thermal protection at redline.",
    reviews: [
      { id: 121, author: "Kishore Kumar", bike: "KTM 390 Adventure", rating: 5, date: "2026-03-29", title: "The gold standard for motorcycle oil", text: "Shifts are silky smooth, engine runs 4 degrees cooler in heavy bumper to bumper traffic.", verified: true },
      { id: 122, author: "Arun V.", bike: "Royal Enfield Hunter 350", rating: 5, date: "2026-02-27", title: "Engine feels refined", text: "Tappet clatter significantly reduced. 100% genuine sealed bottle.", verified: true }
    ]
  },
  {
    id: 17,
    name: "K&N High Performance Oil Filter with 17mm Nut (KN-155)",
    cat: "Engine & Service",
    price: 599,
    mrp: 850,
    rating: 4.9,
    reviewsCount: 340,
    badge: "OEM Genuine",
    inStock: true,
    stockCount: 38,
    img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Oil Filter", "#00e5ff", "oil"),
    compatibility: ["KTM Duke 200/250/390", "Bajaj Dominar 400", "Husqvarna Svartpilen/Vitpilen 250/401"],
    specs: { "Media": "Resin-Impregnated Microglass Media", "Relief Valve": "Silicone Anti-Drainback Valve", "Canister": "Heavy Gauge Steel", "Feature": "Welded 17mm Hex Nut for easy wrench removal" },
    desc: "Traps 99% of harmful microscopic metallic particulates with high flow rate capacity during cold oil starts.",
    reviews: [
      { id: 123, author: "Raghuveer P.", bike: "Bajaj Dominar 400", rating: 5, date: "2026-03-04", title: "Removal nut is a game changer", text: "No more struggling with chain wrenches in tight spaces. Perfect oil pressure.", verified: true }
    ]
  },
  {
    id: 18,
    name: "Smart Plug & Play Electronic Quickshifter Sensor Kit",
    cat: "Engine & Service",
    price: 5499,
    mrp: 7499,
    rating: 4.8,
    reviewsCount: 74,
    badge: "Track Ready",
    inStock: true,
    stockCount: 7,
    img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Quickshifter", "#ff5500", "gear"),
    compatibility: ["Yamaha MT-15 V1/V2", "Yamaha R15 V3", "KTM Duke 200/250", "Bajaj Pulsar NS200"],
    specs: { "Sensor": "Load Cell Strain Gauge (Push/Pull)", "Kill Times": "Pre-Mapped RPM Dependent (45ms-65ms)", "Wiring": "OEM Coil Tap Connectors (No Wire Splicing)", "Enclosure": "Billet Waterproof" },
    desc: "Upshift under full throttle without clutching or rolling off. Cuts ignition for milliseconds to slot the next gear seamlessly.",
    reviews: [
      { id: 124, author: "Zaid Khan", bike: "Yamaha MT-15", rating: 5, date: "2026-02-11", title: "Bang for buck quickshifter!", text: "Full throttle upshifts sound like a Moto3 machine. Plugs directly into the ignition coil.", verified: true }
    ]
  },
  {
    id: 19,
    name: "Stainless Steel Free-Flow Performance Header Pipe",
    cat: "Engine & Service",
    price: 3799,
    mrp: 4999,
    rating: 4.7,
    reviewsCount: 86,
    badge: "Power Boost",
    inStock: true,
    stockCount: 9,
    img: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Header Pipe", "#00e5ff", "oil"),
    compatibility: ["Royal Enfield Hunter 350", "Royal Enfield Classic 350 Reborn", "Meteor 350"],
    specs: { "Material": "Grade 304 Polished Stainless Steel", "Bends": "Mandrel Bent Smooth Internal Radius", "Weight": "2.2 kg (1.8 kg lighter than OEM)", "Oxygen Sensor": "Pre-welded M18 O2 Bung" },
    desc: "Uncorks the J-series engine breathing, reducing catalytic converter back-heat and delivering a bassy, thumping exhaust note.",
    reviews: [
      { id: 125, author: "Nikhil Joshi", bike: "Royal Enfield Hunter 350", rating: 5, date: "2026-03-19", title: "Exquisite thumping sound!", text: "Engine runs noticeably cooler on the highway and the stainless rainbow heat-tint looks fantastic.", verified: true }
    ]
  },

  // 20-22: SUSPENSION & HANDLING
  {
    id: 20,
    name: "Gabriel Adjustable Nitrogen Gas Monoshock Damper",
    cat: "Suspension",
    price: 3899,
    mrp: 5200,
    rating: 4.8,
    reviewsCount: 112,
    badge: "Comfort Pro",
    inStock: true,
    stockCount: 12,
    img: "https://images.unsplash.com/photo-1558981854-399676c8c495?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Monoshock", "#00e5ff", "shock"),
    compatibility: ["TVS Apache RTR 160/200 4V", "Bajaj Pulsar NS200", "Yamaha FZ-S V3"],
    specs: { "Type": "High Pressure Nitrogen Emulsion Damper", "Preload": "7-Step Spanner Adjustable", "Piston Rod": "14mm Hard Chrome Plated", "Eye-to-Eye": "295mm Center-to-Center", "Warranty": "1 Year" },
    desc: "Eliminates high-speed rear bounce and harsh pothole bottoming-out when riding solo or with a pillion.",
    reviews: [
      { id: 126, author: "Vinay R.", bike: "TVS Apache RTR 200", rating: 5, date: "2026-03-07", title: "Rides like a luxury bike over bad roads", text: "Back pain on bad roads is gone. High-speed cornering stability is night and day.", verified: true }
    ]
  },
  {
    id: 21,
    name: "CNC Billet Front Fork Preload Cap Adjusters Pair",
    cat: "Suspension",
    price: 1199,
    mrp: 1699,
    rating: 4.6,
    reviewsCount: 88,
    badge: "Tuning Essential",
    inStock: true,
    stockCount: 16,
    img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Preload Caps", "#ff5500", "shock"),
    compatibility: ["Yamaha R15 V3/V4", "Yamaha MT-15", "KTM Duke 200 (Non-inverted)"],
    specs: { "Adjustment Range": "Up to 20mm Spring Compression", "Material": "T6061 Hard Anodized Alloy", "Seals": "Dual Nitrile O-Rings", "Colors": "Racing Blue & Racing Orange" },
    desc: "Allows rider to dial in front fork spring sag according to bodyweight and track or touring luggage load without disassembling forks.",
    reviews: [
      { id: 127, author: "Aakash Mehta", bike: "Yamaha R15 V4", rating: 5, date: "2026-02-05", title: "Cured excessive front nose dive", text: "Dialed in 4 clicks of preload. Front brake dive under hard stops is substantially reduced.", verified: true }
    ]
  },
  {
    id: 22,
    name: "All Balls Heavy-Duty Tapered Steering Head Cone Bearing Kit",
    cat: "Suspension",
    price: 1299,
    mrp: 1799,
    rating: 4.9,
    reviewsCount: 96,
    badge: "Zero Wobble",
    inStock: true,
    stockCount: 20,
    img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Cone Bearings", "#10b981", "gear"),
    compatibility: ["Royal Enfield Classic/Bullet/Himalayan", "KTM Duke 200/250/390", "Bajaj Pulsar 200NS/RS"],
    specs: { "Bearing Type": "Tapered Roller Bearings (Upgraded from OEM ball cages)", "Race Finish": "Precision Ground High Carbon Steel", "Dust Seals": "Double Lip Nitrile Rubber", "Grease": "High Temp Molybdenum Packed" },
    desc: "Replaces sloppy ball bearings with tapered rollers that distribute handlebar loads over wide contact patches, curing high-speed head wobble.",
    reviews: [
      { id: 128, author: "Girish Pillai", bike: "Royal Enfield Bullet 350", rating: 5, date: "2026-01-19", title: "Handlebar shimmy completely gone!", text: "Steering feels tight, buttery smooth and precision accurate on the highway.", verified: true }
    ]
  },

  // 23-25: TYRES & WHEELS
  {
    id: 23,
    name: "Michelin Pilot Street 2 Radial Rear Tyre 140/70-17",
    cat: "Tyres & Wheels",
    price: 3999,
    mrp: 5200,
    rating: 4.9,
    reviewsCount: 430,
    badge: "Best Seller",
    inStock: true,
    stockCount: 19,
    img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Rear Tyre", "#ff5500", "tyre"),
    compatibility: ["KTM Duke 200/250", "Bajaj Dominar 400", "Yamaha R15 V3/V4", "Suzuki Gixxer 250"],
    specs: { "Size": "140/70 R17 66S Tubeless", "Tread Pattern": "Progressive Water Grooves", "Compound": "Silica-Enriched Dual Compound", "Max Speed Rating": "180 km/h (S Rating)" },
    desc: "Legendary wet and dry cornering adhesion. Progressive tread grooves channel monsoon rainwater away from contact patch rapidly.",
    reviews: [
      { id: 129, author: "Rohan Sawant", bike: "KTM Duke 200", rating: 5, date: "2026-03-22", title: "Unreal confidence in heavy rain", text: "Zero slips over wet painted lines and tar patches. Leans into corners intuitively.", verified: true },
      { id: 130, author: "Deepesh M.", bike: "Yamaha R15 V4", rating: 5, date: "2026-02-12", title: "Great grip and longevity", text: "Running for 6000 km now, minimal wear visible.", verified: true }
    ]
  },
  {
    id: 24,
    name: "Pirelli Diablo Rosso Sport Front Tyre 110/70-17",
    cat: "Tyres & Wheels",
    price: 3499,
    mrp: 4600,
    rating: 4.9,
    reviewsCount: 260,
    badge: "Super Grip",
    inStock: true,
    stockCount: 15,
    img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Front Tyre", "#00e5ff", "tyre"),
    compatibility: ["Yamaha R15/MT-15", "KTM Duke/RC 200/390", "TVS Apache RR310", "Honda CB300R"],
    specs: { "Size": "110/70 - 17 54S Tubeless", "Crown Profile": "WSBK Racing Derived Contour", "Carcass": "High Density Rayon Plies", "Grip Level": "Extreme Dry & Wet Cornering" },
    desc: "Derived straight from World Superbike technology. Sharp crown profile drops the bike into turns with telepathic agility.",
    reviews: [
      { id: 131, author: "Varun Nair", bike: "TVS Apache RR310", rating: 5, date: "2026-03-15", title: "Apex hunting is effortless", text: "Front end feels glued to the tarmac under aggressive braking and tip-in.", verified: true }
    ]
  },
  {
    id: 25,
    name: "90-Degree CNC Aluminum Tubeless Tyre Air Valve Stems Pair",
    cat: "Tyres & Wheels",
    price: 449,
    mrp: 699,
    rating: 4.8,
    reviewsCount: 175,
    badge: "Convenience",
    inStock: true,
    stockCount: 50,
    img: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Valve Stems", "#ffb703", "tyre"),
    compatibility: ["All Motorcycles with Tubeless Alloy Wheels (11.3mm Rim Hole)", "Universal Fit"],
    specs: { "Material": "CNC Forged 6061 Alloy", "Angle": "90-Degree Right Angle", "Seal": "EPDM Rubber Base Washer", "Cap": "O-Ring Sealed Dust Cap" },
    desc: "Solves the frustration of filling air on bikes with large brake discs. Easy access for every petrol station air nozzle.",
    reviews: [
      { id: 132, author: "Manoj S.", bike: "Royal Enfield Meteor 350", rating: 5, date: "2026-03-01", title: "No more wrestling with air filling hoses!", text: "Makes checking tyre pressure a 10 second job. Leak-free seal.", verified: true }
    ]
  },

  // 26-30: CONTROLS & BODY PROTECTION
  {
    id: 26,
    name: "CNC 6-Way Adjustable Folding Brake & Clutch Levers Pair",
    cat: "Controls & Body",
    price: 1299,
    mrp: 1999,
    rating: 4.8,
    reviewsCount: 310,
    badge: "Best Seller",
    inStock: true,
    stockCount: 32,
    img: "https://images.unsplash.com/photo-1558981854-399676c8c495?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Billet Levers", "#ff5500", "gear"),
    compatibility: ["KTM Duke & RC 200/250/390", "Yamaha R15 V3/V4", "Yamaha MT-15", "Bajaj Pulsar NS200"],
    specs: { "Adjustment": "6-Position Click Dial Span", "Safety Feature": "90° Pivot Folding Upwards on Drop", "Material": "T6-6061 Billet Aluminum", "Anodize": "UV Fade Resistant Black & Orange" },
    desc: "Shorty ergonomic levers fold upwards if the bike tips over, avoiding snapping. Dial-in lever distance for any hand size.",
    reviews: [
      { id: 133, author: "Akshay K.", bike: "KTM Duke 250", rating: 5, date: "2026-03-16", title: "Custom reach feels ergonomic", text: "Dropped my bike in parking once, lever folded up instead of snapping! Saved my ride.", verified: true }
    ]
  },
  {
    id: 27,
    name: "Renthal Kevlar Dual-Compound Anti-Vibe Handlebar Grips",
    cat: "Controls & Body",
    price: 899,
    mrp: 1399,
    rating: 4.9,
    reviewsCount: 220,
    badge: "Rider Favorite",
    inStock: true,
    stockCount: 45,
    img: "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Handle Grips", "#00e5ff", "gear"),
    compatibility: ["Universal for all 22mm (7/8\") Handlebars", "All Motorcycle Brands"],
    specs: { "Material": "Kevlar Resin Infused Elastomer", "Texture": "Diamond Full-Waffle Grid", "Length": "120mm Open End", "Safety Wire Grooves": "Triple Integrated Wire Slots" },
    desc: "Absorbs harsh high-frequency engine buzz that causes wrist numbness on long highway road trips.",
    reviews: [
      { id: 134, author: "Rohit Deshmukh", bike: "Royal Enfield Classic 350", rating: 5, date: "2026-02-23", title: "Vibrations to hands drastically cut down", text: "Toured 400 km in one stretch without palm fatigue. Sticky grip even with wet gloves.", verified: true }
    ]
  },
  {
    id: 28,
    name: "CNC Billet Bar-End Anti-Glare Blue Convex Mirrors Pair",
    cat: "Controls & Body",
    price: 1399,
    mrp: 2100,
    rating: 4.7,
    reviewsCount: 185,
    badge: "Cafe Racer Style",
    inStock: true,
    stockCount: 28,
    img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Bar-End Mirrors", "#00e5ff", "gear"),
    compatibility: ["Universal for 13mm to 18mm Internal Bar Diameters", "All Naked & Street Motorcycles"],
    specs: { "Glass": "Anti-Dazzle Blue Tinted Optical Convex", "Field of View": "120° Wide Angle", "Body": "Solid Heavy Billet Aluminum", "Swivel": "360° Ball Joint Multi-Angle Position" },
    desc: "Cleans up the front silhouette of naked streetfighters while eliminating blind spots and headlight high-beam glare from cars behind.",
    reviews: [
      { id: 135, author: "Pradeep Raj", bike: "Yamaha MT-15 V2", rating: 5, date: "2026-03-11", title: "No vibration blur at 100 km/h!", text: "Stock mirrors used to buzz and blur. These stay rock steady and blue tint kills SUV high beams.", verified: true }
    ]
  },
  {
    id: 29,
    name: "Heavy-Duty CNC Aircraft Aluminum Frame Slider Crash Guards",
    cat: "Controls & Body",
    price: 2199,
    mrp: 2999,
    rating: 4.8,
    reviewsCount: 140,
    badge: "Chassis Guard",
    inStock: true,
    stockCount: 17,
    img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Frame Sliders", "#ff5500", "gear"),
    compatibility: ["KTM Duke 200/250/390", "Bajaj Pulsar NS200", "Yamaha MT-15"],
    specs: { "Puck Material": "High-Density Self-Lubricating POM Delrin", "Mounting Base": "CNC T6 Aluminum Bracket", "Bolts": "Grade 10.9 High Tensile Steel", "Installation": "Direct Engine Mount Bolt-on" },
    desc: "Absorbs crash kinetic energy and slides on tarmac during low-sides, preventing costly engine crankcase and chassis damage.",
    reviews: [
      { id: 136, author: "Dhanush G.", bike: "KTM Duke 390", rating: 5, date: "2026-03-03", title: "Saved my engine block!", text: "Had an unfortunate slip on gravel. Slider took the brunt and saved my fairing and tank.", verified: true }
    ]
  },
  {
    id: 30,
    name: "Heavy-Duty Aluminum Engine Sump Bash Plate Guard",
    cat: "Controls & Body",
    price: 2699,
    mrp: 3599,
    rating: 4.9,
    reviewsCount: 165,
    badge: "Touring Guard",
    inStock: true,
    stockCount: 14,
    img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    fallbackSvg: makePartSvg("Bash Plate", "#00e5ff", "gear"),
    compatibility: ["Royal Enfield Himalayan 411/450", "Royal Enfield Scram 411", "Royal Enfield Hunter/Classic 350"],
    specs: { "Plate Thickness": "4mm Marine Grade 5052 Aluminum", "Venting": "Laser-Cut Air Vents for Exhaust Flow", "Finish": "Shot-Blasted Matte Powdercoat", "Mounting": "Rubber Vibration Dampened Brackets" },
    desc: "Armor for your oil filter and crankcase. Deflects flying stones, curbs, and rocks during off-road trail riding.",
    reviews: [
      { id: 137, author: "Abhishek Bhatt", bike: "Royal Enfield Himalayan", rating: 5, date: "2026-03-20", title: "Bulletproof protection for Ladakh trails", text: "Took multiple rock strikes with zero damage to the engine cases. Fitment was flawless.", verified: true }
    ]
  }
];

// LocalStorage reviews state helper
function getProductReviews(productId) {
  const customReviews = JSON.parse(localStorage.getItem('bsm_custom_reviews') || '{}');
  const baseProd = products.find(p => p.id === productId);
  if (!baseProd) return [];
  const extra = customReviews[productId] || [];
  return [...extra, ...(baseProd.reviews || [])];
}

function calculateAverageRating(productId) {
  const allRev = getProductReviews(productId);
  if (!allRev.length) return { rating: 5.0, count: 0 };
  const sum = allRev.reduce((acc, r) => acc + Number(r.rating || 5), 0);
  return {
    rating: Number((sum / allRev.length).toFixed(1)),
    count: allRev.length
  };
}

// Add user submitted review
function addProductReview(productId, reviewObj) {
  const customReviews = JSON.parse(localStorage.getItem('bsm_custom_reviews') || '{}');
  if (!customReviews[productId]) {
    customReviews[productId] = [];
  }
  customReviews[productId].unshift({
    id: Date.now(),
    date: new Date().toISOString().split('T')[0],
    verified: true,
    ...reviewObj
  });
  localStorage.setItem('bsm_custom_reviews', JSON.stringify(customReviews));
  
  // Update local memory product rating
  const stats = calculateAverageRating(productId);
  const p = products.find(x => x.id === productId);
  if (p) {
    p.rating = stats.rating;
    p.reviewsCount = stats.count;
  }
  return stats;
}