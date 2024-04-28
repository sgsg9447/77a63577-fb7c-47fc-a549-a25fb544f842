import Header from "./Header";
import "./index.css";

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="layout-main">{children}</main>
    </>
  );
};
export default Layout;
