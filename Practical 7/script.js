const form = document.getElementById('signupForm');
const statusMessage = document.getElementById('formStatus');

const fieldNames = [
  'firstName',
  'lastName',
  'birthday',
  'username',
  'email',
  'website',
  'password',
  'rePassword'
];

function setError(input, message) {
  const errorBox = input.parentElement.querySelector('.error-message');

  if (!errorBox) return;

  errorBox.textContent = message;

  if (message) {
    input.classList.add('invalid');
  } else {
    input.classList.remove('invalid');
  }
}

function clearError(input) {
  setError(input, '');
}

function validateRequired(input) {
  if (!input.value.trim()) {
    return 'This field is required.';
  }
  return '';
}

function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function validateWebsite(url) {
  try {
    const value = new URL(url);
    return value.protocol === 'http:' || value.protocol === 'https:';
  } catch {
    return false;
  }
}

function validateField(name) {
  const input = form.elements[name];

  if (!input) {
    return true;
  }

  let message = validateRequired(input);

  if (message) {
    setError(input, message);
    return false;
  }

  switch (name) {
    case 'firstName':
    case 'lastName':
    case 'username':
      if (input.value.trim().length < Number(input.minLength || 2)) {
        message = 'Minimum length is ' + (input.minLength || 2) + ' characters.';
      }
      break;

    case 'email':
      if (!validateEmail(input.value.trim())) {
        message = 'Please enter a valid email address.';
      }
      break;

    case 'website':
      if (!validateWebsite(input.value.trim())) {
        message = 'Please enter a valid website URL.';
      }
      break;

    case 'password':
      if (input.value.trim().length < Number(input.minLength || 6)) {
        message = 'Password must be at least ' + (input.minLength || 6) + ' characters.';
      }
      break;

    case 'rePassword':
      if (input.value.trim() !== form.elements.password.value.trim()) {
        message = 'Passwords do not match.';
      }
      break;

    default:
      break;
  }

  setError(input, message);
  return !message;
}

fieldNames.forEach((name) => {
  const input = form.elements[name];

  if (!input) return;

  input.addEventListener('focus', () => {
    clearError(input);
  });

  input.addEventListener('blur', () => {
    validateField(name);
  });

  input.addEventListener('input', () => {
    if (input.classList.contains('invalid')) {
      validateField(name);
    }
  });

  input.addEventListener('keyup', () => {
    if (input.value.trim()) {
      validateField(name);
    }
  });
});

const termsCheckbox = form.elements.terms;
const termsErrorBox = form.querySelector('.checkbox-error');

termsCheckbox.addEventListener('change', () => {
  if (termsCheckbox.checked) {
    termsErrorBox.textContent = '';
  }
});

termsCheckbox.addEventListener('click', () => {
  if (termsCheckbox.checked) {
    termsErrorBox.textContent = '';
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let isValid = true;

  fieldNames.forEach((name) => {
    if (!validateField(name)) {
      isValid = false;
    }
  });

  if (!termsCheckbox.checked) {
    termsErrorBox.textContent = 'You must agree to the terms and conditions.';
    isValid = false;
  } else {
    termsErrorBox.textContent = '';
  }

  if (!isValid) {
    statusMessage.textContent = 'Please correct the highlighted fields.';
    statusMessage.className = 'error';
    return;
  }

  statusMessage.textContent = 'Registration successful!';
  statusMessage.className = 'success';
  form.reset();
});
