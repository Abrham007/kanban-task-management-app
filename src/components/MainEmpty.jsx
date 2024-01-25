import styled from "styled-components";
import Button from "./Button";
import { devices } from "../utils/devices";

const StyledMainEmpty = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;

  @media ${devices.mobile} {
    gap: 25px;
  }
`;

const Paragraph = styled.p`
  color: #828fa3;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 700;

  @media ${devices.tablet} {
    width: 80%;
  }

  @media ${devices.mobile} {
    width: 90%;
  }
`;

export default function MainEmpty() {
  return (
    <StyledMainEmpty>
      <Paragraph>This board is empty. Create a new column to get started.</Paragraph>
      <Button type={"primary"} size="large">
        + Add New Column
      </Button>
    </StyledMainEmpty>
  );
}
