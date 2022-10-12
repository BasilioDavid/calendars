import { token } from './token.service';

export function preventDefault(e) {
  e.preventDefault();
  e.stopPropagation();
}

export async function sendForm(
  url,
  method,
  body,
  headers = {
    'Content-Type': 'application/json',
  }
) {
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers,
  });
  return response.json();
}

export function clearToken() {
  token.clear();
}
