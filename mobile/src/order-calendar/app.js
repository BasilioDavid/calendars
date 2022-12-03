import { ENVIRONMENT } from '../common/const';
import { unregisteredUserGuard } from '../common/unregistered-user.guard';
import { token } from '../common/token.service';
import { sendForm, preventDefault } from '../common/utils';

const API_URL = `${ENVIRONMENT.API_URL}/calendar/order`;
unregisteredUserGuard();

const userToken = token.get();
const parameters = new URLSearchParams(window.location.search);
const calendarId = parameters.get('calendarId');

if (calendarId === null) {
  window.location.replace('/hub');
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
      cp: cp.value,
      city: city.value,
      contactNumber: contactNumber.value,
      direction: direction.value,
      specifications: specifications.value,
      instructions: instructions.value,
      paymentMethod: paymentMethod.value,
    },
    headers: { 'Content-Type': 'application/json', authorization: userToken },
  });
  window.open('/hub', '_self');
}

window.send = send;
