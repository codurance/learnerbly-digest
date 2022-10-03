export interface ILocalStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
}
