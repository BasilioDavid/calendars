import { unregisteredUserGuard } from '../common/unregistered-user.guard';
import { mobileGuard } from '../common/mobile.guard';
import { sendForm, preventDefault } from '../common/utils';
import { ENVIRONMENT, ROUTES } from '../common/const';
import { token } from '../common/token.service';

mobileGuard();
unregisteredUserGuard();
const userToken = token.get();

const API_URL = `${ENVIRONMENT.API_URL}/calendar/new`;

const nameField = document.getElementById('name');

async function create(e) {
  preventDefault(e);
  const result = await sendForm({
    url: API_URL,
    method: 'POST',
    body: { name: nameField.value },
    headers: {
      'Content-Type': 'application/json',
      authorization: userToken,
    },
  });
  window.location.href = ROUTES.hub + '?create=true';
  if (typeof result.errorCode !== 'undefined') {
    errorHandling(result);
  }
}

function errorHandling(error) {
  if (error.errorCode === 'FORBIDDEN')
    window.location = ROUTES.login + '?forbidden=true';
  if (error.errorCode === 'NAMEALREADYEXIST')
    generateErrorToast('El nombre del calendario ya ha sido registrado');
  generateErrorToast(
    'Un error desconocido ha sucedido, por favor inténtelo de nuevo'
  );
}
window.create = create;
