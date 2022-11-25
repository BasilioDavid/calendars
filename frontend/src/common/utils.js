import { token } from './token.service';

export function preventDefault(e) {
  e.preventDefault();
  e.stopPropagation();
}

export async function sendForm({ url, method, body, headers }) {
  const response = await fetch(url, {
    method: method,
    body: body instanceof FormData ? body : JSON.stringify(body),
    headers,
  });
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

export function clearToken() {
  token.clear();
}
