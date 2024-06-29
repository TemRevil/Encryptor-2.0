// Generator Main Event
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.check-box');
    const numButton = document.getElementById('Nums');
    const capitalizeButton = document.getElementById('Capitalize');
    const symbolsButton = document.getElementById('Sympols');
    const lowercaseButton = document.getElementById('Lowercase');
    const generateButton = document.getElementById('generate-pass');
    const copyButton = document.getElementById('copy-pass');
    const passLengthInput = document.getElementById('pass-length');
    const rangeNum = document.getElementById('range-num');
    const passInput = document.getElementById('g-pass-input');
    const generatorAlert = document.getElementById('generator-alert');

    // Activate the first button by default
    numButton.classList.add('active');

    const toggleActiveClass = (button) => {
        button.classList.toggle('active');
    };

    const getPasswordCharacters = () => {
        let characters = '';
        if (numButton.classList.contains('active')) characters += '0123456789';
        if (capitalizeButton.classList.contains('active')) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (symbolsButton.classList.contains('active')) characters += '!@#$%^&*()_+[]{}|;:,.<>?';
        if (lowercaseButton.classList.contains('active')) characters += 'abcdefghijklmnopqrstuvwxyz';
        return characters;
    };

    const generatePassword = (length, characters) => {
        let password = '';
        for (let i = 0; i < length; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return password;
    };

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            toggleActiveClass(button);
        });
    });

    passLengthInput.addEventListener('input', () => {
        rangeNum.textContent = passLengthInput.value;
    });

    const showAlert = (message) => {
        generatorAlert.textContent = message;
        generatorAlert.style.display = 'block';
        setTimeout(() => {
            generatorAlert.style.display = 'none';
        }, 2000);
    };

    generateButton.addEventListener('click', () => {
        const length = parseInt(passLengthInput.value);
        const characters = getPasswordCharacters();
        if (characters.length === 0) {
            showAlert('Please select at least one character set');
            return;
        }
        const password = generatePassword(length, characters);
        passInput.value = password;
        generatorAlert.textContent = ''; // Clear any previous alerts
    });

    copyButton.addEventListener('click', () => {
        passInput.select();
        document.execCommand('copy');
        showAlert('Password copied to clipboard');
    });
});
// -----------------------------------------------------------
// Saving Main Event
document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('save-pass');
    const closeBtn = document.getElementById('close-modal');
    const passInput = document.getElementById('g-pass-input');
    const passKeyInput = document.getElementById('pass-key');
    const emailInput = document.getElementById('Email');
    const savingAlert = document.getElementById('saving-alert');
    let modal;

    // Save Button Click Event
    saveButton.addEventListener('click', () => {
        modal = document.querySelector('.modal');
        modal.classList.remove('off');
        passKeyInput.value = passInput.value;
        passKeyInput.placeholder = 'Password';
    });

    // Close Button Click Event
    closeBtn.addEventListener('click', () => {
        if (modal) {
            modal.classList.add('off');
        }
    });
});

// Saving Password Click Event
document.addEventListener('DOMContentLoaded', () => {
    const passSavingBtn = document.getElementById('pass-saving');
    passSavingBtn.addEventListener('click', () => {
        const passInput = document.getElementById('g-pass-input');
        const passKeyInput = document.getElementById('pass-key');
        const emailInput = document.getElementById('Email');
        const savingAlert = document.getElementById('saving-alert');
        const modal = document.querySelector('.modal');

        const email = emailInput.value.trim();
        const password = passKeyInput.value.trim();  // يجب استخدام passKeyInput هنا بدلاً من passInput

        // Check if all fields are filled
        if (email === '' || password === '') {
            savingAlert.textContent = 'Please fill in all fields';
            savingAlert.style.display = 'block';
            setTimeout(() => {
                savingAlert.style.display = 'none';
            }, 2000);
            return;
        }

        // Prepare text content for download
        const textContent = `Email/Username: ${email}\nPassword: ${password}`;

        // Create a blob with the text content
        const blob = new Blob([textContent], { type: 'text/plain' });

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'password.txt';

        // Append the link to the body and trigger the click event
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);

        // Reset inputs and hide modal
        passInput.value = '';
        passKeyInput.value = '';
        emailInput.value = '';
        if (modal) {
            modal.classList.add('off');
        }
    });
});
