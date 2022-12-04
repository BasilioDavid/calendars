import { unregisteredUserGuard } from '../common/unregistered-user.guard';
import { mobileGuard } from '../common/mobile.guard';
import { sendForm, preventDefault } from '../common/utils';
import {
  CALENDAR_STATUS_ID_TO_NAME,
  ENVIRONMENT,
  ROUTES,
} from '../common/const';
import { token } from '../common/token.service';
import { generateErrorToast, generateSuccessToast } from '../common/toast';

mobileGuard();
unregisteredUserGuard();
const userToken = token.get();

const API_URL = `${ENVIRONMENT.API_URL}/calendar/list`;

const $article = document.getElementById('rug');

async function getCalendars() {
  const calendars = await sendForm({
    url: API_URL,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: userToken,
    },
  });
  if (typeof token.errorCode !== 'undefined') {
    errorHandling(token);
  } else {
    displayCalendars(calendars);
  }
}

function displayCalendars(calendars) {
  if (!calendars.length) {
    const error = document.getElementById('errorMessage');
    error.style.display = 'block';
    return;
  }
  for (const calendar of calendars) {
    const a = document.createElement('a');
    const header = document.createElement('header');
    const img = document.createElement('img');

    img.src =
      typeof calendar.image === 'undefined'
        ? '/resources/utils/january.png'
        : calendar.image;
    header.appendChild(img);
    const section = document.createElement('section');
    const span1 = document.createElement('span');
    span1.textContent = calendar.name;
    const span = document.createElement('span');
    span.textContent = CALENDAR_STATUS_ID_TO_NAME[calendar.statusId];
    a.href = ROUTES.deskCalendar + `?calendarId=${calendar.extId}`;
    a.appendChild(header);
    a.appendChild(section);
    section.appendChild(span1);
    section.appendChild(span);
    $article.appendChild(a);
  }
}

function checkUrlParams() {
  const parameters = new URLSearchParams(window.location.search);
  if (parameters.get('login')) {
    generateSuccessToast('Inicio de sesión realizado con éxito');
  }
  if (parameters.get('hub')) {
    generateSuccessToast('Usuario registrado con éxito');
  }
  if (parameters.get('create')) {
    generateSuccessToast('Calendario creado con éxito');
  }
  if (parameters.get('order')) {
    generateSuccessToast('Calendario pedido con éxito');
  }
  if (parameters.get('calendarnotfound')) {
    generateErrorToast('No se ha podido encontrar el calendario');
  }
  if (parameters.get('alreadyordered')) {
    generateErrorToast(
      'El calendario ya ha sido pedido, si tiene dudas contacte con soporte'
    );
  }
  if (parameters.get('error')) {
    generateErrorToast('Algo no ha ido como debería');
  }
}
function errorHandling(error) {
  console.log('mostrando error de no usuario');
  if (error.errorCode === 'FORBIDDEN')
    window.location = ROUTES.login + '?forbidden=true';
  generateErrorToast(
    'Un error desconocido ha sucedido, por favor inténtelo de nuevo'
  );
}
void checkUrlParams();
getCalendars();
