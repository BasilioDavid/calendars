export function preventDefault(e) {
  e.preventDefault();
  e.stopPropagation();
}

export async function sendForm(url, body, method) {
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}
