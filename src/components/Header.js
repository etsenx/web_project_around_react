import logo from "../images/Logo.png";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Around The US Logo" className="logo" />
    </header>
  );
}

export default Header;
