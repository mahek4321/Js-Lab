const form = document.getElementById("palindrome-form");
const input = document.getElementById("text-input");
const resultBox = document.getElementById("result");
const errorBox = document.getElementById("error");
const clearBtn = document.getElementById("clear-btn");
const checkBtn = document.querySelector(".check-btn");

function clearMessages() {
  resultBox.textContent = "";
  resultBox.className = "result";
  errorBox.textContent = "";
  errorBox.className = "error";
}

function updateButtonState() {
  checkBtn.disabled = input.value.trim().length === 0;
}

function isPalindrome(text) {
  const cleaned = text.toLowerCase().replace(/[^a-z0-9]/g, "");
  const reversed = cleaned.split("").reverse().join("");
  return cleaned === reversed;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  clearMessages();

  try {
    const userInput = input.value.trim();

    if (userInput === "") {
      throw "Please enter some text.";
    }

    if (!/[A-Za-z0-9]/.test(userInput)) {
      throw "Please enter at least one letter or number.";
    }

    const message = isPalindrome(userInput)
      ? `✅ "${userInput}" is a Palindrome.`
      : `❌ "${userInput}" is NOT a Palindrome.`;

    resultBox.textContent = message;
  } catch (error) {
    errorBox.textContent = error;
  }
});

clearBtn.addEventListener("click", function () {
  input.value = "";
  clearMessages();
  input.focus();
  updateButtonState();
});

input.addEventListener("input", function () {
  clearMessages();
  updateButtonState();
});

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    form.requestSubmit();
  }
});

updateButtonState();

