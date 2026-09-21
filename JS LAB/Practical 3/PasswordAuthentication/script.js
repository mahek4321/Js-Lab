const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const showPasswordCheckbox = document.getElementById('showPassword');
const loginBtn = document.getElementById('loginBtn');
const resetBtn = document.getElementById('resetBtn');
const messageBox = document.getElementById('messageBox');
const authCard = document.getElementById('authCard');
const strengthText = document.getElementById('strengthText');
const strengthBar = document.getElementById('strengthBar');
const authForm = document.getElementById('authForm');

const predefinedUsername = 'admin';
const predefinedPassword = 'Admin@123';

function showMessage(text, type) {
  messageBox.textContent = text;
  messageBox.className = `message ${type}`;
}

function setCardState(state) {
  authCard.className = `auth-card ${state}`.trim();
}

function validatePassword(password) {
  if (password.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters long.'
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one uppercase letter.'
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one lowercase letter.'
    };
  }

  if (!/\d/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one number.'
    };
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one special character.'
    };
  }

  return {
    isValid: true,
    message: 'Password is valid.'
  };
}

function checkPasswordStrength(password) {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  let label = 'Weak';
  let width = '20%';
  let color = '#e74c3c';

  if (score >= 3) {
    label = 'Medium';
    width = '65%';
    color = '#f39c12';
  }

  if (score >= 4) {
    label = 'Strong';
    width = '100%';
    color = '#2ecc71';
  }

  strengthText.textContent = `Strength: ${label}`;
  strengthBar.style.width = width;
  strengthBar.style.backgroundColor = color;
}

function togglePassword() {
  passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
}

function updateLoginButtonState() {
  const hasUsername = usernameInput.value.trim() !== '';
  const hasPassword = passwordInput.value !== '';
  loginBtn.disabled = !(hasUsername && hasPassword);
}

function resetForm() {
  usernameInput.value = '';
  passwordInput.value = '';
  showPasswordCheckbox.checked = false;
  passwordInput.type = 'password';
  loginBtn.disabled = true;
  strengthText.textContent = 'Strength: -';
  strengthBar.style.width = '0';
  strengthBar.style.backgroundColor = '#e9ecf5';
  showMessage('', '');
  setCardState('');
  usernameInput.focus();
}

function authenticateUser() {
  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!username) {
    showMessage('Username cannot be empty.', 'error');
    setCardState('error');
    return;
  }

  if (!password) {
    showMessage('Password cannot be empty.', 'error');
    setCardState('error');
    return;
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    showMessage(passwordValidation.message, 'error');
    setCardState('error');
    return;
  }

  if (username !== predefinedUsername || password !== predefinedPassword) {
    showMessage('Invalid Username or Password', 'error');
    setCardState('error');
    return;
  }

  showMessage('Login Successful! Welcome Admin.', 'success');
  setCardState('success');
}

usernameInput.addEventListener('input', updateLoginButtonState);
passwordInput.addEventListener('input', () => {
  updateLoginButtonState();
  checkPasswordStrength(passwordInput.value);
});
showPasswordCheckbox.addEventListener('change', togglePassword);
resetBtn.addEventListener('click', resetForm);

authForm.addEventListener('submit', (event) => {
  event.preventDefault();
  authenticateUser();
});

resetForm();
