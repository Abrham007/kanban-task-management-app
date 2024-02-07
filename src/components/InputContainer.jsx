import { useEffect, useState } from "react";
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

    &:hover svg {
      fill: #ea5555;
    }
  }
`;
export default function InputContainer({
  purpose = "board",
  defaultInputs,
  onChange,
  handleAddInputs,
  handleRemoveInputs,
  placeholder,
}) {
  return (
    <StyledInputContainer>
      {Object.entries(defaultInputs).map(([name, value], index) => (
        <li key={index}>
          <InputTextField
            name={name}
            onChange={onChange}
            defaultValue={value}
            placeholder={placeholder && placeholder[index]}
          ></InputTextField>
          <button onClick={() => handleRemoveInputs(name)}>
            <IconCross></IconCross>
          </button>
        </li>
      ))}
      <Button type="secondary" onClick={handleAddInputs}>
        + Add New {purpose === "board" ? "Column" : "SubTask"}
      </Button>
    </StyledInputContainer>
  );
}
