import { ChangeEventHandler, MouseEventHandler, useState } from "react";

import { fileManagerService } from "../../../../domain/services/file-manager";
import { fileReader } from "../../../instances/file-reader";
import { localStorage } from "../../../instances/local-storage";
import { browser } from "../../../repositories/browser";
import { Button } from "../Button/Button";
import { Container, Input } from "./styles";

const service = fileManagerService(browser(fileReader(), localStorage()));

type FileInputProps = {
  onLoad: (csv: any) => void;
};

export const FileInput = (props: FileInputProps) => {
  const [loading, setLoading] = useState(false);

  const redirectClickToHiddenInput: MouseEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.nextSibling?.dispatchEvent(new MouseEvent("click"));
  };

  const onInputChange: ChangeEventHandler = async (event) => {
    setLoading(true);
    const target = event.target as HTMLInputElement;
    const files = Array.prototype.slice.apply(target.files);
    const file = files?.at(0);
    const csv = await service.loadFile(file);
    props.onLoad(csv);
    setLoading(false);
  };

  return (
    <Container>
      <Button value="Select File" onClick={redirectClickToHiddenInput} />
      <Input
        type="file"
        accept=".csv"
        data-testid="FileInput-hidden-input"
        onChange={onInputChange}
      />
      <span>{loading && "loading"}</span>
    </Container>
  );
};
