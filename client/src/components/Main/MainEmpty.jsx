import styled from "styled-components";
import Button from "../UI/Buttons/Button";
import { devices } from "../../utils/devices";
import Modal from "../Modal";
import { useState } from "react";
import EditBoard from "../AddEditBoard/EditBoard";
import AddBoard from "../AddEditBoard/AddBoard";

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
  color: #828fa3;
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

export default function MainEmpty({
  isEmptyBoard,
  isEmptyColumn,
  isFetchingData,
}) {
  const [isEditBoardOpen, setEditBoardOpen] = useState(false);
  const [isAddBoardOpen, setAddBoardOpen] = useState(false);

  function handleOpenEditBoardModal() {
    setEditBoardOpen(true);
  }

  function handleOpenAddBoardModal() {
    setAddBoardOpen(true);
  }

  let message = "";
  let btnText = "";
  let btnFn;

  if (isEmptyBoard) {
    message = "Create a new board to get started.";
    btnText = "+ Create New Board";
    btnFn = handleOpenAddBoardModal;
  } else {
    if (isEmptyColumn) {
      message = "This board is empty. Create a new column to get started.";
      btnText = "+ Add New Column";
      btnFn = handleOpenEditBoardModal;
    }
  }

  if (isFetchingData) {
    message = "Fetching...";
    btnText = "This may take a few seconds";
  }

  return (
    <>
      <StyledMainEmpty>
        <Paragraph>{message}</Paragraph>
        <Button
          type={"primary"}
          size="large"
          onClick={btnFn}
          disabled={isFetchingData}
        >
          {btnText}
        </Button>
      </StyledMainEmpty>
      <Modal isOpen={isEditBoardOpen} setIsOpen={setEditBoardOpen}>
        <EditBoard setIsOpen={setEditBoardOpen}></EditBoard>
      </Modal>
      <Modal isOpen={isAddBoardOpen} setIsOpen={setAddBoardOpen}>
        <AddBoard setIsOpen={setAddBoardOpen}></AddBoard>
      </Modal>
    </>
  );
}
