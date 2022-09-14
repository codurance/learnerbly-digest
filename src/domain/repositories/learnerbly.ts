export interface ILearnerblyRepository {
  loadFile: (file: File) => Promise<any>;
}
