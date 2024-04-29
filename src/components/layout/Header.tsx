import { Link } from "@tanstack/react-router";

const Header = () => {
  return (
    <>
      <header className="layout-header-wrapper">
        <ul>
          <li>
            <Link to="/markets">가상자산 시세목록</Link>
          </li>
          <li>
            <Link to="/bookmarks">북마크 목록</Link>
          </li>
        </ul>
      </header>
      <div style={{ height: "60px" }} />
    </>
  );
};

export default Header;
