import { createGlobalStyle } from "styled-components";
import { SecondaryButton } from "../components/Button";
import { Logo } from "../components/Header";
import { StyledHeader } from "../components/Header";
import { StyledBoard } from "../components/Board";
import { SliderWapper } from "../components/Board";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body { 
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: all 0.50s linear;
  }
  ${StyledBoard} {
    background-color: ${({ theme }) => theme.colors.board}
  }
  ${SliderWapper} {
    background-color: ${({ theme }) => theme.colors.slider};
  }
  ${StyledHeader} {
    background-color: ${({ theme }) => theme.colors.header.background};
    color: ${({ theme }) => theme.colors.header.text}
  }
  ${Logo} {
    background-image: url(${({ theme }) => require(`../${theme.images.logo}`)})
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
