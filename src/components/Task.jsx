import styled from "styled-components";

export const StyledTask = styled.article`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px 0px rgba(54, 78, 126, 0.1);
  padding: 23px 16px;

  h3 {
    color: inherit;
    font-size: 0.9375rem;
    font-weight: 700;
  }

  p {
    color: inherit;
    font-size: 0.75rem;
    font-weight: 700;
  }
`;

export default function Task() {
  return (
    <StyledTask>
      <h3>Build UI for onboarding flow</h3>
      <p>0 of 3 substasks</p>
    </StyledTask>
  );
}
