import { token as tokenService } from '../common/token.service';
import { ENVIRONMENT } from '../common/const';
import { sendForm, preventDefault } from '../common/utils';

const API_URL = `${ENVIRONMENT.API_URL}/user/register`;

const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const nameField = document.getElementById('name');

async function register(event) {
  preventDefault(event);
  let token;
  try {
    token = await sendForm(API_URL, 'POST', {
      email: emailField.value,
      password: passwordField.value,
      name: nameField.value,
    });
  } catch (e) {
    console.error('Couldnt send the form');
    throw e;
  }
  // TODO: change this into a local storage service and a token service
  tokenService.set(token);
  // TODO: change routes :(
  window.open('/hub');
}

window.register = register;
