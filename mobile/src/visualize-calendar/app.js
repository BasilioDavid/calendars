import { unregisteredUserGuard } from '../common/unregistered-user.guard';
import { ENVIRONMENT } from '../common/const';
import { sendForm, preventDefault } from '../common/utils';
import { token } from '../common/token.service';

const API_URL = `${ENVIRONMENT.API_URL}/calendar/generate`;
unregisteredUserGuard();

const userToken = token.get();
const parameters = new URLSearchParams(window.location.search);
const calendarId = parameters.get('calendarId');

if (calendarId === null) {
  window.location.replace('/hub');
}

const $article = document.getElementById('images');

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
  } catch (e) {
    console.error(e);
    throw e;
  }
}

init();
