import { unregisteredUserGuard } from '../common/unregistered-user.guard';
import { sendForm, preventDefault } from '../common/utils';
import { ENVIRONMENT } from '../common/const';
import { token } from '../common/token.service';

unregisteredUserGuard();
const userToken = token.get();

const API_URL = `${ENVIRONMENT.API_URL}/calendar/list`;
const DESK_CALENDAR_URL = '../desk-calendar';

const ulElement = document.querySelector('ul');

async function getCalendars() {
  const calendars = await sendForm({
    url: API_URL,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: userToken,
    },
  });
  console.log(calendars);
  for (const calendar of calendars) {
    const a = document.createElement('a');
    const li = document.createElement('li');
    a.dataset.extId = calendar.extId;
    a.href = DESK_CALENDAR_URL;
    li.textContent = calendar.name;
    a.appendChild(li);
    ulElement.appendChild(a);
  }
}

getCalendars();
