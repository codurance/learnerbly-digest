export interface ILearnerblyRepository {
  loadFile: (file: File) => Promise<string>;
  saveToLocalStorage: (csv: string, name: string) => void;
}
