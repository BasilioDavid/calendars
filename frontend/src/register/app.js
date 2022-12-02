import { token as tokenService } from '../common/token.service';
import { ENVIRONMENT, ROUTES } from '../common/const';
import { mobileGuard } from '../common/mobile.guard';
import { sendForm, preventDefault } from '../common/utils';

mobileGuard();
tokenService.clear();

const API_URL = `${ENVIRONMENT.API_URL}/user/register`;

const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const nameField = document.getElementById('name');

async function register(event) {
  preventDefault(event);
  const token = await sendForm(API_URL, 'POST', {
    email: emailField.value,
    password: passwordField.value,
    name: nameField.value,
  });
  if (typeof token.errorCode !== 'undefined') {
    errorHandling(token);
  } else {
    tokenService.set(token);
    window.open(`${ROUTES.hub}/?register=true`, '_self');
  }
}

function errorHandling(error) {
  console.log('mostrando error de no usuario');
  if (error.errorCode === 'USERNOTFOUND')
    generateErrorToast('Combinación de Usuario y contraseña erronea');
  generateErrorToast('Un error desconocido ha sucedido');
}

window.register = register;
