import styled from "styled-components";
import checkIcon from "../assets/icon-check.svg";

export const CheckBoxLabel = styled.label`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 12px;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    background-color: rgba(99, 95, 199, 0.25);
  }

  input:checked ~ span::before {
    content: url(${checkIcon});
    background-color: #635fc7;
    display: flex;
  }

  input:checked ~ span {
    text-decoration-line: line-through;
  }
`;

const CheckBoxInput = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  width: 0;
  height: 0;
  cursor: pointer;
`;

const CheckBoxText = styled.span`
  display: flex;
  gap: 16px;
  font-size: 0.75rem;
  font-weight: 700;

  &::before {
    content: "";
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    border-radius: 2px;
    border: 1px solid rgba(130, 143, 163, 0.25);
    background: #fff;
  }
`;
export default function InputCheckBox({ children, isChecked, id, onChange, ...props }) {
  function handleChecked() {
    console.log(id);
    onChange(id);
  }
  return (
    <CheckBoxLabel {...props}>
      <CheckBoxInput defaultChecked={isChecked} onChange={handleChecked}></CheckBoxInput>
      <CheckBoxText>{children}</CheckBoxText>
    </CheckBoxLabel>
  );
}
