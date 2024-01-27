import styled from "styled-components";
import { Modal } from "./ModalStyles.";
import Button from "./Button";

const ModalDelete = styled(Modal)`
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
`;

export default function ModalDeleteBoard() {
  return (
    <ModalDelete>
      <h3>Delete this board?</h3>
      <p>
        Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and
        cannot be reversed.
      </p>
      <div>
        <Button type="destructive">Delete</Button>
        <Button type="secondary">Cancel</Button>
      </div>
    </ModalDelete>
  );
}
