import { token } from './token.service';

export function unregisteredUserGuard() {
  if (!token.exist()) {
    // TODO: add error url params
    window.location.replace('/login');
  }
}
