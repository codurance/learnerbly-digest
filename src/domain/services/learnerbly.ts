import { ILearnerblyRepository } from "../repositories/learnerbly";

export const learnerblyService = (
  repo: ILearnerblyRepository
): ILearnerblyRepository => ({
  loadFile(file: File) {
    return repo.loadFile(file);
  },
});
