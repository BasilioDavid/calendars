import { addToLocalStorage, getFromLocalStorage } from './localstorage';

const key = 'token';

export const token = {
  get: () => getFromLocalStorage(key),
  set: (token) => addToLocalStorage(key, token),
  exist: () => getFromLocalStorage(key) !== null,
};
