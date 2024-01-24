import styled from "styled-components";
import MainEmpty from "./MainEmpty";

export const StyledMain = styled.main`
  grid-area: main;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  transition: all 0.5s linear;
`;

export default function Main() {
  return (
    <StyledMain>
      <MainEmpty></MainEmpty>
    </StyledMain>
  );
}
