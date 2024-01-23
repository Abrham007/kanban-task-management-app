import styled from "styled-components";

const StyledButton = styled.button`
  width: 100%;

  border-radius: 20px;
  border: none;
  outline: none;
  padding: 9px 0px 9px 0px;
  text-align: center;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.4375rem;

  &:disabled {
    opacity: 0.5;
  }
`;

const PrimaryButton = styled(StyledButton)`
  color: #fff;
  background-color: #635fc7;
  border-radius: 24px;
  padding: ${({ $size }) => ($size === "small" ? "9px 0px 9px 0px" : "12px 25px 12px 25px")};
  width: ${({ $size }) => ($size === "small" ? "100%" : "auto")};

  &:hover {
    background-color: #a8a4ff;
  }
`;

export const SecondaryButton = styled(StyledButton)``;

const DestructiveButton = styled(StyledButton)`
  color: #fff;
  background-color: #ea5555;

  &:hover {
    background-color: #ff9898;
  }
`;

export default function Button({ children, size = "small", type, ...props }) {
  switch (type) {
    case "primary":
      return (
        <PrimaryButton $size={size} {...props}>
          {children}
        </PrimaryButton>
      );
    case "secondary":
      return <SecondaryButton {...props}>{children}</SecondaryButton>;
    case "destructive":
      return <DestructiveButton {...props}>{children}</DestructiveButton>;
    default:
      return (
        <PrimaryButton $size={size} {...props}>
          {children}
        </PrimaryButton>
      );
  }
}
