import styled from "styled-components";
import { devices } from "../utils/devices";

export const Modal = styled.dialog`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 480px;
  border-radius: 6px;
  border: none;
  outline: none;
  padding: 32px;

  &::backdrop {
    opacity: 0.5;
    background: #000;
  }

  & > * {
    margin-bottom: 24px;
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 700;
  }

  span {
    font-size: 0.75rem;
    font-weight: 700;
  }

  @media ${devices.mobile} {
    width: 343px;
    padding: 24px;
  }
`;
export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InputContainer = styled.ul`
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
