import styled from "styled-components";
import Button from "./Button";
import { devices } from "../utils/devices";
import Modal from "./Modal";
import AddEditBoard from "./AddEditBoard";
import AddEditTask from "./AddEditTask";
import { useRef } from "react";

const StyledMainEmpty = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;

  @media ${devices.mobile} {
    gap: 25px;
  }
`;

const Paragraph = styled.p`
  color: inherit;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 700;

  @media ${devices.tablet} {
    width: 80%;
  }

  @media ${devices.mobile} {
    width: 90%;
  }
`;

export default function MainEmpty({ isEmptyBoard, isEmptyColumn }) {
  const boardDialog = useRef();
  const taskDialog = useRef();

  function handleOpenBoardModal() {
    boardDialog.current.open();
  }
  function handleOpenTaskModal() {
    taskDialog.current.open();
  }

  let message = "";
  let btnText = "";
  let btnFunction;

  if (isEmptyBoard) {
    message = "Create a new board to get started.";
    btnText = "+ Create New Board";
    btnFunction = handleOpenBoardModal;
  } else {
    if (isEmptyColumn) {
      message = "This board is empty. Create a new column to get started.";
      btnText = "+ Add New Column";
      btnFunction = handleOpenTaskModal;
    }
  }

  return (
    <>
      <StyledMainEmpty>
        <Paragraph>{message}</Paragraph>
        <Button type={"primary"} size="large" onClick={btnFunction}>
          {btnText}
        </Button>
      </StyledMainEmpty>
      <Modal ref={boardDialog}>
        <AddEditBoard></AddEditBoard>
      </Modal>
      <Modal ref={taskDialog}>{!isEmptyColumn && <AddEditTask></AddEditTask>}</Modal>
    </>
  );
}
