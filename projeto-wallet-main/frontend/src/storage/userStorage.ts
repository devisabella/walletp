import { User } from "../@types/user";

const USER_STORAGE = "@wallet:user";

const saveUser = (user: User) => {
  localStorage.setItem(USER_STORAGE, JSON.stringify(user));
};

const getUser = (): User => {
  const user = localStorage.getItem(USER_STORAGE) as string;
  return JSON.parse(user);
};

const clearUser = () => {
  localStorage.removeItem(USER_STORAGE);
};

export const UserStorage = Object.freeze({
  saveUser,
  getUser,
  clearUser,
});
