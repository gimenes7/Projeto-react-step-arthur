import Header from "../organisms/Header";
import "./PageLayout.css";

const PageLayout = ({ children }) => {
  return (
    <div className="page-layout">
      <Header />
      <main className="page-content">{children}</main>
    </div>
  );
};

export default PageLayout;
