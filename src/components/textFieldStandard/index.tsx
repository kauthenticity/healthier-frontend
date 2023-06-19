import { forwardRef } from "react";
import * as Styled from "./index.style";

type TTextFieldStandardType = "number" | "text";

export interface ITextFieldStandardProps {
  label?: string;
  placeholder?: string;
  type?: TTextFieldStandardType;
  value: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextFieldStandard = forwardRef<HTMLInputElement, ITextFieldStandardProps>(
  ({ label, placeholder, type = "text", value, name, onChange }, ref) => {
    return (
      <Styled.Container>
        <Styled.Label>{label}</Styled.Label>
        <Styled.Input type={type} value={value} name={name} placeholder={placeholder} onChange={onChange} ref={ref} />
      </Styled.Container>
    );
  }
);

TextFieldStandard.displayName = "TextFieldStandard";

export default TextFieldStandard;