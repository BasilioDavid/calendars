import { unregisteredUserGuard } from '../common/unregistered-user.guard';
import { sendForm, preventDefault } from '../common/utils';
import { ENVIRONMENT, ROUTES } from '../common/const';
import { token } from '../common/token.service';

unregisteredUserGuard();
const userToken = token.get();

const API_URL = `${ENVIRONMENT.API_URL}/calendar/list`;

const ulElement = document.querySelector('main ul');

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
    a.href = ROUTES.deskCalendar + `?calendarId=${calendar.extId}`;
    li.textContent = calendar.name;
    a.appendChild(li);
    ulElement.appendChild(a);
  }
}

getCalendars();
