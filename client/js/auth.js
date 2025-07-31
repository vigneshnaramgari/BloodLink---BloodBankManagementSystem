const backendUrl = 'https://bloodlink-f53w.onrender.com/api/auth';

document.addEventListener('DOMContentLoaded', function() {
  const passwordToggles = document.querySelectorAll('.password-toggle');
  
  passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const input = this.previousElementSibling;
      const icon = this.querySelector('i');
      
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  });
});

const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${backendUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      if (res.ok) {
        alert('Registration successful!');
        localStorage.setItem('token', result.token);
        localStorage.setItem('role', result.role);
        window.location.href = `${result.role}-dashboard.html`;
      } else {
        alert(result.message || 'Registration failed');
      }
    } catch (err) {
      alert('Error registering: ' + err.message);
    }
  });
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${backendUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      if (res.ok) {
        alert('Login successful!');
        localStorage.setItem('token', result.token);
        localStorage.setItem('role', result.role);
        window.location.href = `${result.role}-dashboard.html`;
      } else {
        alert(result.message || 'Login failed');
      }
    } catch (err) {
      alert('Error logging in: ' + err.message);
    }
  });
}
