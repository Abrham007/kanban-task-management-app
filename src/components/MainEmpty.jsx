import styled from "styled-components";
import Button from "./Button";
import { devices } from "../utils/devices";
import Modal from "./Modal";
import AddBoard from "./AddBoard";
import AddEditTask from "./AddEditTask";
import { useRef, useState } from "react";

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
  const [isAddEditBoardOpen, setAddEditBoardOpen] = useState(false);
  const [isAddEditTaskOpen, setAddEditTaskOpen] = useState(false);

  function handleOpenBoardModal() {
    setAddEditBoardOpen(true);
  }
  function handleOpenTaskModal() {
    setAddEditTaskOpen(true);
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
      <Modal isOpen={isAddEditBoardOpen} setIsOpen={setAddEditBoardOpen}>
        <AddBoard></AddBoard>
      </Modal>
      <Modal isOpen={isAddEditTaskOpen} setIsOpen={setAddEditTaskOpen}>
        {!isEmptyColumn && <AddEditTask></AddEditTask>}
      </Modal>
    </>
  );
}
