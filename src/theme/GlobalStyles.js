import { createGlobalStyle } from "styled-components";
import { SecondaryButton } from "../components/Button";
import { StyledHeader } from "../components/Header";
import { StyledSideBar } from "../components/SideBar";
import { SliderWapper } from "../components/SideBar";
import { StyledMain } from "../components/Main";
import { StyledTask } from "../components/Task";
import { NewTaskColumn } from "../components/TaskBoard";
import { EllipsisOptionContainer } from "../components/EllipsisButton";
import { CheckBoxLabel } from "../components/InputCheckBox";
import { TextField } from "../components/InputTextField";
import { Dropdown } from "../components/InputDropdown";
import { StyledModal } from "../components/Modal";
import { StyledTaskDetail } from "../components/TaskDetail";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body { 
    font-family: 'Plus Jakarta Sans', sans-serif;
    background-color: ${({ theme }) => theme.colors.body};
    
  }

  ${StyledModal}, ${StyledTaskDetail}{
    background-color: ${({ theme }) => theme.colors.modal.background};
    h3 {
      color: ${({ theme }) => theme.colors.modal.header};
    }
    span {
      color: ${({ theme }) => theme.colors.modal.label};
    }
  }
  ${Dropdown} {
    button span {
      color: ${({ theme }) => theme.colors.dropdown.text}; 
    }
    menu {
      background-color: ${({ theme }) => theme.colors.dropdown.menu.background};      
    }
  }
  ${TextField} {
      background-color: ${({ theme }) => theme.colors.textFeild.background};
      color: ${({ theme }) => theme.colors.textFeild.text}; 
  }
  ${CheckBoxLabel} {
    background-color: ${({ theme }) => theme.colors.checkbox.background};

    span {
        color: ${({ theme }) => theme.colors.checkbox.text};
    }
    
    input:checked ~ span {
      color: ${({ theme }) => theme.colors.checkbox.onCheck};
    }
  }
  ${EllipsisOptionContainer} {
    background-color: ${({ theme }) => theme.colors.ellipsisContainer}
  }
  ${NewTaskColumn} {
    background: linear-gradient(180deg, ${({ theme }) =>
      theme.colors.newTaskColumn.first} 0%, rgba(233, 239, 250, 0.50) 100%);
  }
  ${StyledTask} {
    background-color: ${({ theme }) => theme.colors.task.background};
    h3 {
      color: ${({ theme }) => theme.colors.task.text};
    }
  }
  ${StyledMain} {
    background-color: ${({ theme }) => theme.colors.main}
  }
  ${StyledSideBar} {
    background-color: ${({ theme }) => theme.colors.sidebar}
  }
  ${SliderWapper} {
    background-color: ${({ theme }) => theme.colors.slider};
  }
  ${StyledHeader} {
    background-color: ${({ theme }) => theme.colors.header.background};
    color: ${({ theme }) => theme.colors.header.text}
  }
  
  ${SecondaryButton} {
    background-color: ${({ theme }) => theme.colors.secondaryButton.background};
    color: ${({ theme }) => theme.colors.secondaryButton.text};

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondaryButton.hover.background};
    }
  }
  button:hover {
    cursor: pointer;
  }

`;
