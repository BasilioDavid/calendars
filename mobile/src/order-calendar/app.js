import { ENVIRONMENT, ROUTES } from '../common/const';
import { unregisteredUserGuard } from '../common/unregistered-user.guard';
import { token } from '../common/token.service';
import { sendForm, preventDefault } from '../common/utils';
import { generateErrorToast, generateSuccessToast } from '../common/toast';

const API_URL = `${ENVIRONMENT.API_URL}/order`;
unregisteredUserGuard();

const $consent = document.getElementById('paymentMethod');
const $direction = document.getElementById('direction');
const $contactNumber = document.getElementById('contactNumber');
const $cp = document.getElementById('cp');
const $city = document.getElementById('city');

const button = document.getElementById('send');

function checkButtonEnabled() {
  button.disabled = !(
    $direction.value.length !== 0 &&
    $contactNumber.value.length !== 0 &&
    $cp.value.length !== 0 &&
    $city.value.length !== 0 &&
    $consent.checked
  );
}

$cp.addEventListener('input', checkButtonEnabled);
$city.addEventListener('input', checkButtonEnabled);
$contactNumber.addEventListener('input', checkButtonEnabled);
$direction.addEventListener('input', checkButtonEnabled);
$consent.addEventListener('input', checkButtonEnabled);

const userToken = token.get();
const parameters = new URLSearchParams(window.location.search);
const calendarId = parameters.get('calendarId');

if (calendarId === null) {
  window.location.replace(ROUTES.hub);
}

const $specifications = document.getElementById('specifications');
const $instructions = document.getElementById('instructions');
const $wrapper = document.getElementById('wrapper');

async function workPlsss(event) {
  preventDefault(event);
  const result = await sendForm({
    url: API_URL,
    method: 'POST',
    body: {
      postalCode: $cp.value,
      city: $city.value,
      contactNumber: $contactNumber.value,
      direction: $direction.value,
      specifications: $specifications.value,
      instructions: $instructions.value,
      wrapper: $wrapper.checked,
      calendarId,
    },
    headers: { 'Content-Type': 'application/json', authorization: userToken },
  });
  if (typeof result.errorCode !== 'undefined') {
    errorHandling(result);
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
  if (error.errorCode === 'NOTENGOUGHTPARTS')
    window.location = ROUTES.hub + '?error=true';
  generateErrorToast('Un error desconocido ha sucedido');
}
window.workPlsss = workPlsss;
