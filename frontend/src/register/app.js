import { addToLocalStorage } from '../common/localstorage';
import { ENVIRONMENT } from '../common/const';

const HOSTNAME_URL = `${ENVIRONMENT.API_URL}/user/register`;

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
  let token;
  try {
    token = await sendForm({
      email: emailField.value,
      password: passwordField.value,
      name: nameField.value,
    });
  } catch (e) {
    console.error('Couldnt send the form');
    throw e;
  }
  addToLocalStorage('token', token);
  window.location.replace('/hub');
}

window.register = register;
