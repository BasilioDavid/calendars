const HOSTNAME_URL = 'http://localhost:3000/user/login';

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
async function login(event) {
  event.preventDefault();
  await sendForm({ email: emailField.value, password: passwordField.value });
  console.log('Form submitted');
}
