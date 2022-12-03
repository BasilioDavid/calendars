import { ENVIRONMENT, ROUTES } from '../common/const';
import { mobileGuard } from '../common/mobile.guard';
import { unregisteredUserGuard } from '../common/unregistered-user.guard';
import { token } from '../common/token.service';
import { sendForm, preventDefault } from '../common/utils';

const API_URL = `${ENVIRONMENT.API_URL}/order`;
mobileGuard();
unregisteredUserGuard();

const userToken = token.get();
const parameters = new URLSearchParams(window.location.search);
const calendarId = parameters.get('calendarId');

if (calendarId === null) {
  window.location.replace(ROUTES.hub);
}

const cp = document.getElementById('cp');
const city = document.getElementById('city');
const contactNumber = document.getElementById('contactNumber');
const direction = document.getElementById('direction');
const specifications = document.getElementById('specifications');
const instructions = document.getElementById('instructions');
const paymentMethod = document.getElementById('paymentMethod');

async function send(event) {
  preventDefault(event);
  await sendForm({
    url: API_URL,
    method: 'POST',
    body: {
      postalCode: cp.value,
      city: city.value,
      contactNumber: contactNumber.value,
      direction: direction.value,
      specifications: specifications.value,
      instructions: instructions.value,
      paymentMethod: paymentMethod.value,
      calendarId,
    },
    headers: { 'Content-Type': 'application/json', authorization: userToken },
  });
  if (typeof token.errorCode !== 'undefined') {
    errorHandling(token);
  } else {
    window.open(`${ROUTES.hub}/?order=true`, '_self');
  }
}

function errorHandling(error) {
  if (error.errorCode === 'FORBIDDEN')
    window.location = ROUTES.login + '?forbidden=true';
  if (error.errorCode === 'CALENDARNOTFOUND')
    window.location = ROUTES.hub + '?calendarnotfound=true';
  if (error.errorCode === 'CALENDARALREADYORDERED')
    window.location = ROUTES.hub + '?alreadyordered=true';
  generateErrorToast('Un error desconocido ha sucedido');
}
window.send = send;
