import styled from "styled-components";

const TextFieldLabel = styled.label`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &:hover {
    cursor: pointer;
  }

  & div {
    border: 1px solid ${({ $isInvalid }) => ($isInvalid ? "#EA5555" : "rgba(130, 143, 163, 0.25)")};
  }

  & div span {
    display: ${({ $isInvalid }) => ($isInvalid ? "inline-block" : "none")};
  }
`;

const TextFieldInput = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 4px;
  background: #fff;
  color: #000112;
  padding: 0px 1px;

  &:focus,
  &:active,
  &:hover {
    cursor: pointer;
    border: 1px solid var(--Main-Purple, #635fc7);
  }
`;

const TextFieldText = styled.span`
  color: #828fa3;
  font-size: 0.75rem;
  font-weight: 700;
`;
const Input = styled.input.attrs({ type: "text" })`
  width: 100%;
  padding: 8px 16px;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.4375rem;
  outline: none;
  border: none;
`;
const ErrorMessage = styled.span`
  width: 150px;
  color: #ea5555;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.4375rem;
`;

export default function InputTextField() {
  return (
    <TextFieldLabel $isInvalid={false}>
      <TextFieldText>Text Field</TextFieldText>
      <TextFieldInput>
        <Input required placeholder="Enter task name"></Input>
        <ErrorMessage>Can’t be empty</ErrorMessage>
      </TextFieldInput>
    </TextFieldLabel>
  );
}
