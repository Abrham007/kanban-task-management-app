import styled from "styled-components";
import TaskColumn from "./TaskColumn";
import { useContext, useState } from "react";
import { DataContext } from "../../../store/DataContext";
import Modal from "../../Modal";
import EditBoard from "../../AddEditBoard/EditBoard";

const StyledTaskBoard = styled.div`
  min-height: 100%;
  min-width: 100%;
  display: flex;
  gap: 24px;
`;

export const NewTaskColumn = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 280px;
  flex-shrink: 0;
  border-radius: 6px;
  margin-top: 39px;

  button {
    background-color: transparent;
    border: none;
    outline: none;
    color: #828fa3;
    font-size: 1.5rem;
    font-weight: 700;
  }

  button:hover {
    color: #635fc7;
  }
`;
export default function TaskBoard() {
  const [isAddEditBoardOpen, setAddEditBoardOpen] = useState(false);
  const { projectArray, columnArray, selectedProjectId } =
    useContext(DataContext);
  const activeBoard = projectArray.find(
    (project) => project.id === selectedProjectId
  );
  const selectedColumn = columnArray.filter(
    (col) => col.project_id === activeBoard.id
  );

  function handleOpenModal() {
    setAddEditBoardOpen(true);
  }
  return (
    <>
      <StyledTaskBoard>
        {selectedColumn.map((column, index) => (
          <TaskColumn key={column.id} index={index} {...column}></TaskColumn>
        ))}
        <NewTaskColumn>
          <button onClick={handleOpenModal}>+ New Column</button>
        </NewTaskColumn>
      </StyledTaskBoard>
      <Modal isOpen={isAddEditBoardOpen} setIsOpen={setAddEditBoardOpen}>
        <EditBoard></EditBoard>
      </Modal>
    </>
  );
}
