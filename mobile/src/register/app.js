import { token as tokenService } from '../common/token.service';
import { ENVIRONMENT, ROUTES } from '../common/const';
import { sendForm, preventDefault } from '../common/utils';
import { generateErrorToast, generateSuccessToast } from '../common/toast';

tokenService.clear();

const API_URL = `${ENVIRONMENT.API_URL}/user/register`;

const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const password2Field = document.getElementById('password2');
const nameField = document.getElementById('name');
const button = document.getElementById('send');

function checkButtonEnabled() {
  button.disabled = !(
    checkBothPasswordsMatch() &&
    emailField.value.length !== 0 &&
    passwordField.value.length !== 0 &&
    nameField.value.length !== 0 &&
    password2Field.value.length !== 0
  );
}

const errorMessage = document.getElementById('errorMessage');
function checkBothPasswordsMatch() {
  console.log('entrno');
  const match = password2Field.value === passwordField.value;
  if (!match) {
    errorMessage.style.display = 'block';
  } else {
    errorMessage.style.display = 'none';
  }
  return match;
}

emailField.addEventListener('input', checkButtonEnabled);
passwordField.addEventListener('input', checkButtonEnabled);
nameField.addEventListener('input', checkButtonEnabled);
password2Field.addEventListener('input', checkButtonEnabled);

async function register(event) {
  preventDefault(event);
  const token = await sendForm({
    url: API_URL,
    method: 'POST',
    body: {
      email: emailField.value,
      password: passwordField.value,
      name: nameField.value,
    },
    headers: { 'Content-Type': 'application/json' },
  });
  if (typeof token.errorCode !== 'undefined') {
    errorHandling(token);
  } else {
    tokenService.set(token);
    window.open(`${ROUTES.hub}/?register=true`, '_self');
  }
}

function errorHandling(error) {
  if (error.errorCode === 'EMAILALREADYFOUND')
    return generateErrorToast('El email ya ha sido registrado');
  generateErrorToast('Un error desconocido ha sucedido');
}

window.register = register;
