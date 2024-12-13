document.addEventListener('DOMContentLoaded', () => {
    const signUpContainer = document.getElementById('signUpContainer');
    const signInContainer = document.getElementById('signInContainer');
    const toSignInLink = document.getElementById('toSignIn');
    const toSignUpLink = document.getElementById('toSignUp');

    const signUpForm = document.getElementById('signUpForm');
    const signInForm = document.getElementById('signInForm');

    toSignInLink.addEventListener('click', () => {
        signUpContainer.classList.remove('active');
        signInContainer.classList.add('active');
    });

    toSignUpLink.addEventListener('click', () => {
        signInContainer.classList.remove('active');
        signUpContainer.classList.add('active');
    });

    if (signUpForm) {
        signUpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const signUpMessage = document.getElementById('signUpMessage');

            if (password !== confirmPassword) {
                signUpMessage.textContent = 'Passwords do not match!';
                return;
            }

            // Mock API request
            signUpMessage.textContent = 'Sign up successful!';
            signUpMessage.style.color = 'green';
        });
    }

    if (signInForm) {
        signInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('signInUsername').value;
            const password = document.getElementById('signInPassword').value;
            const signInMessage = document.getElementById('signInMessage');

            // Mock API request
            signInMessage.textContent = 'Sign in successful!';
            signInMessage.style.color = 'green';
        });
    }

    document.getElementById('signInForm').addEventListener('submit', function (e) {
        e.preventDefault();
        // Perform sign-in logic (authentication, etc.)
        // On successful login, redirect to the Dashboard
        window.location.href = 'dashboard.html';
    });

    // Toggle between sign-in and sign-up forms
    document.getElementById('toSignIn').addEventListener('click', function () {
        document.getElementById('signUpContainer').classList.remove('active');
        document.getElementById('signInContainer').classList.add('active');
    });

    document.getElementById('toSignUp').addEventListener('click', function () {
        document.getElementById('signInContainer').classList.remove('active');
        document.getElementById('signUpContainer').classList.add('active');
    });
});