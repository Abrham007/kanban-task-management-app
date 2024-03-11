import Button from "./UI/Buttons/Button";
import styled, { css } from "styled-components";
import { devices } from "../utils/devices";
import downIcon from "../assets/icon-chevron-down.svg";
import upIcon from "../assets/icon-chevron-up.svg";
import addIcon from "../assets/icon-add-task-mobile.svg";
import mobileLogo from "../assets/logo-mobile.svg";
import lightLogo from "../assets/logo-light.svg";
import darkLogo from "../assets/logo-dark.svg";
import { useContext, useState } from "react";
import { DataContext } from "../store/DataContext";
import { SideBarContext } from "../store/SideBarContext";
import { ThemeContext } from "styled-components";
import EllipsisButton from "./UI/Buttons/EllipsisButton";
import AddTask from "./AddEditTask/AddTask";
import EditBoard from "./AddEditBoard/EditBoard";
import DeleteMessage from "./DeleteMessage";
import Modal from "./Modal";

export const StyledHeader = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  padding: ${({ $isSideBarHidden }) =>
    $isSideBarHidden ? "0px 32px 0px 24px" : "0px 32px 0px 34px"};

  .Header-text {
    display: flex;
    gap: ${({ $isSideBarHidden }) => ($isSideBarHidden ? "37px" : "69px")};
    align-items: center;
  }

  .Header-btns {
    display: flex;
    gap: 15px;
    align-items: center;
  }

  h1 {
    display: flex;
    gap: 9px;
    align-items: center;
    color: inherit;
    font-size: 1.5rem;
    font-weight: 700;
  }

  h1 > img {
    display: none;
  }

  @media ${devices.tablet} {
    .Header-text {
      gap: ${({ $isSideBarHidden }) => ($isSideBarHidden ? "24px" : "53px")};
    }

    h1 {
      font-size: 1.25rem;
    }
  }
  @media ${devices.mobile} {
    padding: 20px 16px;

    .Header-text {
      gap: 16px;
    }

    .Header-btns {
      gap: 16px;
    }

    h1 {
      cursor: pointer;
    }

    h1 > img {
      display: inline-block;
    }
  }
`;

const VerticalLine = styled.hr`
  ${({ $isSideBarHidden }) => {
    if (!$isSideBarHidden) {
      return css`
        width: 0;
        height: 0;
      `;
    }
  }}

  transform: rotate(180deg);
  align-self: stretch;

  @media ${devices.mobile} {
    display: none;
  }
`;
// prettier-ignore
export const Logo = styled.div`
  width: 153px;
  height: 25px;
  background-image: url(${({ $theme }) => $theme.name === "Light" ? lightLogo : darkLogo});

  @media ${devices.mobile} {
    width: 24px;
    height: 25px;
    && {
      background-image: url(${mobileLogo});
    }
  }
`;

const HeaderBtn = styled(Button)`
  .for-small {
    display: none;
  }

  @media ${devices.mobile} {
    width: 48px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;

    .for-large {
      display: none;
    }

    .for-small {
      display: inline;
    }
  }
`;

export default function Header() {
  const [isAddEditBoardOpen, setAddEditBoardOpen] = useState(false);
  const [isAddEditTaskOpen, setAddEditTaskOpen] = useState(false);
  const [isDeleteMessageOpen, setDeleteMessageOpen] = useState(false);
  const { isSideBarHidden, handleSideBarHidden } = useContext(SideBarContext);
  const { projectArray, columnArray, selectedProjectId } =
    useContext(DataContext);
  const activeBoard = projectArray?.find(
    (project) => project.id === selectedProjectId
  );
  const activeBoardColumns = columnArray.filter(
    (col) => col.project_id === activeBoard?.id
  );
  const isEmptyColumn = activeBoardColumns.length === 0;
  const activeBoardName = activeBoard?.name ?? "";
  const themeContext = useContext(ThemeContext);

  function handleModalTaskCreate() {
    setAddEditTaskOpen(true);
  }

  function handleModalBoardEdit() {
    setAddEditBoardOpen(true);
  }

  function handleModalDelete() {
    setDeleteMessageOpen(true);
  }

  return (
    <>
      <StyledHeader $isSideBarHidden={isSideBarHidden}>
        <div className="Header-text">
          <Logo role="presentation" $theme={themeContext}></Logo>
          <VerticalLine $isSideBarHidden={isSideBarHidden}></VerticalLine>
          <h1 onClick={handleSideBarHidden}>
            <span>{activeBoardName}</span>
            <img src={isSideBarHidden ? upIcon : downIcon} alt=""></img>
          </h1>
        </div>

        <div className="Header-btns">
          <HeaderBtn
            onClick={handleModalTaskCreate}
            disabled={isEmptyColumn}
            type={"primary"}
            size="large"
          >
            <span className="for-large">+ Add New Task</span>
            <img src={addIcon} alt="add sign" className="for-small"></img>
          </HeaderBtn>
          <EllipsisButton
            disabled={projectArray.length === 0}
            handleEdit={handleModalBoardEdit}
            handleDelete={handleModalDelete}
            aria-label="Menu"
          ></EllipsisButton>
        </div>
      </StyledHeader>
      <Modal isOpen={isAddEditTaskOpen} setIsOpen={setAddEditTaskOpen}>
        <AddTask setIsOpen={setAddEditTaskOpen}></AddTask>
      </Modal>
      <Modal isOpen={isAddEditBoardOpen} setIsOpen={setAddEditBoardOpen}>
        <EditBoard setIsOpen={setAddEditBoardOpen}></EditBoard>
      </Modal>
      <Modal isOpen={isDeleteMessageOpen} setIsOpen={setDeleteMessageOpen}>
        <DeleteMessage></DeleteMessage>
      </Modal>
    </>
  );
}
