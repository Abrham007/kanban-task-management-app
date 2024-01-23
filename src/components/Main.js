import styled from "styled-components";
import Button from "./Button";

const StyledMain = styled.main`
  grid-area: main;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f7fd;
`;

export default function Main() {
  return (
    <StyledMain>
      <div>
        <p>This board is empty. Create a new column to get started.</p>
        <Button type={"primary"} size="large">
          + Add New Task
        </Button>
      </div>
    </StyledMain>
  );
}
