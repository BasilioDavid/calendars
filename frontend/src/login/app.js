import { ENVIRONMENT } from '../common/const';
import { token as tokenService } from '../common/token.service';
import { sendForm, preventDefault } from '../common/utils';

const API_URL = `${ENVIRONMENT.API_URL}/user/login`;

tokenService.clear();

const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');

async function login(event) {
  preventDefault(event);
  let token;
  try {
    token = await sendForm({
      url: API_URL,
      method: 'POST',
      body: {
        email: emailField.value,
        password: passwordField.value,
      },
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
  tokenService.set(token);
  window.open('/hub', '_self');
}

window.login = login;
