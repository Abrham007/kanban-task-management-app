import { createGlobalStyle } from "styled-components";
import { SecondaryButton } from "../components/Button";
import { Logo } from "../components/Header";
import { StyledHeader } from "../components/Header";

export const GlobalStyles = createGlobalStyle`
  body { 
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: all 0.50s linear;
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
