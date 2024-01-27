import styled from "styled-components";
import InputCheckBox from "./InputCheckBox";
import InputTextField from "./InputTextField";

export const StyledTaskDetailModal = styled.dialog`
  position: absolute;
  top: calc(50% - 240px);
  left: calc(50% - 260px);
  width: 480px;
  height: 523px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background: var(--White, #fff);
  border: none;
  outline: none;
  padding: 32px;
`;

export default function TaskDetali() {
  return (
    <StyledTaskDetailModal open>
      <InputCheckBox></InputCheckBox>
      <InputTextField></InputTextField>
    </StyledTaskDetailModal>
  );
}
