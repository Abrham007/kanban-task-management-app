import { useState } from "react";
import styled from "styled-components";
import InputTextField from "./InputTextField";
import IconCross from "./IconCross";
import Button from "./Button";

export const StyledInputContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  list-style: none;

  & > li {
    display: flex;
    gap: 16px;
  }

  & > li > button {
    background-color: transparent;
    border: none;
    outline: none;

    &:focus svg,
    &:hover svg {
      fill: #ea5555;
    }
  }
`;
export default function InputContainer({ purpose = "board" }) {
  const [inputs, setInputs] = useState([
    <li>
      <InputTextField defaultValue="Todo" placeholder="e.g. Make coffee"></InputTextField>
      <button>
        <IconCross></IconCross>
      </button>
    </li>,
    <li>
      <InputTextField defaultValue="Doing" placeholder="e.g. Drink coffee & smile"></InputTextField>
      <button>
        <IconCross></IconCross>
      </button>
    </li>,
  ]);

  function handleAddInputs() {
    let singleInput = (
      <li>
        <InputTextField></InputTextField>
        <button>
          <IconCross></IconCross>
        </button>
      </li>
    );
    setInputs((prevValue) => {
      return [...prevValue, singleInput];
    });
  }
  return (
    <StyledInputContainer>
      {inputs}
      <Button type="secondary" onClick={handleAddInputs}>
        + Add New {purpose === "board" ? "Column" : "SubTask"}
      </Button>
    </StyledInputContainer>
  );
}
