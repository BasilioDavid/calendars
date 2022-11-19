import { unregisteredUserGuard } from '../common/unregistered-user.guard';
import { ENVIRONMENT } from '../common/const';
import { sendForm, preventDefault } from '../common/utils';
import { token } from '../common/token.service';

const API_URL = `${ENVIRONMENT.API_URL}/calendar/generate`;
unregisteredUserGuard();

const userToken = token.get();
const parameters = new URLSearchParams(window.location.search);
const calendarId = parameters.get('calendarId');

if (typeof calendarId === 'undefined') {
  window.location.replace('/hub');
}

const ul = document.getElementById('images');

async function init() {
  try {
    const uri = new URLSearchParams({ calendarId });
    const images = await sendForm({
      url: API_URL + '?' + uri.toString(),
      method: 'GET',
      headers: {
        authorization: userToken,
      },
    });
    for (const image of images) {
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = 'data:image/png;base64, ' + image;
      li.appendChild(img);
      ul.appendChild(li);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

init();
