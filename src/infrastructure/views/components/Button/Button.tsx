import { MouseEventHandler } from "react";

import { ButtonContainer } from "./styles.js";

type buttonProps = {
  value?: string;
  submit?: boolean;
  onClick?: MouseEventHandler;
};

export const Button = (props: buttonProps) => {
  return (
    <ButtonContainer
      role="button"
      type={props.submit === true ? "submit" : "button"}
      value={props.value}
      onClick={props.onClick}
    />
  );
};
