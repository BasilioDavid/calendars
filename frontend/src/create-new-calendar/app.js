import { unregisteredUserGuard } from '../common/unregistered-user.guard';
import { sendForm, preventDefault } from '../common/utils';
import { ENVIRONMENT } from '../common/const';
import { token } from '../common/token.service';

unregisteredUserGuard();
const userToken = token.get();

const API_URL = `${ENVIRONMENT.API_URL}/calendar/new`;

const nameField = document.getElementById('name');

async function create(e) {
  preventDefault(e);
  try {
    await sendForm({
      url: API_URL,
      method: 'POST',
      body: { name: nameField.value },
      headers: {
        'Content-Type': 'application/json',
        authorization: userToken,
      },
    });
    window.location.href = '/hub';
  } catch (e) {
    console.error(e);
  }
}

window.create = create;
