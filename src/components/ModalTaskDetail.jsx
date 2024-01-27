import styled from "styled-components";
import InputCheckBox from "./InputCheckBox";
import InputDropdown from "./InputDropdown";
import EllipsisButton from "./EllipsisButton";

export const TaskDetail = styled.dialog`
  position: absolute;
  top: calc(50% - 240px);
  left: calc(50% - 260px);
  width: 480px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  border: none;
  outline: none;
  padding: 32px;

  & h3 {
    font-size: 1.125rem;
    font-weight: 700;
  }

  & > p {
    color: #828fa3;
    font-size: 0.8125rem;
    font-weight: 500;
    line-height: 1.4375rem;
  }

  & span {
    font-size: 0.75rem;
    font-weight: 700;
  }
`;

const TaskDetailHeader = styled.div`
  display: flex;
  gap: 24px;
`;

const TaskDetailCheckbox = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const TaskDetailDropdown = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default function ModalTaskDetail() {
  return (
    <TaskDetail open>
      <TaskDetailHeader>
        <h3>Research pricing points of various competitors and trial different business models</h3>
        <EllipsisButton purpose={"Task"}></EllipsisButton>
      </TaskDetailHeader>
      <p>
        We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use.
        Keep iterating the subtasks until we have a coherent proposition.
      </p>
      <TaskDetailCheckbox>
        <span>Subtasks (2 of 3)</span>
        <div role="presentation">
          <InputCheckBox>Research competitor pricing and business models</InputCheckBox>
          <InputCheckBox>Outline a business model that works for our solution</InputCheckBox>
          <InputCheckBox>
            Talk to potential customers about our proposed solution and ask for fair price expectancy
          </InputCheckBox>
        </div>
      </TaskDetailCheckbox>
      <TaskDetailDropdown>
        <span>Current Status</span>
        <InputDropdown></InputDropdown>
      </TaskDetailDropdown>
    </TaskDetail>
  );
}
