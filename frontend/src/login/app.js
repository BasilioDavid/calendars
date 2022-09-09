import { addToLocalStorage } from '../common/localstorage';
import { ENVIRONMENT } from '../common/const';

const HOSTNAME_URL = `${ENVIRONMENT.API_URL}/user/login`;

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
  let token;
  try {
    token = await sendForm({
      email: emailField.value,
      password: passwordField.value,
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
  addToLocalStorage('token', token);
  window.location.replace('/hub');
}

window.login = login;
