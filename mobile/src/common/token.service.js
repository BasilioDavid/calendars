import {
  addToLocalStorage,
  getFromLocalStorage,
  remoteFromLocalStorage,
} from './localstorage';

const key = 'token';

export const token = {
  get: () => getFromLocalStorage(key)?.token,
  set: (token) => addToLocalStorage(key, token),
  exist: () => getFromLocalStorage(key) !== null,
  clear: () => remoteFromLocalStorage(key),
};
