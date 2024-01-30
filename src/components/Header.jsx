import Button from "./Button";
import styled, { css } from "styled-components";
import { devices } from "../utils/devices";
import downIcon from "../assets/icon-chevron-down.svg";
import upIcon from "../assets/icon-chevron-up.svg";
import addIcon from "../assets/icon-add-task-mobile.svg";
import mobileLogo from "../assets/logo-mobile.svg";
import { useContext, useRef } from "react";
import { DataContext, SideBarContext } from "../MyContext";
import EllipsisButton from "./EllipsisButton";
import ModalAddEditTask from "./ModalAddEditTask";

export const StyledHeader = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ $isSideBarHidden }) => ($isSideBarHidden ? "0px 32px 0px 24px" : "0px 32px 0px 34px")};
  transition: all 0.5s linear;

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

export const Logo = styled.div`
  width: 153px;
  height: 25px;

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
  const dialog = useRef();
  const { isSideBarHidden, handleSideBarHidden } = useContext(SideBarContext);
  const { selectedBoard } = useContext(DataContext);

  function handleOpenModal() {
    dialog.current.open();
  }

  return (
    <>
      <StyledHeader $isSideBarHidden={isSideBarHidden}>
        <div className="Header-text">
          <Logo role="presentation"></Logo>
          <VerticalLine $isSideBarHidden={isSideBarHidden}></VerticalLine>
          <h1 onClick={handleSideBarHidden}>
            <span>{selectedBoard}</span> <img src={isSideBarHidden ? upIcon : downIcon} alt=""></img>
          </h1>
        </div>

        <div className="Header-btns">
          <HeaderBtn onClick={handleOpenModal} type={"primary"} size="large">
            <span className="for-large">+ Add New Task</span>
            <img src={addIcon} alt="add sign" className="for-small"></img>
          </HeaderBtn>
          <EllipsisButton></EllipsisButton>
        </div>
      </StyledHeader>
      <ModalAddEditTask ref={dialog}></ModalAddEditTask>
    </>
  );
}
