import styled from "styled-components";
import checkIcon from "../assets/icon-check.svg";
const Checkbox = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  padding: 12px;
  background-color: #f4f7fd;

  :hover {
    background-color: #635fc7;
    opacity: 0.5;
  }
`;

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  color: #000112;
  font-family: "Plus Jakarta Sans";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  ::before {
    content: url(${checkIcon});
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    background-color: #635fc7;
  }
`;
export default function InputCheckbox() {
  return (
    <Checkbox>
      <Input></Input>
      <Label></Label>
    </Checkbox>
  );
}
