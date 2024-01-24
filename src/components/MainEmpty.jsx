import styled from "styled-components";
import Button from "./Button";

const StyledMainEmpty = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
`;

const Paragraph = styled.p`
  color: #828fa3;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 700;
`;

export default function MainEmpty() {
  return (
    <StyledMainEmpty>
      <Paragraph>This board is empty. Create a new column to get started.</Paragraph>
      <Button type={"primary"} size="large">
        + Add New Task
      </Button>
    </StyledMainEmpty>
  );
}
