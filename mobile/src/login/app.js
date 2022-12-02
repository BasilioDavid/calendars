import { ENVIRONMENT, ROUTES } from '../common/const';
import { token as tokenService } from '../common/token.service';
import { sendForm, preventDefault } from '../common/utils';
import { generateErrorToast } from '../common/toast';

const API_URL = `${ENVIRONMENT.API_URL}/user/login`;

tokenService.clear();

const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const button = document.getElementById('send');

function checkButtonEnabled() {
  button.disabled = !(
    emailField.value.length !== 0 && passwordField.value.length !== 0
  );
}

emailField.addEventListener('input', checkButtonEnabled);
passwordField.addEventListener('input', checkButtonEnabled);

async function login(event) {
  preventDefault(event);
  const token = await sendForm({
    url: API_URL,
    method: 'POST',
    body: {
      email: emailField.value,
      password: passwordField.value,
    },
    headers: { 'Content-Type': 'application/json' },
  });
  if (typeof token.errorCode !== 'undefined') {
    errorHandling(token);
  } else {
    tokenService.set(token);
    window.open(`${ROUTES.hub}/?login=true`, '_self');
  }
}

function errorHandling(error) {
  console.log('mostrando error de no usuario');
  if (error.errorCode === 'USERNOTFOUND')
    generateErrorToast('Combinación de Usuario y contraseña erronea');
    // TODO: handle unknown errors
}

window.login = login;
