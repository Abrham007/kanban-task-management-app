import styled from "styled-components";
export const Modal = styled.dialog`
  position: absolute;
  top: calc(50% - 240px);
  left: calc(50% - 260px);
  width: 480px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 6px;
  border: none;
  outline: none;
  padding: 32px;

  h3 {
    font-size: 1.125rem;
    font-weight: 700;
  }

  span {
    font-size: 0.75rem;
    font-weight: 700;
  }
`;
export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  & > div {
    display: flex;
    gap: 16px;
  }

  & > div > button {
    background-color: transparent;
    border: none;
    outline: none;

    &:focus svg,
    &:hover svg {
      fill: #ea5555;
    }
  }
`;
