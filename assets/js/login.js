const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

const signUpForm = document.getElementById('signUpForm');
const signInForm = document.getElementById('signInForm');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Simpan data pengguna pada sign up
signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('signUpName').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;

    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem('user', JSON.stringify(user));
    alert('Registration successful! Please sign in.');
    container.classList.remove("active");
});

// Verifikasi data pengguna pada sign in
signInForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        alert('Login successful! Redirecting to Dashboard...');
        window.location.href = '/pages/dashboard.html';
        localStorage.setItem('loggedInUserName', storedUser.name);
    } else {
        alert('Login failed! Incorrect email or password.');
    }
});