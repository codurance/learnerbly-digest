import { StoredFile } from "../models/csv";

export interface ILearnerblyRepository {
  loadFile: (file: File) => Promise<string>;
  saveToLocalStorage: (csv: string, name: string) => void;
  retrieveFiles: () => StoredFile[];
}
