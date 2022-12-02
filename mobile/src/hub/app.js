import { unregisteredUserGuard } from '../common/unregistered-user.guard';
import { sendForm, preventDefault } from '../common/utils';
import { ENVIRONMENT, ROUTES } from '../common/const';
import { token } from '../common/token.service';
import { generateErrorToast, generateSuccessToast } from '../common/toast';

unregisteredUserGuard();
const userToken = token.get();

const API_URL = `${ENVIRONMENT.API_URL}/calendar/list`;

const $article = document.querySelector('article');

async function getCalendars() {
  const calendars = await sendForm({
    url: API_URL,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: userToken,
    },
  });
  // TODO: display a message when the user does not have any calendars
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
    span.textContent = calendar.statusId;
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
  if (parameters.get('order')) {
    generateSuccessToast('Calendario pedido con éxito');
  }
}
void checkUrlParams();
getCalendars();
