// JavaScript Lab Practical 8
// Gym Admission Form - Event Based Validation


const form = document.getElementById("gymForm");

const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const emailInput = document.getElementById("email");
const mobileInput = document.getElementById("mobile");
const planInput = document.getElementById("plan");
const addressInput = document.getElementById("address");


const nameError = document.getElementById("nameError");
const ageError = document.getElementById("ageError");
const emailError = document.getElementById("emailError");
const mobileError = document.getElementById("mobileError");
const planError = document.getElementById("planError");
const addressError = document.getElementById("addressError");

const result = document.getElementById("result");


// Function to display validation result
function setFieldState(input, messageBox, message, valid) {

    const box = input.closest(".input-box");

    box.classList.remove("valid", "invalid");

    messageBox.classList.remove(
        "error-message",
        "success-message"
    );


    if (valid) {

        box.classList.add("valid");

        messageBox.classList.add(
            "success-message"
        );

        messageBox.textContent = "Valid";

    } else {

        box.classList.add("invalid");

        messageBox.classList.add(
            "error-message"
        );

        messageBox.textContent = message;
    }
}


// Name validation
function validateName() {

    const value = nameInput.value.trim();

    if (value === "") {

        setFieldState(
            nameInput,
            nameError,
            "Name is required.",
            false
        );

        return false;
    }


    if (!/^[A-Za-z ]+$/.test(value)) {

        setFieldState(
            nameInput,
            nameError,
            "Only letters and spaces are allowed.",
            false
        );

        return false;
    }


    setFieldState(
        nameInput,
        nameError,
        "",
        true
    );

    return true;
}


// Age validation
function validateAge() {

    const value = Number(ageInput.value);

    if (ageInput.value.trim() === "") {

        setFieldState(
            ageInput,
            ageError,
            "Age is required.",
            false
        );

        return false;
    }


    if (
        !Number.isInteger(value) ||
        value < 16 ||
        value > 60
    ) {

        setFieldState(
            ageInput,
            ageError,
            "Age must be between 16 and 60.",
            false
        );

        return false;
    }


    setFieldState(
        ageInput,
        ageError,
        "",
        true
    );

    return true;
}


// Email validation
function validateEmail() {

    const value = emailInput.value.trim();

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (value === "") {

        setFieldState(
            emailInput,
            emailError,
            "Email is required.",
            false
        );

        return false;
    }


    if (!pattern.test(value)) {

        setFieldState(
            emailInput,
            emailError,
            "Enter a valid email address.",
            false
        );

        return false;
    }


    setFieldState(
        emailInput,
        emailError,
        "",
        true
    );

    return true;
}


// Mobile validation
function validateMobile() {

    const value = mobileInput.value.trim();


    if (!/^\d{10}$/.test(value)) {

        setFieldState(
            mobileInput,
            mobileError,
            "Enter a 10-digit mobile number.",
            false
        );

        return false;
    }


    setFieldState(
        mobileInput,
        mobileError,
        "",
        true
    );

    return true;
}


// Membership plan validation
function validatePlan() {

    if (planInput.value === "") {

        setFieldState(
            planInput,
            planError,
            "Please select a membership plan.",
            false
        );

        return false;
    }


    setFieldState(
        planInput,
        planError,
        "",
        true
    );

    return true;
}


// Address validation
function validateAddress() {

    const value = addressInput.value.trim();


    if (value.length < 5) {

        setFieldState(
            addressInput,
            addressError,
            "Please enter your address.",
            false
        );

        return false;
    }


    setFieldState(
        addressInput,
        addressError,
        "",
        true
    );

    return true;
}


/*
    INPUT EVENT
    Runs whenever the user types or changes
    the value of the field.
*/

nameInput.addEventListener(
    "input",
    validateName
);

emailInput.addEventListener(
    "input",
    validateEmail
);

mobileInput.addEventListener(
    "input",
    validateMobile
);

addressInput.addEventListener(
    "input",
    validateAddress
);


/*
    BLUR EVENT
    Runs when the user leaves the age field.
*/

ageInput.addEventListener(
    "blur",
    validateAge
);


/*
    CHANGE EVENT
    Runs when the membership plan changes.
*/

planInput.addEventListener(
    "change",
    validatePlan
);


/*
    SUBMIT EVENT
    Validates all fields before submission.
*/

form.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const validName =
            validateName();

        const validAge =
            validateAge();

        const validEmail =
            validateEmail();

        const validMobile =
            validateMobile();

        const validPlan =
            validatePlan();

        const validAddress =
            validateAddress();


        if (
            validName &&
            validAge &&
            validEmail &&
            validMobile &&
            validPlan &&
            validAddress
        ) {

            result.className =
                "success-result";

            result.textContent =
                "Gym Admission Successful!";

        } else {

            result.className =
                "error-result";

            result.textContent =
                "Please correct the highlighted errors before submitting.";
        }
    }
);


/*
    RESET EVENT
    Clears validation messages and styles.
*/

form.addEventListener(
    "reset",
    function () {

        setTimeout(function () {

            const inputs = [
                nameInput,
                ageInput,
                emailInput,
                mobileInput,
                planInput,
                addressInput
            ];


            const messages = [
                nameError,
                ageError,
                emailError,
                mobileError,
                planError,
                addressError
            ];


            inputs.forEach(
                function (input) {

                    input
                        .closest(".input-box")
                        .classList
                        .remove(
                            "valid",
                            "invalid"
                        );
                }
            );


            messages.forEach(
                function (message) {

                    message.textContent = "";

                    message.className =
                        "message";
                }
            );


            result.className = "";
            result.textContent = "";

        }, 0);
    }
);