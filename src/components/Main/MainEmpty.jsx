import styled from "styled-components";
import Button from "../UI/Buttons/Button";
import { devices } from "../../utils/devices";
import Modal from "../Modal";
import { useState } from "react";
import EditBoard from "../AddEditBoard/EditBoard";

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

export default function MainEmpty({
  isEmptyBoard,
  isEmptyColumn,
  isFetchingData,
}) {
  const [isEditBoardOpen, setEditBoardOpen] = useState(false);

  function handleOpenBoardModal() {
    setEditBoardOpen(true);
  }

  let message = "";
  let btnText = "";

  if (isEmptyBoard) {
    message = "Create a new board to get started.";
    btnText = "+ Create New Board";
  } else {
    if (isEmptyColumn) {
      message = "This board is empty. Create a new column to get started.";
      btnText = "+ Add New Column";
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
          onClick={handleOpenBoardModal}
          disabled={isFetchingData}
        >
          {btnText}
        </Button>
      </StyledMainEmpty>
      <Modal isOpen={isEditBoardOpen} setIsOpen={setEditBoardOpen}>
        <EditBoard setIsOpen={setEditBoardOpen}></EditBoard>
      </Modal>
    </>
  );
}
