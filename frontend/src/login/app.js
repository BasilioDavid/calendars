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
    token = await sendForm(API_URL, 'POST', {
      email: emailField.value,
      password: passwordField.value,
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
  // TODO: change this into a local storage service and a token service
  tokenService.set(token);
  // TODO: change routes :(
  window.open('/hub', '_self');
}

window.login = login;
