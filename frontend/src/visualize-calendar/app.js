import { unregisteredUserGuard } from '../common/unregistered-user.guard';
import { ENVIRONMENT, ROUTES } from '../common/const';
import { sendForm, preventDefault } from '../common/utils';
import { token } from '../common/token.service';

const API_URL = `${ENVIRONMENT.API_URL}/calendar/generate`;
unregisteredUserGuard();

const userToken = token.get();
const parameters = new URLSearchParams(window.location.search);
const calendarId = parameters.get('calendarId');

if (calendarId === null) {
  window.location.replace(ROUTES.hub);
}

const $orderCalendar = document.getElementById('orderCalendar');

const $article = document.getElementById('images');

async function init() {
  const uri = new URLSearchParams({ calendarId });
  const images = await sendForm({
    url: API_URL + '?' + uri.toString(),
    method: 'GET',
    headers: {
      authorization: userToken,
    },
  });
  if (typeof images.errorCode !== 'undefined') {
    errorHandling(images);
  } else {
    loadImages(images);
  }
}

function loadImages(images) {
  for (const image of images.images) {
    const div = document.createElement('div');
    const header = document.createElement('header');
    const img = document.createElement('img');
    const section = document.createElement('section');
    const p = document.createElement('p');
    p.textContent = 'Enero';
    img.src = 'data:image/png;base64, ' + image;
    header.appendChild(img);
    section.appendChild(p);
    div.appendChild(header);
    div.append(section);
    $article.appendChild(div);
  }
  if (images.imagesLeft == 0) {
    $orderCalendar.href = ROUTES.orderCalendar + '?calendarId=' + calendarId;
  } else {
    $orderCalendar.style.display = 'none';
    showWarning();
  }
}

const $warning = document.getElementById('warning');
function showWarning() {
  $warning.style.zIndex = 1;
}

function errorHandling(error) {
  if (error.errorCode === 'FORBIDDEN')
    window.location = ROUTES.login + '?forbidden=true';
  if (error.errorCode === 'CALENDARNOTFOUND')
    window.location = ROUTES.hub + '?calendarnotfound=true';
  generateErrorToast('Un error desconocido ha sucedido');
}
init();
