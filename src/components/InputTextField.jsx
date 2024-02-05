import { useEffect, useState } from "react";
import styled from "styled-components";

export const TextField = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 4px;
  border: 1px solid ${({ $isInvalid }) => ($isInvalid ? "#EA5555" : "rgba(130, 143, 163, 0.25)")};

  &:hover {
    cursor: pointer;
  }

  & span {
    display: ${({ $isInvalid }) => ($isInvalid ? "inline-block" : "none")};
  }

  & input {
    border: ${({ $isInvalid }) => ($isInvalid ? "none" : "")};

    &:focus,
    &:hover {
      border: ${({ $isInvalid }) => ($isInvalid ? "none" : "")};
    }
  }
`;

const TextFieldInput = styled.input.attrs({ type: "text" })`
  width: 100%;
  height: ${({ as }) => (as === "input" ? "auto" : "112px")};
  padding: 8px 16px;
  font-family: "Plus Jakarta Sans";
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.4375rem;
  outline: none;
  border: 1px solid rgba(130, 143, 163, 0.25);
  border-radius: 4px;
  background-color: inherit;
  color: inherit;
  resize: none;

  &:focus,
  &:hover {
    cursor: pointer;
    border: 1px solid #635fc7;
  }
`;
const TextFieldErrorMessage = styled.span`
  width: 150px;
  color: #ea5555;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.4375rem;
`;

export default function InputTextField({ as = "input", defaultValue, placeholder, onChange, name, ...props }) {
  function handleChange(event) {
    onChange(name, event.target.value);
  }

  return (
    <TextField $isInvalid={false}>
      <TextFieldInput
        {...props}
        as={as}
        value={defaultValue}
        onChange={handleChange}
        required
        placeholder={placeholder}
      ></TextFieldInput>
      <TextFieldErrorMessage>Can’t be empty</TextFieldErrorMessage>
    </TextField>
  );
}
