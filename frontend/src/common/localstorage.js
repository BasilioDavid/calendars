
export function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function addToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
