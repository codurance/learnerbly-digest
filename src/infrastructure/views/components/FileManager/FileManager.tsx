import { StoredFile } from "../../../../domain/models/csv";
import { fileManagerService } from "../../../../domain/services/file-manager";
import { fileReader } from "../../../instances/file-reader";
import { localStorage } from "../../../instances/local-storage";
import { browser } from "../../../repositories/browser";
import { FileInput, FileInputProps } from "../FileInput/FileInput";
import {
  FileList,
  FileListItem,
  FileManagerActions,
  FileManagerContainer,
} from "./styles";

const service = fileManagerService(browser(fileReader(), localStorage()));

export type FileManagerProps = Pick<FileInputProps, "onLoad"> & {
  onFileChange: (file: StoredFile) => void;
};

export const FileManager = (props: FileManagerProps) => {
  const files = service.retrieveFiles();

  return (
    <FileManagerContainer>
      <FileList>
        {files.map((file) => (
          <FileListItem
            onClick={() => props.onFileChange(file)}
            key={file.name}
          >
            {file.name}
          </FileListItem>
        ))}
      </FileList>
      <FileManagerActions>
        <FileInput onLoad={props.onLoad} />
      </FileManagerActions>
    </FileManagerContainer>
  );
};
