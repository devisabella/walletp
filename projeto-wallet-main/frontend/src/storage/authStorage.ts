const AUTH_STORAGE = "@wallet:token";

const saveToken = (token: string) => {
  localStorage.setItem(AUTH_STORAGE, token);
};

const getToken = () => {
  return localStorage.getItem(AUTH_STORAGE);
};

const clearToken = () => {
  localStorage.removeItem(AUTH_STORAGE);
};

export const AuthStorage = Object.freeze({
  saveToken,
  getToken,
  clearToken,
});
