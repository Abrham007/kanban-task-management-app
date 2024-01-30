import styled, { css } from "styled-components";
import SideBarMenu from "./SideBarMenu";
import { MenuBtn } from "./SideBarMenu";
import lightTheme from "../assets/icon-light-theme.svg";
import darkTheme from "../assets/icon-dark-theme.svg";
import showIcon from "../assets/icon-show-sidebar.svg";
import { useTheme } from "../theme/useTheme";
import { useContext } from "react";
import { SideBarContext } from "../MyContext";
import { ThemeContext } from "styled-components";
import { getFromLS } from "../utils/storage";
import { devices } from "../utils/devices";

export const StyledSideBar = styled.div`
  ${({ $isSideBarHidden }) => {
    if ($isSideBarHidden) {
      return css`
        position: fixed;
        top: 96px;
        bottom: 0px;
        width: 300px;
        transform: translateX(-300px);

        @media ${devices.tablet} {
          top: 80px;
          width: 260px;
          transform: translateX(-260px);
        }

        @media ${devices.mobile} {
          opacity: 1;
          transform: none;
        }
      `;
    } else {
      return css`
        position: relative;
        grid-area: SideBar;

        @media ${devices.mobile} {
          opacity: 0;
        }
      `;
    }
  }}
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 0px 47px 0px;
  transition: all 0.5s linear;

  @media ${devices.mobile} {
    position: absolute;
    top: 80px;
    left: 54px;
    width: 264px;
    height: 322px;
    gap: 16px;
    border-radius: 8px;
    padding: 16px 0px;
    z-index: 1;
    transition: opacity 0.2s linear;
  }
`;
export const SliderWapper = styled.div`
  width: 251px;
  height: 48px;
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  margin: auto;
  margin-bottom: 0px;

  @media ${devices.tablet} {
    width: 235px;
  }
`;

const Slider = styled.label`
  position: relative;
  width: 40px;
  height: 20px;
  border-radius: 10px;
  background-color: #635fc7;

  &:hover {
    cursor: pointer;
    background-color: #a8a4ff;
  }

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  input:checked + .slider-btn::before {
    transform: translateX(20px);
  }

  .slider-btn {
    border: none;
    outline: none;
  }

  .slider-btn::before {
    position: absolute;
    content: "";
    width: 14px;
    height: 14px;
    left: 3px;
    bottom: 3px;
    background-color: #f4f7fd;
    border-radius: 50%;
    transition: 0.4s;
  }
`;

const HideBtn = styled(MenuBtn)`
  width: 276px;
  margin-top: 8px;

  @media ${devices.mobile} {
    display: none;
  }
`;

const ShowBtn = styled.button`
  position: absolute;
  bottom: 32px;
  left: 100%;
  display: ${({ $isSideBarHidden }) => ($isSideBarHidden ? "inline-block" : "none")};
  width: 52px;
  height: 48px;
  border: none;
  outline: none;
  border-radius: 0px 100px 100px 0px;
  background-color: #635fc7;

  &:hover {
    background-color: #a8a4ff;
  }

  @media ${devices.mobile} {
    display: none;
  }
`;

export default function Sidebar(props) {
  const themesFromStore = getFromLS("all-themes");
  const { setMode } = useTheme();
  const themeContext = useContext(ThemeContext);
  const { isSideBarHidden, handleSideBarHidden } = useContext(SideBarContext);

  function themeSwithcher() {
    if (themeContext.name === "Light") {
      setMode(themesFromStore.data.dark);
      props.handleThemeChange(themesFromStore.data.dark);
    } else {
      setMode(themesFromStore.data.light);
      props.handleThemeChange(themesFromStore.data.light);
    }
  }
  return (
    <StyledSideBar $isSideBarHidden={isSideBarHidden}>
      <SideBarMenu></SideBarMenu>
      <SliderWapper>
        <img src={lightTheme} alt=""></img>
        <Slider>
          <input type="checkbox" onClick={themeSwithcher}></input>
          <button className="slider-btn"></button>
        </Slider>
        <img src={darkTheme} alt=""></img>
      </SliderWapper>
      <HideBtn onClick={handleSideBarHidden}>
        <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg" fill="#828FA3">
          <path d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z" />
        </svg>
        <span>Hide Sidebar</span>
      </HideBtn>
      <ShowBtn $isSideBarHidden={isSideBarHidden} onClick={handleSideBarHidden}>
        <img src={showIcon} alt="eye symbol"></img>
      </ShowBtn>
    </StyledSideBar>
  );
}
