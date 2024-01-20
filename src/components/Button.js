import styled from "styled-components";

const Button =
  styled.button <
  { $primary: boolean } >
  `


`;

export default function Button({ text, size }) {
  return (
    <button
      style={size === "large" ? { largeStyle } : {}}
      className="PrimaryBtn"
    >
      {text}
    </button>
  );
}
