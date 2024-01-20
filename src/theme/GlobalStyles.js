import { createGlobalStyle } from "styled-components";
import { SecondaryButton } from "../components/Button";

export const GlobalStyles = createGlobalStyle`
  body { 
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: all 0.50s linear;
  }
  button:hover {
    cursor: pointer;
  }
  ${SecondaryButton} {
    background-color: ${({ theme }) => theme.colors.secondaryButton.background};
    color: ${({ theme }) => theme.colors.secondaryButton.text};

    &:hover {
      background-color: ${({ theme }) =>
        theme.colors.secondaryButton.hover.background};
    }
  }
`;
