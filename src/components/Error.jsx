import styled from "styled-components";
import Button from "./UI/Buttons/Button";
import { devices } from "../utils/devices";
import { useContext } from "react";
import { DataContext } from "../store/DataContext";

const StyledDeleteMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  && h3 {
    color: #ea5555;
  }

  p {
    color: #828fa3;
    font-size: 0.8125rem;
    font-weight: 500;
    line-height: 1.4375rem;
  }

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }

  form button {
    width: 50%;
  }
`;

export default function Error({ message }) {
  let header = "Something went wrong";
  let fullMessage = `${message}. Please check the internet connection and try again.`;

  return (
    <StyledDeleteMessage>
      <h3>{header}</h3>
      <p>{fullMessage}</p>

      <form method="dialog">
        <Button type="destructive">Close</Button>
      </form>
    </StyledDeleteMessage>
  );
}
