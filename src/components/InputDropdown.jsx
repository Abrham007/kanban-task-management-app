import styled from "styled-components";
import downIcon from "../assets/icon-chevron-down.svg";
import upIcon from "../assets/icon-chevron-up.svg";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../MyContext";

export const Dropdown = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding-bottom: 10px;

  &:hover menu {
    display: flex;
  }
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

  &:focus,
  &:hover {
    cursor: pointer;
    border: 1px solid #635fc7;
  }

  span {
    font-size: 0.8125rem;
    font-weight: 500;
    line-height: 1.4375rem;
  }
`;

const DropdownMenu = styled.menu`
  display: none;
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

export default function InputDropdown({ status }) {
  const [selectedStatus, setSelectedStatus] = useState();
  const { boardArray, selectedBoard } = useContext(DataContext);
  const activeBoard = boardArray.find((board) => board.name === selectedBoard);
  const statuslist = activeBoard.columns.map((col) => col.name);

  useEffect(() => {
    if (!status) {
      setSelectedStatus(statuslist[0]);
    } else {
      setSelectedStatus(status);
    }
  }, []);

  return (
    <Dropdown aria-live="polite">
      <DropdownInput tabIndex={0}>
        <span>{selectedStatus}</span>
        <img src={downIcon} alt=""></img>
      </DropdownInput>
      <DropdownMenu>
        {statuslist.map((status) => (
          <li key={status}>
            <button onClick={() => setSelectedStatus(status)}>{status}</button>
          </li>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
