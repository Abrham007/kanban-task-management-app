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

    &:focus svg,
    &:hover svg {
      fill: #ea5555;
    }
  }
`;
export default function InputContainer({ purpose = "board" }) {
  const [inputDetails, setInputDetails] = useState([]);

  function handleAddInputs() {
    setInputDetails((prevValue) => {
      return [...prevValue, { value: "", placeholder: "" }];
    });
  }

  function handleRemoveInputs(index) {
    setInputDetails((prevValue) => {
      let temp = [...prevValue];
      temp.splice(index, 1);
      return temp;
    });
  }

  useEffect(() => {
    setInputDetails([
      {
        value: "Todo",
        placeholder: "e.g. Make coffee",
      },
      {
        value: "Doing",
        placeholder: "e.g. Drink coffee & smile",
      },
    ]);
  }, []);
  return (
    <StyledInputContainer>
      {inputDetails.map((detail, index) => (
        <li>
          <InputTextField defaultValue={detail.value} placeholder={detail.placeholder}></InputTextField>
          <button onClick={() => handleRemoveInputs(index)}>
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
