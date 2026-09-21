// Very simple JavaScript for Vehicle Registration Number Validator
// Function required by the task: validateRegistration()
function validateRegistration() {
  const resultEl = document.getElementById('result');
  // Clear previous result
  resultEl.textContent = '';

  try {
    const input = document.getElementById('reg');
    const value = input.value.trim();

    // Validation rules (throw errors when a rule fails)
    if (!value) {
      throw new Error('Registration number must not be empty.');
    }

    if (value.length !== 10) {
      throw new Error('Registration number must be exactly 10 characters long.');
    }

    // Break the value into parts
    const state = value.substring(0, 2);
    const district = value.substring(2, 4);
    const series = value.substring(4, 6);
    const number = value.substring(6, 10);

    const letters = /^[A-Z]{2}$/;
    const twoDigits = /^[0-9]{2}$/;
    const fourDigits = /^[0-9]{4}$/;

    if (!letters.test(state)) {
      throw new Error('First 2 characters must be uppercase letters (State Code).');
    }

    if (!twoDigits.test(district)) {
      throw new Error('Characters 3-4 must be digits (District Code).');
    }

    if (!letters.test(series)) {
      throw new Error('Characters 5-6 must be uppercase letters (Series).');
    }

    if (!fourDigits.test(number)) {
      throw new Error('Last 4 characters must be digits (Vehicle Number).');
    }

    // If all checks pass, show success message in green
    resultEl.style.color = 'green';
    resultEl.textContent = '✅ Valid Vehicle Registration Number';

    // Optionally, you could return true for use in tests
    return true;

  } catch (err) {
    // Handle any validation errors here
    resultEl.style.color = 'red';
    resultEl.textContent = '❌ Invalid Vehicle Registration Number - ' + err.message;
    return false;
  }
}

// Optional: allow pressing Enter key to trigger validation
document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('reg');
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') validateRegistration();
  });
});
