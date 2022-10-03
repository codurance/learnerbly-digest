import { ILearnerblyRepository } from "../../domain/repositories/learnerbly";
import { ILocalStorage } from "../../domain/repositories/local-storage";

export const LEARNERBLY_DIGEST_STORAGE = "learnerbly-digest-storage";

export const browser = (
  reader: FileReader,
  localStorage: ILocalStorage
): ILearnerblyRepository => ({
  loadFile: (file: File) => {
    return new Promise((resolve, reject) => {
      reader.onload = (event) => {
        resolve(String(event.target?.result) || "");
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  },
  saveToLocalStorage: (csv: string, name: string) => {
    const storedString = localStorage.getItem(LEARNERBLY_DIGEST_STORAGE);
    const storedFiles: any =
      storedString != null ? JSON.parse(storedString) : {};
    storedFiles[name] = csv;
    localStorage.setItem(
      LEARNERBLY_DIGEST_STORAGE,
      JSON.stringify(storedFiles)
    );
  },
});
