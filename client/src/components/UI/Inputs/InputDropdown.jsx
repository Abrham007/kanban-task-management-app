import styled from "styled-components";
import downIcon from "../../../assets/icon-chevron-down.svg";
import { useContext, useState } from "react";
import { DataContext } from "../../../store/DataContext";

export const Dropdown = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding-bottom: 10px;
`;

const DropdownInput = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid rgba(130, 143, 163, 0.25);
  outline: none;
  background-color: transparent;

  &:hover {
    cursor: pointer;
    border: 1px solid #635fc7;
  }

  && > span {
    font-size: 0.8125rem;
    font-weight: 500;
    line-height: 1.4375rem;
  }
`;

const DropdownMenu = styled.menu`
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  position: absolute;
  top: 47px;
  left: 0;
  width: 100%;
  gap: 8px;
  flex-direction: column;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 10px 20px 0px rgba(54, 78, 126, 0.25);

  li {
    width: 100%;
    list-style: none;
  }

  button {
    width: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    color: #828fa3;
    font-size: 0.8125rem;
    font-weight: 500;
    line-height: 1.4375rem;
    text-align: left;

    &:hover {
      color: #000112;
    }
  }
`;

export default function InputDropdown({ status, name, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const { projectArray, columnArray, selectedProjectId } =
    useContext(DataContext);
  const activeBoard = projectArray.find(
    (project) => project.id === selectedProjectId
  );
  const statuslist = columnArray
    .filter((col) => col.project_id === activeBoard.id)
    .map((col) => col.name);

  function handleSelectedStatus(status) {
    onChange(name, status);
  }

  function handleOpen() {
    setIsOpen((prevValue) => !prevValue);
  }

  return (
    <Dropdown aria-live="polite">
      <DropdownInput onClick={handleOpen} tabIndex={0}>
        <span>{status}</span>
        <img src={downIcon} alt=""></img>
      </DropdownInput>
      <DropdownMenu $isOpen={isOpen}>
        {statuslist.map((status) => (
          <li key={status}>
            <button
              onClick={() => {
                handleSelectedStatus(status);
                handleOpen();
              }}
            >
              {status}
            </button>
          </li>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
