document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginError = document.getElementById('loginError');
  const registerError = document.getElementById('registerError');

  loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        window.location.href = 'homepage.html'; 
      } else {
        loginError.textContent = 'Invalid username or password';
      }
    } catch (error) {
      console.error(error);
    }
  });

  registerForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData(registerForm);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        registerError.textContent = 'Registration complete';
      } else if (response.status === 400) {
        const responseBody = await response.json();
        registerError.textContent = responseBody.error;
      } else {
        registerError.textContent = 'Registration failed';
      }
    } catch (error) {
      console.error(error);
    }
  });
});
