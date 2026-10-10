// BIKE SPARES MART - User Authentication & Session Management
// Handles Sign In, Register, Demo Accounts, Garage Bike Preferences & State Persistence

let currentUser = JSON.parse(localStorage.getItem('bsm_user') || 'null');

// Fallback to existing user key if present
if (!currentUser && localStorage.user) {
  currentUser = {
    name: localStorage.user.split('@')[0].toUpperCase(),
    email: localStorage.user,
    bike: "Yamaha MT-15 V2",
    phone: "9876543210",
    city: "Bangalore",
    address: "#42, 5th Cross, Indiranagar",
    pin: "560038",
    martCoins: 450
  };
  localStorage.setItem('bsm_user', JSON.stringify(currentUser));
}

function showAuthModal(mode = 'login') {
  const modal = document.getElementById('authModal');
  if (!modal) return;
  switchAuthTab(mode);
  modal.classList.remove('hide');
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) modal.classList.add('hide');
}

function switchAuthTab(tab) {
  const loginTab = document.getElementById('authTabLogin');
  const regTab = document.getElementById('authTabRegister');
  const loginForm = document.getElementById('loginFormContainer');
  const regForm = document.getElementById('registerFormContainer');

  if (tab === 'login') {
    loginTab.classList.add('active');
    regTab.classList.remove('active');
    loginForm.classList.remove('hide');
    regForm.classList.add('hide');
  } else {
    regTab.classList.add('active');
    loginTab.classList.remove('active');
    regForm.classList.remove('hide');
    loginForm.classList.add('hide');
  }
}

function fillDemo(type) {
  if (type === 'rider') {
    document.getElementById('loginEmail').value = 'rider@gmail.com';
    document.getElementById('loginPassword').value = '1234';
  } else if (type === 'mechanic') {
    document.getElementById('loginEmail').value = 'mechanic@sparesmart.com';
    document.getElementById('loginPassword').value = '1234';
  }
  toast(`Filled ${type} demo credentials.`);
}

function login() {
  const email = document.getElementById('loginEmail').value.trim();
  const pass = document.getElementById('loginPassword').value.trim();

  if (!email || !pass) return toast('Please enter both email and password.');

  // Validate credentials
  if (email === 'rider@gmail.com' && pass !== '1234') {
    return toast('Demo password is 1234');
  }

  // Create or retrieve profile
  const usersDb = JSON.parse(localStorage.getItem('bsm_users_db') || '{}');
  let userProfile = usersDb[email];

  if (!userProfile) {
    userProfile = {
      name: email === 'rider@gmail.com' ? 'Vikram Rider' : email.split('@')[0],
      email: email,
      bike: 'KTM Duke 390',
      phone: '9845123456',
      city: 'Bangalore',
      address: 'Plot 88, 100ft Road, Koramangala',
      pin: '560034',
      martCoins: 500
    };
  }

  currentUser = userProfile;
  localStorage.setItem('bsm_user', JSON.stringify(currentUser));
  localStorage.user = email;

  updateAuthUI();
  closeAuthModal();
  toast(`Welcome back, ${currentUser.name}! 🏍️`);

  // If on login page view, switch to app
  const loginPage = document.getElementById('loginPage');
  if (loginPage && !loginPage.classList.contains('hide')) {
    loginPage.classList.add('hide');
    document.getElementById('app').classList.remove('hide');
    home();
  }
}

function register() {
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const pass = document.getElementById('regPassword').value.trim();
  const bike = document.getElementById('regBike').value;
  const phone = document.getElementById('regPhone').value.trim();

  if (!name || !email || !pass) {
    return toast('Please fill in all mandatory fields.');
  }

  const newUser = {
    name,
    email,
    bike: bike || 'All Motorcycles',
    phone: phone || '9876543210',
    city: 'Chennai',
    address: 'No 14, Anna Salai',
    pin: '600002',
    martCoins: 200, // Welcome bonus
    joinedDate: new Date().toLocaleDateString('en-IN')
  };

  const usersDb = JSON.parse(localStorage.getItem('bsm_users_db') || '{}');
  usersDb[email] = newUser;
  localStorage.setItem('bsm_users_db', JSON.stringify(usersDb));

  currentUser = newUser;
  localStorage.setItem('bsm_user', JSON.stringify(currentUser));
  localStorage.user = email;

  updateAuthUI();
  closeAuthModal();
  toast(`Account created! +200 Mart Coins welcome bonus added! 🎁`);

  const loginPage = document.getElementById('loginPage');
  if (loginPage && !loginPage.classList.contains('hide')) {
    loginPage.classList.add('hide');
    document.getElementById('app').classList.remove('hide');
    home();
  }
}

function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('bsm_user');
  currentUser = null;
  updateAuthUI();
  toast('Logged out successfully.');
}

function updateAuthUI() {
  const authBtn = document.getElementById('navAuthBtn');
  const userGreeting = document.getElementById('navUserGreeting');
  const userAvatar = document.getElementById('navUserAvatar');

  if (currentUser) {
    if (authBtn) {
      authBtn.innerHTML = `
        <span class="avatar-circle">${currentUser.name.charAt(0).toUpperCase()}</span>
        <span class="user-name-text">${currentUser.name.split(' ')[0]}</span>
      `;
      authBtn.onclick = () => openDashboard();
    }
  } else {
    if (authBtn) {
      authBtn.innerHTML = `🔑 Sign In / Login`;
      authBtn.onclick = () => loginView('login');
    }
  }
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

function togglePassword(inputId = 'loginPassword') {
  const el = document.getElementById(inputId);
  if (el) {
    el.type = el.type === 'password' ? 'text' : 'password';
  }
}

// Auto update on load
document.addEventListener('DOMContentLoaded', () => {
  updateAuthUI();
});