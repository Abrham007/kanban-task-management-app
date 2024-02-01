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
export default function InputContainer({ purpose = "board", defaultInputs }) {
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
    if (purpose === "board") {
      setInputDetails(
        defaultInputs.map((inputValue) => {
          return {
            value: inputValue,
          };
        })
      );
    } else {
      setInputDetails([
        {
          placeholder: "e.g. Make coffee",
        },
        {
          placeholder: "e.g. Drink coffee & smile",
        },
      ]);
    }
  }, [defaultInputs, purpose]);
  return (
    <StyledInputContainer>
      {inputDetails.map((detail, index) => (
        <li key={index}>
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
