const HOSTNAME_URL = 'http://localhost:3000/user/register';

function sendForm(body) {
  return fetch(HOSTNAME_URL, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
}

const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const nameField = document.getElementById('name');
async function register(event) {
  event.preventDefault();
  const token = await sendForm({
    email: emailField.value,
    password: passwordField.value,
    name: nameField.value,
  });
  addToLocalStorage('token', token);
}

function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function addToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
