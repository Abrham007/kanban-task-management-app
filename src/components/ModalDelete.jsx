import styled from "styled-components";
import { Modal } from "./ModalStyles.";
import Button from "./Button";
import { devices } from "../utils/devices";

const StyledModalDelete = styled(Modal)`
  && h3 {
    color: #ea5555;
  }

  p {
    color: #828fa3;
    font-size: 0.8125rem;
    font-weight: 500;
    line-height: 1.4375rem;
  }

  div {
    display: flex;
    gap: 16px;
  }

  @media ${devices.mobile} {
    div {
      flex-direction: column;
    }
  }
`;

export default function ModalDelete({ purpose = "board" }) {
  return (
    <StyledModalDelete>
      <h3>Delete this {purpose}?</h3>
      <p>
        Are you sure you want to delete the ‘Platform Launch’ {purpose}? This action will remove all columns and tasks
        and cannot be reversed.
      </p>
      <div>
        <Button type="destructive">Delete</Button>
        <Button type="secondary">Cancel</Button>
      </div>
    </StyledModalDelete>
  );
}
