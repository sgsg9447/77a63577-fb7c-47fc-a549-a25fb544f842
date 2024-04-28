import { Outlet } from "@tanstack/react-router";
import Header from "./Header";
import "./index.css";

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="layout-main">
        {children}
        <Outlet />
      </main>
    </>
  );
};
export default Layout;
