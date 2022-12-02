import { ENVIRONMENT } from './const';

export function mobileGuard() {
  if (screen.width <= 720) {
    window.location = ENVIRONMENT.MOBILE_URL;
  }
}
