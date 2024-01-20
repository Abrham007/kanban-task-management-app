import logoLight from "./assets/logo-light.svg";

export default function Header() {
  return (
    <header className="Header">
      <h1 className="Header-logo">
        <img src={logoLight}></img>
        <span>kanban</span>
      </h1>
      <h2 className="Header-text">Platform Launch</h2>
      <button></button>
      <button></button>
    </header>
  );
}
