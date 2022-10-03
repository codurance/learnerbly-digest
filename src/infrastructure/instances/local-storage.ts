import { ILocalStorage } from "../../domain/repositories/local-storage";

export const localStorage = (): ILocalStorage => ({
  getItem: (key: string) => {
    return window.localStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    window.localStorage.setItem(key, value);
  },
});
