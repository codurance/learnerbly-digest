import { ILearnerblyRepository } from "../../domain/repositories/learnerbly";

export const browser = (reader: FileReader): ILearnerblyRepository => ({
  loadFile: (file: File) => {
    return new Promise((resolve, reject) => {
      reader.onload = (event) => {
        resolve(event.target?.result);
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  },
});
