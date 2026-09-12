import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="app-header">
      <Link to="/" className="logo">
        Projeto STEP
      </Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/criar-produto">Criar Produto</Link>
      </nav>
      <div className="header-actions">
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Alternar tema">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        {isLoggedIn && (
          <Button type="button" onClick={handleLogout}>
            Sair
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
